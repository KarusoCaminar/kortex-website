// CLI-Tool für Debug-Loop
// Benutzerfreundliche Schnittstelle zum Starten des Debug-Loops

const readline = require('readline');
const { startDebugLoop, checkDebugServer } = require('./debug-loop-controller');
const { triggerWorkflowSample, triggerWorkflowUpload } = require('./test-workflow');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log('═══════════════════════════════════════');
    console.log('🔍 Debug-Loop Controller');
    console.log('═══════════════════════════════════════');
    console.log('');

    // 1. Prüfe Debug-Server
    console.log('📊 Prüfe System-Status...');
    const serverRunning = await checkDebugServer();
    console.log(`   Debug-Server: ${serverRunning ? '✅ Läuft' : '❌ Läuft nicht'}`);
    
    if (!serverRunning) {
        console.log('');
        console.log('⚠️  Debug-Server läuft nicht!');
        console.log('');
        const startServer = await question('Debug-Server starten? (j/n): ');
        if (startServer.toLowerCase() === 'j') {
            console.log('');
            console.log('🚀 Starte Debug-Server...');
            console.log('   (Bitte in neuem Terminal starten: npm run debug-server)');
            console.log('');
            await question('Drücke Enter wenn Server läuft...');
        }
    }

    console.log('');

    // 2. Test-Option auswählen
    console.log('🧪 Test-Option wählen:');
    console.log('   1) Sample 1');
    console.log('   2) Sample 2');
    console.log('   3) Sample 3');
    console.log('   4) Upload (eigene Datei)');
    console.log('   5) Manuell (nur Loop, kein Trigger)');
    console.log('');
    
    const choice = await question('Option (1-5): ');
    
    let testData = {};
    
    switch (choice) {
        case '1':
            testData.sample = '1';
            break;
        case '2':
            testData.sample = '2';
            break;
        case '3':
            testData.sample = '3';
            break;
        case '4':
            const filePath = await question('Datei-Pfad: ');
            testData.upload = filePath.trim() || './samples/bc-1.jpg';
            break;
        case '5':
            testData.manual = true;
            break;
        default:
            testData.sample = '1';
    }

    console.log('');
    
    // 3. Max Iterationen
    const maxIter = await question(`Max Iterationen (Standard: 5): `);
    const maxIterations = parseInt(maxIter) || 5;

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('🚀 Starte Debug-Loop...');
    console.log('═══════════════════════════════════════');
    console.log('');

    // 4. Starte Loop
    try {
        const result = await startDebugLoop(testData);
        
        console.log('');
        console.log('═══════════════════════════════════════');
        console.log('✅ Debug-Loop abgeschlossen');
        console.log('═══════════════════════════════════════');
        
        rl.close();
        process.exit(result.success ? 0 : 1);
    } catch (error) {
        console.error('');
        console.error('❌ Kritischer Fehler:', error.message);
        rl.close();
        process.exit(1);
    }
}

main().catch(error => {
    console.error('❌ Fehler:', error);
    rl.close();
    process.exit(1);
});

