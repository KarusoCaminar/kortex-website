// Auto-Test-Workflow: Triggert n8n Webhook und sammelt Responses
// Analysiert automatisch auf Fehler, Binary-Daten, AI-Output

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n2.kortex-system.de/webhook/business-card-extraction';
const OUTPUT_DIR = path.join(__dirname);
const TEST_RESPONSES_FILE = path.join(OUTPUT_DIR, 'test-responses.json');
const TEST_REPORT_FILE = path.join(OUTPUT_DIR, 'test-report.json');

/**
 * Sendet GET Request mit sample Parameter
 */
function triggerWorkflowSample(sample) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(`${N8N_WEBHOOK_URL}?sample=${sample}`);
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Auto-Test-Workflow/1.0',
                'Accept': 'application/json'
            },
            timeout: 60000 // 60 Sekunden Timeout
        };

        const client = urlObj.protocol === 'https:' ? https : http;
        const startTime = Date.now();

        const req = client.request(options, (res) => {
            let data = '';
            const statusCode = res.statusCode;

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const duration = Date.now() - startTime;
                
                try {
                    const response = data ? JSON.parse(data) : null;
                    resolve({
                        success: statusCode >= 200 && statusCode < 300,
                        statusCode: statusCode,
                        response: response,
                        rawResponse: data,
                        duration: duration,
                        timestamp: new Date().toISOString(),
                        sample: sample
                    });
                } catch (error) {
                    resolve({
                        success: false,
                        statusCode: statusCode,
                        response: null,
                        rawResponse: data,
                        error: error.message,
                        duration: duration,
                        timestamp: new Date().toISOString(),
                        sample: sample
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString(),
                sample: sample
            });
        });

        req.on('timeout', () => {
            req.destroy();
            reject({
                success: false,
                error: 'Request timeout after 60s',
                timestamp: new Date().toISOString(),
                sample: sample
            });
        });

        req.end();
    });
}

/**
 * Analysiert eine Response auf Fehler
 */
function analyzeResponse(result) {
    const analysis = {
        sample: result.sample,
        success: result.success,
        statusCode: result.statusCode,
        hasError: false,
        errorType: null,
        errorMessage: null,
        hasAIOutput: false,
        aiOutputStructure: null,
        isBinaryMissing: false,
        routingError: false,
        issues: []
    };

    // Prüfe Status Code
    if (result.statusCode >= 500) {
        analysis.hasError = true;
        analysis.errorType = 'server_error';
        analysis.errorMessage = `Server Error ${result.statusCode}`;
        analysis.issues.push(`Server Error: ${result.statusCode}`);
    } else if (result.statusCode >= 400) {
        analysis.hasError = true;
        analysis.errorType = 'client_error';
        analysis.errorMessage = `Client Error ${result.statusCode}`;
        analysis.issues.push(`Client Error: ${result.statusCode}`);
    }

    // Prüfe Response-Struktur
    if (result.response) {
        const response = result.response;
        
        // Prüfe ob Array-Response
        if (Array.isArray(response)) {
            // Prüfe jedes Item im Array
            response.forEach((item, index) => {
                const itemData = item.json || item;
                const itemType = itemData.type || itemData.error;
                
                // Fehler-Response
                if (itemType === 'error' || itemData.error) {
                    analysis.hasError = true;
                    analysis.errorType = 'workflow_error';
                    analysis.errorMessage = itemData.message || itemData.error || 'Unknown error';
                    analysis.issues.push(`Array Item ${index}: ${analysis.errorMessage}`);
                }
                
                // Business Card Processed
                if (itemType === 'business-card-processed' && itemData.payload) {
                    analysis.hasAIOutput = true;
                    analysis.aiOutputStructure = 'array_with_payload';
                }
            });
        } else if (typeof response === 'object') {
            // Prüfe Object-Response
            const responseType = response.type || response.error;
            
            // Fehler-Response
            if (responseType === 'error' || response.error) {
                analysis.hasError = true;
                analysis.errorType = 'workflow_error';
                analysis.errorMessage = response.message || response.error || 'Unknown error';
                analysis.issues.push(analysis.errorMessage);
            }
            
            // Business Card Processed
            if (responseType === 'business-card-processed' && response.payload) {
                analysis.hasAIOutput = true;
                analysis.aiOutputStructure = 'object_with_payload';
            }
            
            // Prüfe auf AI Output direkt
            if (response.output) {
                analysis.hasAIOutput = true;
                analysis.aiOutputStructure = 'direct_output';
            }
        }
        
        // Prüfe auf "Binary-Daten fehlen" Fehler
        if (result.response && (typeof result.response === 'object')) {
            const errorMsg = result.response.message || result.response.error || '';
            if (errorMsg.includes('Binary-Daten') || errorMsg.includes('Binary-Daten fehlen')) {
                analysis.isBinaryMissing = true;
                analysis.issues.push('Binary-Daten fehlen im Workflow');
            }
        }
        
        // Prüfe auf Routing-Fehler (Sample Parameter falsch)
        if (result.sample && result.response) {
            const response = result.response;
            const responseSample = Array.isArray(response) 
                ? (response[0]?.json?.sample || response[0]?.payload?.sample)
                : (response.sample || response.payload?.sample);
            
            if (responseSample && String(responseSample) !== String(result.sample)) {
                analysis.routingError = true;
                analysis.issues.push(`Routing-Fehler: Erwartet Sample ${result.sample}, aber erhalten Sample ${responseSample}`);
            }
        }
    } else {
        analysis.hasError = true;
        analysis.errorType = 'no_response';
        analysis.errorMessage = 'Keine Response-Daten erhalten';
        analysis.issues.push('Keine Response-Daten');
    }

    return analysis;
}

/**
 * Testet alle Samples (1, 2, 3)
 */
async function testAllSamples() {
    console.log('🚀 Starte automatisches Test-System...\n');
    console.log(`📡 Webhook URL: ${N8N_WEBHOOK_URL}\n`);
    
    const results = [];
    const samples = ['1', '2', '3'];
    
    for (const sample of samples) {
        console.log(`📋 Teste Sample ${sample}...`);
        
        try {
            const result = await triggerWorkflowSample(sample);
            const analysis = analyzeResponse(result);
            
            results.push({
                test: `Sample ${sample}`,
                result: result,
                analysis: analysis
            });
            
            // Status anzeigen
            if (analysis.hasError) {
                console.log(`  ❌ Fehler: ${analysis.errorMessage || analysis.errorType}`);
                if (analysis.issues.length > 0) {
                    analysis.issues.forEach(issue => console.log(`     - ${issue}`));
                }
            } else if (analysis.hasAIOutput) {
                console.log(`  ✅ Erfolg: AI-Output vorhanden`);
            } else {
                console.log(`  ⚠️  Warnung: Kein AI-Output`);
            }
            
            // Warte 2 Sekunden zwischen Tests
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            console.log(`  ❌ Fehler beim Triggern: ${error.message || error.error}`);
            results.push({
                test: `Sample ${sample}`,
                result: { success: false, error: error.message || error.error },
                analysis: { hasError: true, errorType: 'request_failed', errorMessage: error.message || error.error }
            });
        }
    }
    
    return results;
}

/**
 * Generiert Debug-Report
 */
function generateReport(results) {
    const report = {
        timestamp: new Date().toISOString(),
        webhookUrl: N8N_WEBHOOK_URL,
        summary: {
            totalTests: results.length,
            successfulTests: results.filter(r => r.analysis.success && !r.analysis.hasError).length,
            failedTests: results.filter(r => r.analysis.hasError).length,
            testsWithAIOutput: results.filter(r => r.analysis.hasAIOutput).length,
            testsWithBinaryIssues: results.filter(r => r.analysis.isBinaryMissing).length,
            testsWithRoutingIssues: results.filter(r => r.analysis.routingError).length
        },
        errors: [],
        warnings: [],
        recommendations: [],
        detailedResults: results
    };
    
    // Sammle Fehler
    results.forEach(r => {
        if (r.analysis.hasError) {
            report.errors.push({
                test: r.test,
                type: r.analysis.errorType,
                message: r.analysis.errorMessage,
                issues: r.analysis.issues
            });
        }
        
        if (r.analysis.isBinaryMissing) {
            report.warnings.push({
                test: r.test,
                issue: 'Binary-Daten fehlen',
                recommendation: 'Prüfe "Setze Sample-Info" Node - Binary-Daten werden nicht korrekt weitergegeben'
            });
        }
        
        if (r.analysis.routingError) {
            report.warnings.push({
                test: r.test,
                issue: 'Routing-Fehler',
                recommendation: 'Prüfe "Route to Sample" Node - Sample-Parameter wird nicht korrekt verarbeitet'
            });
        }
        
        if (!r.analysis.hasAIOutput && !r.analysis.hasError) {
            report.warnings.push({
                test: r.test,
                issue: 'Kein AI-Output',
                recommendation: 'Prüfe AI Agent Node und Structured Output Parser'
            });
        }
    });
    
    // Generiere Empfehlungen
    if (report.errors.length > 0) {
        report.recommendations.push('Automatische Fixes mit auto-fix-workflow.js anwenden');
    }
    
    if (report.warnings.some(w => w.issue === 'Binary-Daten fehlen')) {
        report.recommendations.push('"Setze Sample-Info" Node fixen: Error-Response statt throw Error');
    }
    
    if (report.warnings.some(w => w.issue === 'Kein AI-Output')) {
        report.recommendations.push('Structured Output Parser als SUB-NODE am AI Agent hinzufügen (manuell in n8n)');
        report.recommendations.push('"Require Specific Output Format" Toggle im AI Agent aktivieren (manuell in n8n)');
    }
    
    return report;
}

/**
 * Hauptfunktion
 */
async function main() {
    try {
        // Teste alle Samples
        const results = await testAllSamples();
        
        // Speichere Responses
        fs.writeFileSync(TEST_RESPONSES_FILE, JSON.stringify(results, null, 2));
        console.log(`\n💾 Test-Responses gespeichert: ${TEST_RESPONSES_FILE}`);
        
        // Generiere Report
        const report = generateReport(results);
        fs.writeFileSync(TEST_REPORT_FILE, JSON.stringify(report, null, 2));
        console.log(`📊 Test-Report gespeichert: ${TEST_REPORT_FILE}`);
        
        // Zeige Zusammenfassung
        console.log('\n📈 Zusammenfassung:');
        console.log(`   Gesamt: ${report.summary.totalTests} Tests`);
        console.log(`   ✅ Erfolgreich: ${report.summary.successfulTests}`);
        console.log(`   ❌ Fehler: ${report.summary.failedTests}`);
        console.log(`   🤖 Mit AI-Output: ${report.summary.testsWithAIOutput}`);
        
        if (report.errors.length > 0) {
            console.log('\n❌ Fehler gefunden:');
            report.errors.forEach(err => {
                console.log(`   - ${err.test}: ${err.message}`);
            });
        }
        
        if (report.recommendations.length > 0) {
            console.log('\n💡 Nächste Schritte:');
            report.recommendations.forEach(rec => {
                console.log(`   - ${rec}`);
            });
        }
        
        console.log('\n✅ Test-System abgeschlossen!');
        
    } catch (error) {
        console.error('❌ Fehler beim Testen:', error);
        process.exit(1);
    }
}

// Starte wenn direkt aufgerufen
if (require.main === module) {
    main();
}

module.exports = {
    triggerWorkflowSample,
    analyzeResponse,
    testAllSamples,
    generateReport
};

