// Lokaler HTTP-Server für Debug-Daten
// Stellt workflow-debug.json als URL bereit für Cursor-KI

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DEBUG_FILE = path.join(__dirname, 'workflow-debug.json');

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint: GET /debug/workflow.json
// Liefert die aktuelle workflow-debug.json
app.get('/debug/workflow.json', (req, res) => {
    try {
        if (!fs.existsSync(DEBUG_FILE)) {
            return res.status(404).json({
                error: 'Debug-Datei nicht gefunden',
                suggestion: 'Workflow ausführen, um Debug-Daten zu generieren',
                timestamp: new Date().toISOString()
            });
        }

        const debugData = JSON.parse(fs.readFileSync(DEBUG_FILE, 'utf8'));
        res.json(debugData);
    } catch (error) {
        res.status(500).json({
            error: 'Fehler beim Lesen der Debug-Datei',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Endpoint: POST /debug/save
// Speichert Debug-Daten von n8n
app.post('/debug/save', (req, res) => {
    try {
        const debugData = {
            timestamp: new Date().toISOString(),
            ...req.body
        };

        fs.writeFileSync(DEBUG_FILE, JSON.stringify(debugData, null, 2), 'utf8');
        
        console.log('✅ Debug-Daten gespeichert:', DEBUG_FILE);
        
        res.json({
            success: true,
            message: 'Debug-Daten gespeichert',
            file: DEBUG_FILE,
            timestamp: debugData.timestamp
        });
    } catch (error) {
        console.error('❌ Fehler beim Speichern:', error.message);
        res.status(500).json({
            error: 'Fehler beim Speichern der Debug-Daten',
            details: error.message
        });
    }
});

// Endpoint: GET /debug/status
// Zeigt Status des Debug-Systems
app.get('/debug/status', (req, res) => {
    const status = {
        server: 'running',
        port: PORT,
        fileExists: fs.existsSync(DEBUG_FILE),
        filePath: DEBUG_FILE,
        timestamp: new Date().toISOString()
    };

    if (fs.existsSync(DEBUG_FILE)) {
        try {
            const stats = fs.statSync(DEBUG_FILE);
            status.fileSize = stats.size;
            status.fileModified = stats.mtime.toISOString();
        } catch (error) {
            status.error = error.message;
        }
    }

    res.json(status);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Debug-Server läuft auf http://localhost:${PORT}`);
    console.log(`📊 Endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/debug/workflow.json`);
    console.log(`   POST http://localhost:${PORT}/debug/save`);
    console.log(`   GET  http://localhost:${PORT}/debug/status`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Debug-Server wird beendet...');
    process.exit(0);
});

module.exports = app;

