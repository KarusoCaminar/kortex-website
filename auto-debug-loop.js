// Auto-Debug-Loop: Vollautomatischer Debug-Loop
// Führt automatisch durch: Test → Analyse → Fix → Test → ...
// Stoppt wenn: Keine Fehler mehr ODER max. 5 Iterationen

const { triggerWorkflowSample, analyzeResponse, testAllSamples } = require('./auto-test-workflow');
const { loadTestData, analyzeTestData } = require('./workflow-response-analyzer');
const { applyAutomaticFixes, loadWorkflow } = require('./auto-fix-workflow');
const fs = require('fs');
const path = require('path');

const MAX_ITERATIONS = 5;
const LOOP_LOG_FILE = path.join(__dirname, 'debug-loop-log.json');

/**
 * Führt einen vollautomatischen Debug-Loop durch
 */
async function runDebugLoop() {
    console.log('🔄 Starte vollautomatischen Debug-Loop...\n');
    console.log(`   Max. Iterationen: ${MAX_ITERATIONS}\n`);
    
    const loopLog = {
        startTime: new Date().toISOString(),
        iterations: [],
        finalStatus: null,
        totalFixes: 0
    };
    
    let iteration = 0;
    let hasErrors = true;
    
    while (hasErrors && iteration < MAX_ITERATIONS) {
        iteration++;
        console.log(`\n${'='.repeat(60)}`);
        console.log(`🔄 Iteration ${iteration}/${MAX_ITERATIONS}`);
        console.log('='.repeat(60) + '\n');
        
        const iterationLog = {
            iteration: iteration,
            timestamp: new Date().toISOString(),
            steps: []
        };
        
        try {
            // Schritt 1: Teste Workflow
            console.log('📋 Schritt 1: Teste Workflow...');
            iterationLog.steps.push({ step: 'test', timestamp: new Date().toISOString() });
            
            const results = await testAllSamples();
            const testReport = {
                timestamp: new Date().toISOString(),
                summary: {
                    totalTests: results.length,
                    successfulTests: results.filter(r => r.analysis.success && !r.analysis.hasError).length,
                    failedTests: results.filter(r => r.analysis.hasError).length
                },
                detailedResults: results
            };
            
            console.log(`   ✅ Tests abgeschlossen: ${testReport.summary.successfulTests}/${testReport.summary.totalTests} erfolgreich`);
            iterationLog.steps.push({ step: 'test-complete', result: testReport.summary });
            
            // Schritt 2: Analysiere Ergebnisse
            console.log('\n🔍 Schritt 2: Analysiere Ergebnisse...');
            iterationLog.steps.push({ step: 'analyze', timestamp: new Date().toISOString() });
            
            const analysis = analyzeTestData(testReport);
            
            console.log(`   ✅ Analyse abgeschlossen: ${analysis.summary.errorsFound} Fehler gefunden`);
            console.log(`      - Automatisch fixbar: ${analysis.summary.fixableErrors}`);
            console.log(`      - Manuell erforderlich: ${analysis.summary.manualFixesRequired}`);
            
            iterationLog.steps.push({ 
                step: 'analyze-complete', 
                result: {
                    errorsFound: analysis.summary.errorsFound,
                    fixableErrors: analysis.summary.fixableErrors,
                    manualFixesRequired: analysis.summary.manualFixesRequired
                }
            });
            
            // Schritt 3: Prüfe ob Fixes nötig sind
            if (analysis.summary.fixableErrors > 0) {
                console.log('\n🔧 Schritt 3: Wende automatische Fixes an...');
                iterationLog.steps.push({ step: 'fix', timestamp: new Date().toISOString() });
                
                const workflow = loadWorkflow();
                const fixes = applyAutomaticFixes(workflow);
                
                const appliedFixes = Object.values(fixes).filter(f => f === true).length;
                console.log(`   ✅ ${appliedFixes} Fix(s) angewendet`);
                
                iterationLog.steps.push({ 
                    step: 'fix-complete', 
                    result: {
                        fixesApplied: appliedFixes,
                        fixes: fixes
                    }
                });
                
                loopLog.totalFixes += appliedFixes;
                
                // Warte 2 Sekunden vor nächster Iteration
                console.log('\n⏳ Warte 2 Sekunden vor nächster Iteration...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
            } else if (analysis.summary.errorsFound === 0) {
                // Keine Fehler mehr - Erfolg!
                console.log('\n✅ Schritt 3: Keine Fehler mehr gefunden!');
                hasErrors = false;
                loopLog.finalStatus = 'success';
                iterationLog.steps.push({ step: 'success', message: 'Keine Fehler mehr' });
                
            } else {
                // Nur manuelle Fixes erforderlich
                console.log('\n⚠️  Schritt 3: Nur manuelle Fixes erforderlich');
                console.log('   - Automatische Fixes können nicht angewendet werden');
                console.log('   - Befolge MANUAL_FIXES_REQUIRED.md');
                hasErrors = false; // Stoppe Loop (manuelle Fixes können nicht automatisch angewendet werden)
                loopLog.finalStatus = 'manual-fixes-required';
                iterationLog.steps.push({ step: 'manual-fixes-required', message: 'Manuelle Fixes erforderlich' });
            }
            
            iterationLog.endTime = new Date().toISOString();
            loopLog.iterations.push(iterationLog);
            
        } catch (error) {
            console.error(`\n❌ Fehler in Iteration ${iteration}:`, error.message);
            iterationLog.steps.push({ step: 'error', error: error.message });
            iterationLog.endTime = new Date().toISOString();
            loopLog.iterations.push(iterationLog);
            
            // Stoppe Loop bei kritischen Fehlern
            hasErrors = false;
            loopLog.finalStatus = 'error';
        }
    }
    
    // Finale Zusammenfassung
    loopLog.endTime = new Date().toISOString();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Debug-Loop abgeschlossen');
    console.log('='.repeat(60));
    console.log(`   Iterationen: ${iteration}`);
    console.log(`   Fixes angewendet: ${loopLog.totalFixes}`);
    console.log(`   Status: ${loopLog.finalStatus || 'unknown'}`);
    
    if (loopLog.finalStatus === 'success') {
        console.log('\n✅ Alle automatischen Fixes erfolgreich angewendet!');
        console.log('   Workflow sollte jetzt funktionieren.');
    } else if (loopLog.finalStatus === 'manual-fixes-required') {
        console.log('\n⚠️  Manuelle Fixes erforderlich:');
        console.log('   - Befolge MANUAL_FIXES_REQUIRED.md');
        console.log('   - Importiere n8n-business-card-workflow-vertex-FIXED.json in n8n');
    } else if (loopLog.finalStatus === 'error') {
        console.log('\n❌ Debug-Loop mit Fehler beendet');
    } else {
        console.log(`\n⚠️  Max. Iterationen erreicht (${MAX_ITERATIONS})`);
        console.log('   - Prüfe debug-loop-log.json für Details');
    }
    
    // Speichere Loop-Log
    fs.writeFileSync(LOOP_LOG_FILE, JSON.stringify(loopLog, null, 2));
    console.log(`\n💾 Loop-Log gespeichert: ${LOOP_LOG_FILE}`);
    
    return loopLog;
}

/**
 * Hauptfunktion
 */
async function main() {
    try {
        await runDebugLoop();
    } catch (error) {
        console.error('❌ Fehler im Debug-Loop:', error);
        process.exit(1);
    }
}

// Starte wenn direkt aufgerufen
if (require.main === module) {
    main();
}

module.exports = {
    runDebugLoop
};

