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

/**
 * Lädt Debug-Daten von URL (für automatischen Debug-Loop)
 */
async function analyzeFromURL(url = 'http://localhost:3000/debug/workflow.json') {
    try {
        const https = require('http');
        const { URL } = require('url');
        
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port || 3000,
                path: urlObj.pathname,
                method: 'GET'
            };

            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const debugData = JSON.parse(data);
                        if (debugData.error) {
                            resolve(debugData);
                        } else {
                            // Temporär speichern für analyzeWorkflowDebug
                            fs.writeFileSync(DEBUG_FILE, JSON.stringify(debugData, null, 2), 'utf8');
                            const analysis = analyzeWorkflowDebug();
                            resolve(analysis);
                        }
                    } catch (error) {
                        reject({ error: 'Fehler beim Parsen der Debug-Daten', details: error.message });
                    }
                });
            });

            req.on('error', (error) => {
                reject({ error: 'Fehler beim Laden der Debug-Daten', details: error.message });
            });

            req.end();
        });
    } catch (error) {
        return { error: 'Fehler beim Laden von URL', details: error.message };
    }
}

/**
 * Auto-Fix: Binary-Daten fehlen
 */
function fixBinaryMissing(workflowJson, nodeId) {
    const node = workflowJson.nodes.find(n => n.id === nodeId || n.name === 'Setze Sample-Info');
    if (!node || node.type !== 'n8n-nodes-base.code') {
        return false;
    }

    const currentCode = node.parameters.jsCode || '';
    
    // Prüfe ob Fallback bereits vorhanden
    if (currentCode.includes('$(\'Lade Sample 1\').binary') || 
        currentCode.includes('$(\'Business Card Upload\').binary')) {
        return false; // Fix bereits vorhanden
    }

    // Füge erweiterten Fallback hinzu
    const enhancedCode = currentCode.replace(
        /\/\/ 4\. Fallback: \$binary\nif \(!binaryData && \$binary\) \{\n    binaryData = \$binary;\n\}/,
        `// 4. Fallback: $binary
if (!binaryData && $binary) {
    binaryData = $binary;
}

// 5. Erweiterter Fallback: Direkt von vorherigen Nodes
if (!binaryData) {
    try {
        // Versuche alle möglichen Binary-Quellen
        const possibleNodes = ['Lade Sample 1', 'Lade Sample 2', 'Lade Sample 3', 'Business Card Upload'];
        for (const nodeName of possibleNodes) {
            const sourceNode = $(nodeName);
            if (sourceNode?.binary) {
                binaryData = sourceNode.binary;
                break;
            } else if (sourceNode?.item?.binary) {
                binaryData = sourceNode.item.binary;
                break;
            }
        }
    } catch (e) {
        console.error('Fehler beim Erweiterte Binary-Suche:', e);
    }
}`
    );

    if (enhancedCode !== currentCode) {
        node.parameters.jsCode = enhancedCode;
        return true;
    }

    return false;
}

/**
 * Auto-Fix: AI Agent Output Parser
 */
function fixAIAgentOutput(workflowJson) {
    const node = workflowJson.nodes.find(n => n.name === 'AI Agent - Vertex AI');
    if (!node) {
        return false;
    }

    let fixed = false;

    // Prüfe hasOutputParser
    if (!node.parameters.options) {
        node.parameters.options = {};
    }
    if (node.parameters.options.hasOutputParser !== true) {
        node.parameters.options.hasOutputParser = true;
        fixed = true;
    }

    // Prüfe automaticallyPassthroughBinaryImages
    if (node.parameters.options.automaticallyPassthroughBinaryImages !== true) {
        node.parameters.options.automaticallyPassthroughBinaryImages = true;
        fixed = true;
    }

    // Prüfe Structured Output Parser Verbindung
    const parserNode = workflowJson.nodes.find(n => n.name === 'Structured Output Parser');
    if (parserNode) {
        const connections = workflowJson.connections['Structured Output Parser'];
        if (!connections || !connections.ai_outputParser) {
            if (!workflowJson.connections['Structured Output Parser']) {
                workflowJson.connections['Structured Output Parser'] = {};
            }
            if (!workflowJson.connections['Structured Output Parser'].ai_outputParser) {
                workflowJson.connections['Structured Output Parser'].ai_outputParser = [[{
                    node: 'Google Vertex Chat Model',
                    type: 'ai_outputParser',
                    index: 0
                }]];
                fixed = true;
            }
        }
    }

    return fixed;
}

/**
 * Auto-Fix: Routing
 */
function fixRouting(workflowJson) {
    const node = workflowJson.nodes.find(n => n.name === 'Route to Sample');
    if (!node || node.type !== 'n8n-nodes-base.code') {
        return false;
    }

    const currentCode = node.parameters.jsCode || '';
    
    // Prüfe ob Code Spread Operator verwendet
    if (!currentCode.includes('...$json')) {
        const fixedCode = currentCode.replace(
            /return \[\{\s+json: \{/,
            'return [{\n    json: {'
        ).replace(
            /\$json,/,
            '...$json,'
        );

        if (fixedCode !== currentCode) {
            node.parameters.jsCode = fixedCode;
            return true;
        }
    }

    return false;
}

/**
 * Wendet alle Fixes automatisch auf Workflow JSON an
 */
function autoFixWorkflow(analysis) {
    const WORKFLOW_FILE = path.join(__dirname, 'n8n-business-card-workflow-vertex-DEBUG.json');
    
    try {
        if (!fs.existsSync(WORKFLOW_FILE)) {
            return { error: 'Workflow-Datei nicht gefunden', file: WORKFLOW_FILE };
        }

        // Backup erstellen
        const backupFile = WORKFLOW_FILE.replace('.json', `.backup.${Date.now()}.json`);
        fs.copyFileSync(WORKFLOW_FILE, backupFile);
        console.log('✅ Backup erstellt:', backupFile);

        const workflowJson = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));
        const fixesApplied = [];

        // Wende Fixes an basierend auf Analysis
        analysis.errors.forEach(error => {
            if (error.fix.type === 'binary-missing') {
                const node = workflowJson.nodes.find(n => n.name === 'Setze Sample-Info');
                if (node && fixBinaryMissing(workflowJson, node.id)) {
                    fixesApplied.push({ type: 'binary-missing', node: 'Setze Sample-Info' });
                }
            }

            if (error.fix.type === 'ai-agent-no-output') {
                if (fixAIAgentOutput(workflowJson)) {
                    fixesApplied.push({ type: 'ai-agent-no-output', node: 'AI Agent - Vertex AI' });
                }
            }

            if (error.fix.type === 'routing-issue') {
                if (fixRouting(workflowJson)) {
                    fixesApplied.push({ type: 'routing-issue', node: 'Route to Sample' });
                }
            }
        });

        if (fixesApplied.length > 0) {
            // Speichere korrigierte JSON
            fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflowJson, null, 2), 'utf8');
            return {
                success: true,
                fixesApplied: fixesApplied.length,
                fixes: fixesApplied,
                backupFile: backupFile
            };
        } else {
            return {
                success: false,
                message: 'Keine Fixes angewendet (bereits korrigiert oder kein entsprechender Fix verfügbar)',
                fixesApplied: []
            };
        }
    } catch (error) {
        return {
            error: 'Fehler beim Auto-Fix',
            details: error.message
        };
    }
}

/**
 * Debug-Loop: Analysiert und fixt automatisch bis keine Fehler mehr
 */
async function runDebugLoop(maxIterations = 5, debugURL = 'http://localhost:3000/debug/workflow.json', delayMs = 2000) {
    const results = [];
    
    console.log(`🔍 Debug-Loop gestartet (max ${maxIterations} Iterationen)`);
    console.log(`📊 Debug-URL: ${debugURL}`);
    console.log(`⏱️  Delay zwischen Iterationen: ${delayMs}ms\n`);

    for (let iteration = 1; iteration <= maxIterations; iteration++) {
        console.log(`\n--- Iteration ${iteration}/${maxIterations} ---`);
        
        try {
            // 1. Lade Debug-Daten
            console.log('📥 Lade Debug-Daten...');
            const analysis = await analyzeFromURL(debugURL);
            
            if (analysis.error) {
                console.log(`⚠️  ${analysis.error}`);
                if (analysis.error.includes('nicht gefunden')) {
                    console.log('⏳ Warte auf Debug-Daten... (Workflow muss ausgeführt werden)');
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                    continue;
                }
                break;
            }

            // 2. Analysiere
            console.log(`📊 Status: ${analysis.status}`);
            console.log(`   Nodes: ${analysis.summary.totalNodes} (${analysis.summary.successfulNodes} erfolgreich, ${analysis.summary.failedNodes} fehlgeschlagen)`);
            
            if (analysis.errors.length > 0) {
                console.log(`❌ Fehler gefunden: ${analysis.errors.length}`);
                analysis.errors.forEach(error => {
                    console.log(`   - ${error.node}: ${error.issue}`);
                });
            }

            if (analysis.status === 'success' && analysis.errors.length === 0) {
                console.log('✅ Keine Fehler mehr! Debug-Loop erfolgreich abgeschlossen.');
                return {
                    success: true,
                    iterations: iteration,
                    finalStatus: 'success',
                    results: results
                };
            }

            // 3. Wende Fixes an
            if (analysis.errors.length > 0) {
                console.log('🔧 Wende Fixes an...');
                const fixResult = autoFixWorkflow(analysis);
                
                if (fixResult.success) {
                    console.log(`✅ ${fixResult.fixesApplied} Fix(es) angewendet:`);
                    fixResult.fixes.forEach(fix => {
                        console.log(`   - ${fix.type} in ${fix.node}`);
                    });
                    console.log(`📁 Backup: ${fixResult.backupFile}`);
                } else {
                    console.log(`⚠️  ${fixResult.message || 'Keine Fixes angewendet'}`);
                }

                results.push({
                    iteration,
                    analysis,
                    fixResult
                });
            }

            // 4. Warte vor nächster Iteration
            if (iteration < maxIterations) {
                console.log(`⏳ Warte ${delayMs}ms vor nächster Iteration...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }

        } catch (error) {
            console.error(`❌ Fehler in Iteration ${iteration}:`, error.message);
            results.push({
                iteration,
                error: error.message
            });
        }
    }

    // Loop beendet (max Iterationen erreicht)
    const lastAnalysis = results[results.length - 1]?.analysis || await analyzeFromURL(debugURL).catch(() => null);
    
    return {
        success: lastAnalysis?.status === 'success' || false,
        iterations: maxIterations,
        maxIterationsReached: true,
        finalStatus: lastAnalysis?.status || 'unknown',
        results: results
    };
}

// Export für Cursor-KI
module.exports = {
    analyzeWorkflowDebug,
    saveDebugData,
    analyzeFromURL,
    autoFixWorkflow,
    runDebugLoop,
    fixBinaryMissing,
    fixAIAgentOutput,
    fixRouting,
    DEBUG_FILE
};

// CLI-Usage
if (require.main === module) {
    const analysis = analyzeWorkflowDebug();
    console.log(JSON.stringify(analysis, null, 2));
}

