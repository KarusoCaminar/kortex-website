// Debug-Loop Controller
// Startet automatischen Debug-Loop bis alle Fehler behoben sind

const { runDebugLoop } = require('./workflow-debug-analyzer');
const { triggerWorkflowSample, triggerWorkflowUpload } = require('./test-workflow');
const http = require('http');

const DEBUG_SERVER_URL = 'http://localhost:3000';
const MAX_ITERATIONS = 5;
const DELAY_BETWEEN_ITERATIONS = 2000; // 2 Sekunden

/**
 * Prüft ob Debug-Server läuft
 */
function checkDebugServer() {
    return new Promise((resolve) => {
        const urlObj = new URL(DEBUG_SERVER_URL + '/debug/status');
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || 3000,
            path: urlObj.pathname,
            method: 'GET',
            timeout: 2000
        };

        const req = http.request(options, (res) => {
            resolve(true);
        });

        req.on('error', () => {
            resolve(false);
        });

        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

/**
 * Startet Debug-Loop mit automatischem Workflow-Trigger
 */
async function startDebugLoop(testData = { sample: '1' }) {
    console.log('🚀 Debug-Loop Controller gestartet');
    console.log(`📋 Test-Daten:`, testData);
    console.log('');

    // 1. Prüfe ob Debug-Server läuft
    console.log('🔍 Prüfe Debug-Server...');
    const serverRunning = await checkDebugServer();
    
    if (!serverRunning) {
        console.log('⚠️  Debug-Server läuft nicht auf localhost:3000');
        console.log('💡 Starte Debug-Server mit: npm run debug-server');
        console.log('   ODER: node debug-server.js');
        console.log('');
        console.log('📌 Alternative: Workflow speichert Debug-Daten manuell');
        console.log('');
    } else {
        console.log('✅ Debug-Server erreichbar');
    }

    // 2. Trigger Workflow
    console.log('');
    console.log('🧪 Trigger Workflow...');
    
    try {
        if (testData.sample && testData.sample !== 'upload') {
            await triggerWorkflowSample(testData.sample);
            console.log(`✅ Workflow getriggert mit Sample ${testData.sample}`);
        } else if (testData.upload) {
            await triggerWorkflowUpload(testData.upload);
            console.log(`✅ Workflow getriggert mit Upload: ${testData.upload}`);
        } else {
            console.log('⏭️  Workflow wird manuell getriggert');
        }
    } catch (error) {
        console.log(`⚠️  Workflow-Trigger fehlgeschlagen: ${error.message}`);
        console.log('⏭️  Workflow muss manuell getriggert werden');
    }

    // 3. Warte kurz auf Debug-Daten
    console.log('');
    console.log(`⏳ Warte 3 Sekunden auf Debug-Daten...`);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 4. Starte Debug-Loop
    console.log('');
    const result = await runDebugLoop(
        MAX_ITERATIONS,
        'http://localhost:3000/debug/workflow.json',
        DELAY_BETWEEN_ITERATIONS
    );

    // 5. Ergebnis
    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('📊 Debug-Loop Ergebnis:');
    console.log('═══════════════════════════════════════');
    console.log(`   Iterationen: ${result.iterations}`);
    console.log(`   Finaler Status: ${result.finalStatus}`);
    console.log(`   Erfolgreich: ${result.success ? '✅' : '❌'}`);
    
    if (result.maxIterationsReached && !result.success) {
        console.log('');
        console.log('⚠️  Max Iterationen erreicht, aber noch Fehler vorhanden');
        console.log('💡 Workflow manuell prüfen oder max Iterationen erhöhen');
    }

    if (result.success) {
        console.log('');
        console.log('✅ Workflow ist jetzt fehlerfrei!');
        console.log('💡 Bitte Workflow-JSON in n8n importieren:');
        console.log('   n8n-business-card-workflow-vertex-DEBUG.json');
    }

    return result;
}

// CLI Usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const testData = {};
    
    if (args[0] === 'sample') {
        testData.sample = args[1] || '1';
    } else if (args[0] === 'upload') {
        testData.upload = args[1] || './samples/bc-1.jpg';
    } else {
        // Default: Sample 1
        testData.sample = '1';
    }

    startDebugLoop(testData)
        .then(result => {
            process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Kritischer Fehler:', error);
            process.exit(1);
        });
}

module.exports = {
    startDebugLoop,
    checkDebugServer
};

