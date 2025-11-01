// Workflow Debug Analyzer für Cursor-KI
// Liest workflow-debug.json und analysiert Fehler automatisch

const fs = require('fs');
const path = require('path');

const DEBUG_FILE = path.join(__dirname, 'workflow-debug.json');

/**
 * Liest die Debug-JSON-Datei und analysiert sie
 */
function analyzeWorkflowDebug() {
    try {
        if (!fs.existsSync(DEBUG_FILE)) {
            return {
                error: 'Debug-Datei nicht gefunden',
                suggestion: 'Workflow ausführen, um Debug-Daten zu generieren'
            };
        }

        const debugData = JSON.parse(fs.readFileSync(DEBUG_FILE, 'utf8'));
        
        const analysis = {
            timestamp: debugData.timestamp || new Date().toISOString(),
            status: 'success',
            errors: [],
            warnings: [],
            fixes: [],
            summary: {
                totalNodes: 0,
                successfulNodes: 0,
                failedNodes: 0
            }
        };

        // Analysiere Debug-Daten
        if (debugData.debugData && Array.isArray(debugData.debugData)) {
            debugData.debugData.forEach((node, index) => {
                analysis.summary.totalNodes++;
                
                // Fehler: Setze Sample-Info ohne Binary
                if (node.debugNode === 'Setze Sample-Info') {
                    if (!node.hasBinary) {
                        analysis.status = 'error';
                        analysis.errors.push({
                            node: 'Setze Sample-Info',
                            issue: 'Binary-Daten fehlen',
                            severity: 'critical',
                            fix: {
                                type: 'binary-missing',
                                suggestion: 'Prüfe ob "Lade Sample X" Node Binary-Daten zurückgibt, oder ob Webhook Binary-Daten sendet',
                                code: 'Prüfe: $(nodeName).binary oder $("Business Card Upload").binary'
                            }
                        });
                        analysis.summary.failedNodes++;
                    } else {
                        analysis.summary.successfulNodes++;
                    }
                }

                // Fehler: AI Agent ohne Output
                if (node.debugNode === 'AI Agent - Vertex AI') {
                    if (!node.hasOutput) {
                        analysis.status = 'error';
                        analysis.errors.push({
                            node: 'AI Agent - Vertex AI',
                            issue: 'AI Agent gibt keine Daten zurück',
                            severity: 'critical',
                            fix: {
                                type: 'ai-agent-no-output',
                                suggestion: 'Prüfe Structured Output Parser Konfiguration und AI Agent "Has Output Parser" Einstellung',
                                code: 'Options → Has Output Parser: aktiviert?'
                            }
                        });
                        analysis.summary.failedNodes++;
                    } else {
                        analysis.summary.successfulNodes++;
                        // Warnung: Output leer oder unvollständig
                        if (node.outputLength === 0 || (!node.output && !node.outputIsArray)) {
                            analysis.warnings.push({
                                node: 'AI Agent - Vertex AI',
                                issue: 'Output vorhanden aber leer',
                                severity: 'warning',
                                fix: {
                                    type: 'ai-output-empty',
                                    suggestion: 'AI Agent Prompt anpassen oder JSON Schema prüfen'
                                }
                            });
                        }
                    }
                }

                // Fehler: Route to Sample falsch
                if (node.debugNode === 'Route to Sample') {
                    if (!node.output?.route || node.output.route === 'upload' && node.input?.query?.sample) {
                        analysis.warnings.push({
                            node: 'Route to Sample',
                            issue: 'Routing könnte falsch sein',
                            severity: 'warning',
                            fix: {
                                type: 'routing-issue',
                                suggestion: 'Prüfe ob sample Parameter korrekt verarbeitet wird'
                            }
                        });
                    }
                    analysis.summary.successfulNodes++;
                }
            });
        }

        // Generiere automatische Fixes
        analysis.errors.forEach(error => {
            if (error.fix.type === 'binary-missing') {
                analysis.fixes.push({
                    node: error.node,
                    type: 'code-fix',
                    code: `// Fix für Setze Sample-Info Node
// Stelle sicher, dass Binary-Daten von vorherigen Node kommen:
const binaryData = $binary || $('Lade Sample 1').binary || $('Business Card Upload').binary;
if (!binaryData) {
    console.error('Binary-Daten fehlen');
    return [];
}`,
                    description: 'Binary-Daten Fallback hinzufügen'
                });
            }

            if (error.fix.type === 'ai-agent-no-output') {
                analysis.fixes.push({
                    node: error.node,
                    type: 'configuration-fix',
                    steps: [
                        'AI Agent Node öffnen',
                        'Options Tab → "Has Output Parser" aktivieren',
                        'Structured Output Parser Node prüfen → Verbindung zu Google Vertex Chat Model (ai_outputParser)',
                        'JSON Schema Example prüfen'
                    ],
                    description: 'AI Agent Output Parser konfigurieren'
                });
            }
        });

        return analysis;
    } catch (error) {
        return {
            error: 'Fehler beim Analysieren der Debug-Datei',
            details: error.message,
            suggestion: 'Prüfe ob workflow-debug.json valides JSON ist'
        };
    }
}

/**
 * Speichert Debug-Daten von n8n Response
 */
function saveDebugData(debugResponse) {
    try {
        const debugData = {
            timestamp: new Date().toISOString(),
            ...debugResponse
        };
        
        fs.writeFileSync(DEBUG_FILE, JSON.stringify(debugData, null, 2), 'utf8');
        console.log('✅ Debug-Daten gespeichert:', DEBUG_FILE);
        return true;
    } catch (error) {
        console.error('❌ Fehler beim Speichern der Debug-Daten:', error.message);
        return false;
    }
}

// Export für Cursor-KI
module.exports = {
    analyzeWorkflowDebug,
    saveDebugData,
    DEBUG_FILE
};

// CLI-Usage
if (require.main === module) {
    const analysis = analyzeWorkflowDebug();
    console.log(JSON.stringify(analysis, null, 2));
}

