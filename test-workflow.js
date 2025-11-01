// Test-Workflow Script
// Sendet Requests an n8n Webhook zum Triggern des Workflows

const https = require('https');
const http = require('http');
const { URL } = require('url');

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n2.kortex-system.de/webhook-test/business-card-extraction';
const SAMPLE = process.argv[2] || '1'; // sample=1, 2, 3 oder 'upload'

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
                'User-Agent': 'Debug-Loop-Tester/1.0',
                'Accept': 'application/json'
            }
        };

        const client = urlObj.protocol === 'https:' ? https : http;

        const req = client.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        response: response,
                        hasDebugData: !!(response.debugSummary || response.debugData)
                    });
                } catch (error) {
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        response: data,
                        hasDebugData: false
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject({
                success: false,
                error: error.message
            });
        });

        req.end();
    });
}

/**
 * Sendet POST Request mit Binary-Datei (Upload)
 */
function triggerWorkflowUpload(filePath) {
    const fs = require('fs');
    const path = require('path');
    
    return new Promise((resolve, reject) => {
        if (!filePath || !fs.existsSync(filePath)) {
            reject({ error: 'Datei nicht gefunden', filePath });
            return;
        }

        const urlObj = new URL(N8N_WEBHOOK_URL);
        const fileData = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        const boundary = `----WebKitFormBoundary${Date.now()}`;
        const formData = Buffer.concat([
            Buffer.from(`--${boundary}\r\n`),
            Buffer.from(`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`),
            Buffer.from(`Content-Type: image/jpeg\r\n\r\n`),
            fileData,
            Buffer.from(`\r\n--${boundary}--\r\n`)
        ]);

        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname,
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': formData.length,
                'User-Agent': 'Debug-Loop-Tester/1.0'
            }
        };

        const client = urlObj.protocol === 'https:' ? https : http;

        const req = client.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        response: response,
                        hasDebugData: !!(response.debugSummary || response.debugData)
                    });
                } catch (error) {
                    resolve({
                        success: true,
                        statusCode: res.statusCode,
                        response: data,
                        hasDebugData: false
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject({
                success: false,
                error: error.message
            });
        });

        req.write(formData);
        req.end();
    });
}

// CLI Usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0] || 'sample';
    
    if (command === 'sample') {
        const sample = args[1] || '1';
        console.log(`🧪 Trigger Workflow mit Sample ${sample}...`);
        triggerWorkflowSample(sample)
            .then(result => {
                console.log(`✅ Workflow getriggert`);
                console.log(`   Status: ${result.statusCode}`);
                console.log(`   Has Debug Data: ${result.hasDebugData}`);
                if (result.hasDebugData) {
                    console.log(`   Debug Nodes: ${result.response.debugSummary?.totalDebugNodes || 0}`);
                }
            })
            .catch(error => {
                console.error('❌ Fehler:', error);
                process.exit(1);
            });
    } else if (command === 'upload') {
        const filePath = args[1] || './samples/bc-1.jpg';
        console.log(`🧪 Trigger Workflow mit Upload: ${filePath}...`);
        triggerWorkflowUpload(filePath)
            .then(result => {
                console.log(`✅ Workflow getriggert`);
                console.log(`   Status: ${result.statusCode}`);
                console.log(`   Has Debug Data: ${result.hasDebugData}`);
            })
            .catch(error => {
                console.error('❌ Fehler:', error);
                process.exit(1);
            });
    } else {
        console.log('Usage:');
        console.log('  node test-workflow.js sample [1|2|3]');
        console.log('  node test-workflow.js upload [file-path]');
    }
}

module.exports = {
    triggerWorkflowSample,
    triggerWorkflowUpload
};

