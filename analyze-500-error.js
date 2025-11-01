// Analysiere 500-Fehler: Prüft n8n Workflow auf mögliche Ursachen

const fs = require('fs');
const path = require('path');

const WORKFLOW_FILE = path.join(__dirname, 'n8n-business-card-workflow-vertex-FIXED.json');

/**
 * Analysiert den n8n Workflow auf mögliche Ursachen für 500-Fehler
 */
function analyze500Error() {
    console.log('🔍 Analysiere n8n Workflow auf 500-Fehler-Ursachen...\n');
    
    const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));
    
    const issues = [];
    
    // 1. Prüfe "Setze Sample-Info" Node
    const setzeSampleInfo = workflow.nodes.find(n => n.name === 'Setze Sample-Info');
    if (setzeSampleInfo) {
        const jsCode = setzeSampleInfo.parameters.jsCode || '';
        
        // Prüfe ob Error-Response zurückgegeben wird
        if (jsCode.includes("type: 'error'") && jsCode.includes('Binary-Daten fehlen')) {
            console.log('✅ "Setze Sample-Info" sendet Error-Response (korrekt)');
        } else {
            issues.push({
                node: 'Setze Sample-Info',
                issue: 'Sendet KEINE Error-Response bei fehlenden Binary-Daten',
                fix: 'Sollte Error-Response zurückgeben statt [] oder throw Error'
            });
        }
        
        // Prüfe ob return [] vorhanden ist (kann 500-Fehler verursachen)
        if (jsCode.includes('return []')) {
            issues.push({
                node: 'Setze Sample-Info',
                issue: 'Code enthält "return []" - kann 500-Fehler verursachen',
                fix: 'Sollte Error-Response zurückgeben statt []'
            });
        }
        
        // Prüfe ob throw Error vorhanden ist
        if (jsCode.includes('throw new Error') || jsCode.includes('throw Error')) {
            issues.push({
                node: 'Setze Sample-Info',
                issue: 'Code enthält "throw Error" - verursacht 500-Fehler',
                fix: 'Sollte Error-Response zurückgeben statt throw Error'
            });
        }
    }
    
    // 2. Prüfe "Lade Sample X" Nodes
    const sampleNodes = ['Lade Sample 1', 'Lade Sample 2', 'Lade Sample 3'];
    sampleNodes.forEach(nodeName => {
        const node = workflow.nodes.find(n => n.name === nodeName);
        if (node) {
            // Prüfe ob Response Format "file" ist
            const responseFormat = node.parameters.options?.response?.response?.responseFormat;
            if (responseFormat !== 'file') {
                issues.push({
                    node: nodeName,
                    issue: `Response Format ist nicht "file" (ist: ${responseFormat || 'undefined'})`,
                    fix: 'Sollte responseFormat: "file" haben, damit Binary-Daten zurückgegeben werden'
                });
            }
        }
    });
    
    // 3. Prüfe Verbindungen
    const connections = workflow.connections || {};
    
    // Prüfe ob "Lade Sample X" Nodes mit "Setze Sample-Info" verbunden sind
    sampleNodes.forEach(nodeName => {
        const nodeConnections = connections[nodeName];
        if (!nodeConnections || !nodeConnections.main || !nodeConnections.main[0]) {
            issues.push({
                node: nodeName,
                issue: 'Nicht mit "Setze Sample-Info" verbunden',
                fix: 'Sollte mit "Setze Sample-Info" verbunden sein'
            });
        } else {
            const targetNode = nodeConnections.main[0][0]?.node;
            if (targetNode !== 'Setze Sample-Info') {
                issues.push({
                    node: nodeName,
                    issue: `Verbunden mit "${targetNode}" statt "Setze Sample-Info"`,
                    fix: 'Sollte mit "Setze Sample-Info" verbunden sein'
                });
            }
        }
    });
    
    // 4. Prüfe ob "Setze Sample-Info" mit AI Agent verbunden ist
    const setzeSampleInfoConnections = connections['Setze Sample-Info'];
    if (!setzeSampleInfoConnections || !setzeSampleInfoConnections.main) {
        issues.push({
            node: 'Setze Sample-Info',
            issue: 'Keine Ausgangs-Verbindung',
            fix: 'Sollte mit Debug Node oder AI Agent verbunden sein'
        });
    }
    
    // 5. Prüfe Debug Node nach "Setze Sample-Info"
    const debugSetzeSampleInfo = workflow.nodes.find(n => n.name === '🔍 Debug: Setze Sample-Info');
    if (!debugSetzeSampleInfo) {
        issues.push({
            node: 'Setze Sample-Info',
            issue: 'Kein Debug Node nach "Setze Sample-Info" vorhanden',
            fix: 'Debug Node sollte vorhanden sein (optional, aber hilfreich)'
        });
    }
    
    // 6. Prüfe ob Binary weitergegeben wird
    if (setzeSampleInfo) {
        const jsCode = setzeSampleInfo.parameters.jsCode || '';
        if (!jsCode.includes('binary: binaryData')) {
            issues.push({
                node: 'Setze Sample-Info',
                issue: 'Binary-Daten werden nicht explizit weitergegeben',
                fix: 'Sollte binary: binaryData im return enthalten'
            });
        }
    }
    
    // Zeige Ergebnisse
    console.log('\n📊 Analyse-Ergebnisse:\n');
    
    if (issues.length === 0) {
        console.log('✅ Keine offensichtlichen Probleme gefunden!');
        console.log('\n💡 Mögliche Ursachen für 500-Fehler:');
        console.log('   1. "Lade Sample X" Nodes geben keine Binary-Daten zurück');
        console.log('   2. Binary-Daten werden nicht korrekt weitergegeben');
        console.log('   3. AI Agent Node kann Binary-Daten nicht verarbeiten');
        console.log('   4. Structured Output Parser ist nicht korrekt konfiguriert');
    } else {
        console.log(`❌ ${issues.length} Problem(e) gefunden:\n`);
        issues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue.node}:`);
            console.log(`   Problem: ${issue.issue}`);
            console.log(`   Fix: ${issue.fix}\n`);
        });
    }
    
    // Generiere Fix-Empfehlungen
    console.log('\n💡 Fix-Empfehlungen:');
    
    const setzeSampleInfoIssues = issues.filter(i => i.node === 'Setze Sample-Info');
    if (setzeSampleInfoIssues.length > 0) {
        console.log('\n1. "Setze Sample-Info" Node korrigieren:');
        console.log('   - Stelle sicher, dass Error-Response zurückgegeben wird (nicht [] oder throw)');
        console.log('   - Stelle sicher, dass binary: binaryData im return enthalten ist');
    }
    
    const sampleNodesIssues = issues.filter(i => i.node.includes('Lade Sample'));
    if (sampleNodesIssues.length > 0) {
        console.log('\n2. "Lade Sample X" Nodes korrigieren:');
        console.log('   - Stelle sicher, dass responseFormat: "file" gesetzt ist');
        console.log('   - Stelle sicher, dass Nodes mit "Setze Sample-Info" verbunden sind');
    }
    
    console.log('\n3. In n8n prüfen:');
    console.log('   - Öffne letzte Execution in n8n');
    console.log('   - Prüfe welcher Node den Fehler verursacht');
    console.log('   - Prüfe ob "Lade Sample X" Nodes Binary-Daten zurückgeben');
    
    return issues;
}

// Hauptfunktion
function main() {
    try {
        analyze500Error();
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
    analyze500Error
};

