// Workflow Response Analyzer: Analysiert test-responses.json oder test-report.json
// Identifiziert konkrete Fehler und generiert Fix-Empfehlungen

const fs = require('fs');
const path = require('path');

const TEST_RESPONSES_FILE = path.join(__dirname, 'test-responses.json');
const TEST_REPORT_FILE = path.join(__dirname, 'test-report.json');
const ANALYSIS_OUTPUT_FILE = path.join(__dirname, 'analysis-report.json');

/**
 * Liest test-responses.json oder test-report.json
 */
function loadTestData() {
    let data = null;
    
    // Versuche test-report.json zuerst
    if (fs.existsSync(TEST_REPORT_FILE)) {
        console.log(`📊 Lade Test-Report: ${TEST_REPORT_FILE}`);
        data = JSON.parse(fs.readFileSync(TEST_REPORT_FILE, 'utf8'));
    } else if (fs.existsSync(TEST_RESPONSES_FILE)) {
        console.log(`📋 Lade Test-Responses: ${TEST_RESPONSES_FILE}`);
        data = JSON.parse(fs.readFileSync(TEST_RESPONSES_FILE, 'utf8'));
    } else {
        throw new Error(`Weder ${TEST_REPORT_FILE} noch ${TEST_RESPONSES_FILE} gefunden. Führe zuerst auto-test-workflow.js aus.`);
    }
    
    return data;
}

/**
 * Analysiert Response-Daten und identifiziert konkrete Fehler
 */
function analyzeTestData(data) {
    const analysis = {
        timestamp: new Date().toISOString(),
        summary: {
            totalTests: 0,
            errorsFound: 0,
            warningsFound: 0,
            fixableErrors: 0,
            manualFixesRequired: 0
        },
        errors: [],
        warnings: [],
        fixes: {
            automatic: [],
            manual: []
        },
        recommendations: []
    };
    
    // Prüfe ob data.detailedResults existiert (von test-report.json)
    const results = data.detailedResults || data || [];
    
    if (Array.isArray(results)) {
        analysis.summary.totalTests = results.length;
        
        results.forEach((item, index) => {
            const result = item.result || item;
            const analysisData = item.analysis || {};
            const testName = item.test || `Test ${index + 1}`;
            
            // Prüfe Fehler
            if (analysisData.hasError || !result.success) {
                analysis.summary.errorsFound++;
                
                const errorInfo = {
                    test: testName,
                    type: analysisData.errorType || 'unknown',
                    message: analysisData.errorMessage || result.error || 'Unknown error',
                    statusCode: result.statusCode || null,
                    issues: analysisData.issues || [],
                    fixable: false,
                    fixType: null
                };
                
                // Identifiziere fixbare Fehler
                if (errorInfo.message.includes('Binary-Daten fehlen') || errorInfo.message.includes('Binary-Daten')) {
                    errorInfo.fixable = true;
                    errorInfo.fixType = 'setze-sample-info-node';
                    analysis.fixes.automatic.push({
                        type: 'setze-sample-info-node',
                        description: 'Setze Sample-Info Node sendet Error-Response statt throw Error',
                        node: 'Setze Sample-Info',
                        priority: 'high'
                    });
                } else if (errorInfo.message.includes('AI-Output fehlt') || errorInfo.message.includes('AI Agent')) {
                    errorInfo.fixable = false;
                    errorInfo.fixType = 'structured-output-parser';
                    analysis.fixes.manual.push({
                        type: 'structured-output-parser',
                        description: 'Structured Output Parser als SUB-NODE am AI Agent hinzufügen',
                        node: 'AI Agent - Vertex AI',
                        priority: 'critical'
                    });
                } else if (errorInfo.statusCode >= 500) {
                    errorInfo.fixable = true;
                    errorInfo.fixType = 'error-handling';
                    analysis.fixes.automatic.push({
                        type: 'error-handling',
                        description: 'Error-Handling in Transform Output Node verbessern',
                        node: 'Transform Output',
                        priority: 'medium'
                    });
                }
                
                if (errorInfo.fixable) {
                    analysis.summary.fixableErrors++;
                } else {
                    analysis.summary.manualFixesRequired++;
                }
                
                analysis.errors.push(errorInfo);
            }
            
            // Prüfe Warnings
            if (analysisData.isBinaryMissing) {
                analysis.summary.warningsFound++;
                analysis.warnings.push({
                    test: testName,
                    issue: 'Binary-Daten fehlen',
                    recommendation: 'Prüfe "Setze Sample-Info" Node - Binary-Daten werden nicht korrekt weitergegeben',
                    fixable: true,
                    fixType: 'setze-sample-info-node'
                });
            }
            
            if (analysisData.routingError) {
                analysis.summary.warningsFound++;
                analysis.warnings.push({
                    test: testName,
                    issue: 'Routing-Fehler',
                    recommendation: 'Prüfe "Route to Sample" Node - Sample-Parameter wird nicht korrekt verarbeitet',
                    fixable: true,
                    fixType: 'route-to-sample-node'
                });
            }
            
            if (!analysisData.hasAIOutput && !analysisData.hasError) {
                analysis.summary.warningsFound++;
                analysis.warnings.push({
                    test: testName,
                    issue: 'Kein AI-Output',
                    recommendation: 'Prüfe AI Agent Node und Structured Output Parser - Keine Daten zurückgegeben',
                    fixable: false,
                    fixType: 'structured-output-parser'
                });
            }
        });
    }
    
    // Entferne doppelte Fixes
    analysis.fixes.automatic = removeDuplicates(analysis.fixes.automatic, 'type');
    analysis.fixes.manual = removeDuplicates(analysis.fixes.manual, 'type');
    
    // Generiere Empfehlungen
    if (analysis.fixes.automatic.length > 0) {
        analysis.recommendations.push('Führe auto-fix-workflow.js aus, um automatische Fixes anzuwenden');
    }
    
    if (analysis.fixes.manual.length > 0) {
        analysis.recommendations.push('Befolge MANUAL_FIXES_REQUIRED.md für manuelle Fixes in n8n UI');
    }
    
    if (analysis.errors.length > 0 && analysis.summary.fixableErrors === 0) {
        analysis.recommendations.push('Alle gefundenen Fehler erfordern manuelle Fixes in n8n UI');
    }
    
    return analysis;
}

/**
 * Entfernt doppelte Einträge aus Array
 */
function removeDuplicates(array, key) {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

/**
 * Hauptfunktion
 */
function main() {
    try {
        console.log('🔍 Starte Response-Analyse...\n');
        
        // Lade Test-Daten
        const data = loadTestData();
        
        // Analysiere
        const analysis = analyzeTestData(data);
        
        // Speichere Analyse-Report
        fs.writeFileSync(ANALYSIS_OUTPUT_FILE, JSON.stringify(analysis, null, 2));
        console.log(`📊 Analyse-Report gespeichert: ${ANALYSIS_OUTPUT_FILE}\n`);
        
        // Zeige Zusammenfassung
        console.log('📈 Analyse-Zusammenfassung:');
        console.log(`   Gesamt Tests: ${analysis.summary.totalTests}`);
        console.log(`   ❌ Fehler: ${analysis.summary.errorsFound}`);
        console.log(`   ⚠️  Warnungen: ${analysis.summary.warningsFound}`);
        console.log(`   ✅ Automatisch fixbar: ${analysis.summary.fixableErrors}`);
        console.log(`   🔧 Manuell erforderlich: ${analysis.summary.manualFixesRequired}\n`);
        
        if (analysis.errors.length > 0) {
            console.log('❌ Gefundene Fehler:');
            analysis.errors.forEach((err, index) => {
                console.log(`   ${index + 1}. ${err.test}: ${err.message}`);
                if (err.fixable) {
                    console.log(`      ✅ Fixbar: ${err.fixType}`);
                } else {
                    console.log(`      ⚠️  Manuell erforderlich: ${err.fixType}`);
                }
            });
            console.log();
        }
        
        if (analysis.fixes.automatic.length > 0) {
            console.log('✅ Automatische Fixes verfügbar:');
            analysis.fixes.automatic.forEach((fix, index) => {
                console.log(`   ${index + 1}. ${fix.description} (${fix.node})`);
            });
            console.log();
        }
        
        if (analysis.fixes.manual.length > 0) {
            console.log('🔧 Manuelle Fixes erforderlich:');
            analysis.fixes.manual.forEach((fix, index) => {
                console.log(`   ${index + 1}. ${fix.description} (${fix.node})`);
            });
            console.log();
        }
        
        if (analysis.recommendations.length > 0) {
            console.log('💡 Nächste Schritte:');
            analysis.recommendations.forEach((rec, index) => {
                console.log(`   ${index + 1}. ${rec}`);
            });
        }
        
        console.log('\n✅ Response-Analyse abgeschlossen!');
        
    } catch (error) {
        console.error('❌ Fehler bei der Analyse:', error.message);
        process.exit(1);
    }
}

// Starte wenn direkt aufgerufen
if (require.main === module) {
    main();
}

module.exports = {
    loadTestData,
    analyzeTestData
};

