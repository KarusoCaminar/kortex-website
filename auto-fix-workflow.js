// Auto-Fix-Workflow: Wendet automatische Fixes auf n8n Workflow JSON an
// Fix 1: Setze Sample-Info Node - Error-Response statt throw Error
// Fix 2: Verbindungen korrigieren (ai_outputParser zeigt auf Chat Model)
// Fix 3: Transform Output Node - Besseres Error-Handling

const fs = require('fs');
const path = require('path');

const WORKFLOW_DEBUG_FILE = path.join(__dirname, 'n8n-business-card-workflow-vertex-DEBUG.json');
const WORKFLOW_FIXED_FILE = path.join(__dirname, 'n8n-business-card-workflow-vertex-FIXED.json');
const ANALYSIS_REPORT_FILE = path.join(__dirname, 'analysis-report.json');

/**
 * Liest Workflow JSON (auch von FIXED wenn vorhanden)
 */
function loadWorkflow(useFixed = false) {
    const filePath = useFixed && fs.existsSync(WORKFLOW_FIXED_FILE) ? WORKFLOW_FIXED_FILE : WORKFLOW_DEBUG_FILE;
    
    if (!fs.existsSync(filePath)) {
        throw new Error(`Workflow-Datei nicht gefunden: ${filePath}`);
    }
    
    console.log(`📖 Lade Workflow: ${filePath}`);
    const workflow = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return workflow;
}

/**
 * Fix 1: Setze Sample-Info Node - Error-Response statt throw Error
 * 
 * Prüft ob Node bereits korrigiert ist (sendet Error-Response)
 * Falls nicht: Korrigiert Code
 */
function fixSetzeSampleInfoNode(workflow) {
    const nodeName = 'Setze Sample-Info';
    const node = workflow.nodes.find(n => n.name === nodeName);
    
    if (!node) {
        console.warn(`⚠️  Node "${nodeName}" nicht gefunden`);
        return false;
    }
    
    // Prüfe ob Code bereits korrigiert ist
    const jsCode = node.parameters.jsCode || '';
    
    // Prüfe ob Error-Response bereits vorhanden ist
    if (jsCode.includes("type: 'error'") && jsCode.includes('Binary-Daten fehlen')) {
        console.log(`✅ "${nodeName}" ist bereits korrigiert`);
        return false;
    }
    
    // Korrigiere Code
    const fixedCode = `// Setze Sample-Info - Binary-Daten konsolidieren
const sample = String($json.query?.sample || '').trim();
let binaryData = null;

// 1. $binary vom aktuellen Item (direkt)
if ($binary && typeof $binary === 'object') {
    const keys = Object.keys($binary);
    if (keys.length > 0) binaryData = $binary;
}

// 2. Sample: Binary von "Lade Sample X" Node (ALLE Methoden)
if (!binaryData && sample) {
    try {
        const nodeName = sample === '1' ? 'Lade Sample 1' : sample === '2' ? 'Lade Sample 2' : 'Lade Sample 3';
        const node = $(nodeName);
        
        // Prüfe ALLE möglichen Binary-Strukturen
        if (node?.binary) {
            binaryData = node.binary;
        } else if (node?.item?.binary) {
            binaryData = node.item.binary;
        } else if (node?.item?.binary?.data) {
            binaryData = node.item.binary;
        } else if (node?.item?.binary?.file) {
            binaryData = { data: node.item.binary.file };
        } else if (node?.all && Array.isArray(node.all) && node.all.length > 0) {
            // Prüfe ob Binary in allen Items vorhanden ist
            const firstItem = node.all[0];
            if (firstItem?.binary) {
                binaryData = firstItem.binary;
            } else if (firstItem?.json?.binary) {
                binaryData = firstItem.json.binary;
            }
        }
    } catch (e) {
        console.error('Fehler beim Holen von Lade Sample:', e);
    }
}

// 3. Upload: Binary vom Webhook (ALLE Methoden)
if (!binaryData && !sample) {
    try {
        const webhook = $('Business Card Upload');
        if (webhook?.binary) {
            binaryData = webhook.binary;
        } else if (webhook?.item?.binary) {
            binaryData = webhook.item.binary;
        } else if (webhook?.item?.binary?.data) {
            binaryData = webhook.item.binary;
        } else if (webhook?.item?.binary?.file) {
            binaryData = { data: webhook.item.binary.file };
        } else if (webhook?.all && Array.isArray(webhook.all) && webhook.all.length > 0) {
            const firstItem = webhook.all[0];
            if (firstItem?.binary) {
                binaryData = firstItem.binary;
            }
        }
    } catch (e) {
        console.error('Fehler beim Holen vom Webhook:', e);
    }
}

// 4. Fallback: $binary (wenn noch nichts gefunden)
if (!binaryData && $binary) {
    binaryData = $binary;
}

// KRITISCH: Wenn KEINE Binary-Daten → FEHLER-RESPONSE senden statt throw Error
if (!binaryData || (typeof binaryData === 'object' && Object.keys(binaryData).length === 0)) {
    console.error('❌ Binary-Daten fehlen für Sample:', sample || 'Upload');
    // Sende Fehler-Response anstatt throw Error um 500-Fehler zu verhindern
    return [{
        json: {
            type: 'error',
            error: 'Binary-Daten fehlen',
            message: \`Keine Binary-Daten gefunden für \${sample ? 'Sample ' + sample : 'Upload'}. Prüfe ob "Lade Sample \${sample}" Node Binary-Daten zurückgibt.\`,
            sample: sample,
            source: sample ? \`Sample \${sample}\` : 'Upload',
            timestamp: new Date().toISOString()
        }
    }];
}

// Erfolg: Binary-Daten gefunden
return [{
    json: {
        ...$json,
        sample: sample,
        source: sample ? \`Sample \${sample}\` : 'Upload'
    },
    binary: binaryData
}];`;
    
    node.parameters.jsCode = fixedCode;
    console.log(`✅ "${nodeName}" korrigiert: Error-Response statt throw Error`);
    return true;
}

/**
 * Fix 2: Verbindungen korrigieren (ai_outputParser zeigt auf Chat Model)
 * 
 * Prüft ob ai_outputParser Verbindung korrekt ist (zeigt auf Chat Model)
 * Falls nicht: Korrigiert Verbindung
 */
function fixConnections(workflow) {
    let fixed = false;
    
    // Finde Structured Output Parser Node
    const parserNode = workflow.nodes.find(n => n.name === 'Structured Output Parser');
    if (!parserNode) {
        console.warn(`⚠️  Node "Structured Output Parser" nicht gefunden`);
        return false;
    }
    
    // Finde Google Vertex Chat Model Node
    const chatModelNode = workflow.nodes.find(n => n.name === 'Google Vertex Chat Model');
    if (!chatModelNode) {
        console.warn(`⚠️  Node "Google Vertex Chat Model" nicht gefunden`);
        return false;
    }
    
    // Prüfe Verbindungen
    const connections = workflow.connections || {};
    const parserConnections = connections['Structured Output Parser'] || {};
    const aiOutputParserConnections = parserConnections.ai_outputParser || [];
    
    // Prüfe ob Verbindung bereits korrekt ist
    let isCorrect = false;
    if (aiOutputParserConnections.length > 0 && aiOutputParserConnections[0].length > 0) {
        const targetNode = aiOutputParserConnections[0][0].node;
        if (targetNode === 'Google Vertex Chat Model') {
            isCorrect = true;
        }
    }
    
    if (isCorrect) {
        console.log(`✅ "Structured Output Parser" Verbindung ist bereits korrekt`);
        return false;
    }
    
    // Korrigiere Verbindung
    if (!connections['Structured Output Parser']) {
        connections['Structured Output Parser'] = {};
    }
    
    connections['Structured Output Parser'].ai_outputParser = [[
        {
            node: 'Google Vertex Chat Model',
            type: 'ai_outputParser',
            index: 0
        }
    ]];
    
    console.log(`✅ "Structured Output Parser" Verbindung korrigiert: zeigt auf "Google Vertex Chat Model"`);
    return true;
}

/**
 * Fix 3: Transform Output Node - Besseres Error-Handling
 * 
 * Prüft ob Node bereits Error-Handling hat
 * Falls nicht: Verbessert Error-Handling
 */
function fixTransformOutputNode(workflow) {
    const nodeName = 'Transform Output';
    const node = workflow.nodes.find(n => n.name === nodeName);
    
    if (!node) {
        console.warn(`⚠️  Node "${nodeName}" nicht gefunden`);
        return false;
    }
    
    // Prüfe ob Code bereits Error-Handling hat
    const jsCode = node.parameters.jsCode || '';
    
    // Prüfe ob Error-Handling bereits vorhanden ist
    if (jsCode.includes("type: 'error'") && jsCode.includes('AI-Output fehlt')) {
        console.log(`✅ "${nodeName}" ist bereits korrigiert`);
        return false;
    }
    
    // Korrigiere Code
    const fixedCode = `// Transform Output für Website
// Prüfe ob Fehler-Response
if ($json.type === 'error') {
    return [{
        json: {
            type: 'error',
            error: $json.error || 'Unbekannter Fehler',
            message: $json.message || 'Fehler beim Verarbeiten der Visitenkarte',
            sample: $json.sample || '',
            source: $json.source || 'Upload',
            timestamp: $json.timestamp || new Date().toISOString()
        }
    }];
}

const source = $json.source || 'Upload';
const sample = $json.sample || '';

// Prüfe ob AI Output vorhanden
if (!$json.output || (Array.isArray($json.output) && $json.output.length === 0)) {
    return [{
        json: {
            type: 'error',
            error: 'AI-Output fehlt',
            message: 'AI Agent hat keine Daten zurückgegeben. Prüfe Structured Output Parser und AI Agent Konfiguration.',
            sample: sample,
            source: source,
            timestamp: new Date().toISOString()
        }
    }];
}

// AI Output transformieren
const contacts = Array.isArray($json.output) ? $json.output : [$json.output];

const output = contacts.map(contact => ({
  json: {
    type: 'business-card-processed',
    payload: {
      name: contact.name || '',
      company: contact.company || '',
      email: contact.email || '',
      phone: contact.phone || contact.phone_mobile || '',
      phone_office: contact.phone_office || contact.phone_büro || '',
      address: contact.address || '',
      city: contact.city || '',
      website: contact.website || contact.www || '',
      job_title: contact.job_title || contact.position || '',
      verification_status: contact.verification_status || 'unverified',
      confidence_score: contact.confidence_score !== undefined ? contact.confidence_score : 0.5,
      source: source,
      sample: sample,
      timestamp: new Date().toISOString()
    },
    _debug: $json._debug || null
  }
}));

return output;`;
    
    node.parameters.jsCode = fixedCode;
    console.log(`✅ "${nodeName}" korrigiert: Error-Handling verbessert`);
    return true;
}

/**
 * Wendet alle automatischen Fixes an
 * WICHTIG: Behält alle Debug-Nodes aus DEBUG.json bei!
 */
function applyAutomaticFixes(workflow) {
    console.log('\n🔧 Wende automatische Fixes an...\n');
    
    // WICHTIG: Prüfe ob Debug-Nodes vorhanden sind, wenn nicht: Fehler!
    const debugNodes = workflow.nodes.filter(n => 
        n.name && (n.name.includes('🔍 Debug') || n.name.includes('💾 Save Debug') || n.name.includes('Debug Aggregator'))
    );
    
    if (debugNodes.length === 0) {
        console.warn('⚠️  WARNUNG: Keine Debug-Nodes im Workflow gefunden!');
        console.warn('   Stelle sicher, dass DEBUG.json als Basis verwendet wird.');
    } else {
        console.log(`✅ ${debugNodes.length} Debug-Nodes gefunden: ${debugNodes.map(n => n.name).join(', ')}`);
        console.log('   Debug-Nodes werden BEIBEHALTEN!\n');
    }
    
    const fixes = {
        setzeSampleInfo: false,
        connections: false,
        transformOutput: false
    };
    
    // Fix 1: Setze Sample-Info Node
    fixes.setzeSampleInfo = fixSetzeSampleInfoNode(workflow);
    
    // Fix 2: Verbindungen
    fixes.connections = fixConnections(workflow);
    
    // Fix 3: Transform Output Node
    fixes.transformOutput = fixTransformOutputNode(workflow);
    
    // Prüfe ob Debug-Nodes noch vorhanden sind nach den Fixes
    const debugNodesAfter = workflow.nodes.filter(n => 
        n.name && (n.name.includes('🔍 Debug') || n.name.includes('💾 Save Debug') || n.name.includes('Debug Aggregator'))
    );
    
    if (debugNodes.length > 0 && debugNodesAfter.length < debugNodes.length) {
        console.error('❌ FEHLER: Debug-Nodes wurden versehentlich entfernt!');
        console.error(`   Vorher: ${debugNodes.length}, Nachher: ${debugNodesAfter.length}`);
    }
    
    return fixes;
}

/**
 * Hauptfunktion
 */
function main() {
    try {
        console.log('🔧 Starte automatische Workflow-Fixes...\n');
        
        // Lade Workflow (immer DEBUG.json verwenden!)
        const workflow = loadWorkflow(false); // false = immer DEBUG.json laden
        
        // WICHTIG: Stelle sicher, dass DEBUG.json als Basis verwendet wird
        const debugNodeCount = workflow.nodes.filter(n => 
            n.name && (n.name.includes('🔍 Debug') || n.name.includes('💾 Save Debug') || n.name.includes('Debug Aggregator'))
        ).length;
        
        if (debugNodeCount === 0) {
            console.error('❌ FEHLER: Workflow enthält keine Debug-Nodes!');
            console.error('   Stelle sicher, dass n8n-business-card-workflow-vertex-DEBUG.json existiert und Debug-Nodes enthält.');
            process.exit(1);
        }
        
        console.log(`✅ Workflow geladen: ${workflow.nodes.length} Nodes, ${debugNodeCount} Debug-Nodes`);
        
        // Wende Fixes an (Debug-Nodes bleiben erhalten!)
        const fixes = applyAutomaticFixes(workflow);
        
        // Prüfe nochmal ob Debug-Nodes erhalten geblieben sind
        const debugNodesAfterFixes = workflow.nodes.filter(n => 
            n.name && (n.name.includes('🔍 Debug') || n.name.includes('💾 Save Debug') || n.name.includes('Debug Aggregator'))
        ).length;
        
        if (debugNodesAfterFixes < debugNodeCount) {
            console.error(`❌ FEHLER: Debug-Nodes verloren! Vorher: ${debugNodeCount}, Nachher: ${debugNodesAfterFixes}`);
            console.error('   Workflow wird NICHT gespeichert!');
            process.exit(1);
        }
        
        // Speichere korrigierten Workflow
        fs.writeFileSync(WORKFLOW_FIXED_FILE, JSON.stringify(workflow, null, 2));
        console.log(`\n💾 Korrigierter Workflow gespeichert: ${WORKFLOW_FIXED_FILE}`);
        console.log(`   ✅ ${debugNodesAfterFixes} Debug-Nodes erhalten geblieben!`);
        
        // Zeige Zusammenfassung
        console.log('\n📈 Fix-Zusammenfassung:');
        const appliedFixes = Object.values(fixes).filter(f => f === true).length;
        
        if (fixes.setzeSampleInfo) {
            console.log('   ✅ "Setze Sample-Info" Node korrigiert');
        }
        if (fixes.connections) {
            console.log('   ✅ Verbindungen korrigiert');
        }
        if (fixes.transformOutput) {
            console.log('   ✅ "Transform Output" Node korrigiert');
        }
        
        if (appliedFixes === 0) {
            console.log('   ℹ️  Keine Fixes erforderlich - Workflow ist bereits korrekt!');
        }
        
        console.log(`\n✅ Automatische Fixes abgeschlossen! ${appliedFixes} Fix(s) angewendet.`);
        console.log(`\n📝 Nächster Schritt:`);
        console.log(`   1. Importiere ${WORKFLOW_FIXED_FILE} in n8n`);
        console.log(`   2. Befolge MANUAL_FIXES_REQUIRED.md für manuelle Fixes`);
        
    } catch (error) {
        console.error('❌ Fehler beim Fixen:', error.message);
        process.exit(1);
    }
}

// Starte wenn direkt aufgerufen
if (require.main === module) {
    main();
}

module.exports = {
    loadWorkflow,
    fixSetzeSampleInfoNode,
    fixConnections,
    fixTransformOutputNode,
    applyAutomaticFixes
};

