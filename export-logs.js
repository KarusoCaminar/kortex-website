// Script zum Exportieren von Logs in eine Datei, die direkt gelesen werden kann

/**
 * Exportiert alle Logs in eine JSON-Datei im Projekt
 * Diese Datei kann dann direkt von AI-Assistenten gelesen werden
 */
function exportLogsToFile() {
  try {
    const storedLogs = localStorage.getItem('workflowLogs');
    if (!storedLogs) {
      console.warn('⚠️ Keine Logs zum Exportieren gefunden');
      return null;
    }
    
    const logs = JSON.parse(storedLogs);
    
    // Erstelle strukturiertes Log-Export
    const exportData = {
      exportTimestamp: new Date().toISOString(),
      totalLogs: logs.length,
      logs: logs,
      summary: {
        total: logs.length,
        success: logs.filter(l => l.status === 'success').length,
        error: logs.filter(l => l.status === 'error').length,
        started: logs.filter(l => l.status === 'started').length,
        withErrors: logs.filter(l => l.errors && l.errors.length > 0).length
      },
      lastRun: logs[0] || null,
      lastRunErrors: logs[0]?.errors || [],
      allErrors: []
    };
    
    // Sammle alle Fehler
    logs.forEach(log => {
      if (log.errors && log.errors.length > 0) {
        log.errors.forEach(error => {
          exportData.allErrors.push({
            logId: log.id,
            timestamp: log.timestamp,
            sampleParam: log.sampleParam,
            workflowUrl: log.workflowUrl,
            error: error
          });
        });
      }
    });
    
    return exportData;
  } catch (e) {
    console.error('❌ Fehler beim Exportieren der Logs:', e);
    return null;
  }
}

/**
 * Lädt Logs als JSON-Datei herunter
 */
function downloadLogsJSON() {
  const exportData = exportLogsToFile();
  if (!exportData) {
    alert('⚠️ Keine Logs zum Downloaden gefunden');
    return;
  }
  
  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `workflow-logs-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('✅ Logs wurden als JSON exportiert');
  return exportData;
}

/**
 * Zeigt die letzten Fehler in der Console UND bereitet für Export vor
 */
function showLastRunErrorsForExport() {
  const lastRun = getLastRun();
  
  if (!lastRun) {
    console.log('❌ Kein letzter Run gefunden');
    return null;
  }
  
  const errorReport = {
    timestamp: new Date().toISOString(),
    lastRunId: lastRun.id,
    lastRunTimestamp: lastRun.timestamp,
    workflowUrl: lastRun.workflowUrl,
    sampleParam: lastRun.sampleParam,
    status: lastRun.status,
    duration: lastRun.duration,
    errors: lastRun.errors || [],
    events: lastRun.events || [],
    response: lastRun.response
  };
  
  // Zeige in Console
  console.group('🔍 Letzter Run - Fehler-Report:');
  console.log('⏰ Zeitstempel:', errorReport.lastRunTimestamp);
  console.log('📝 Sample Parameter:', errorReport.sampleParam);
  console.log('🌐 Webhook URL:', errorReport.workflowUrl);
  console.log('📊 Status:', errorReport.status);
  console.log('⏱️ Dauer:', errorReport.duration || 'N/A');
  
  if (errorReport.errors.length > 0) {
    console.group('❌ Fehler:');
    errorReport.errors.forEach((error, index) => {
      console.group(`Fehler ${index + 1}:`);
      console.error('Typ:', error.type || 'unknown');
      console.error('Nachricht:', error.message || 'Keine Nachricht');
      if (error.status) console.error('HTTP Status:', error.status);
      if (error.body) console.error('Response Body:', error.body);
      if (error.stack) console.error('Stack Trace:', error.stack);
      console.groupEnd();
    });
    console.groupEnd();
  } else {
    console.log('✅ Keine Fehler');
  }
  
  if (errorReport.events.length > 0) {
    console.group('📋 Events:');
    errorReport.events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.type} (${event.timestamp})`, event.data);
    });
    console.groupEnd();
  }
  
  if (errorReport.response) {
    console.group('✅ Response:');
    console.log(errorReport.response);
    console.groupEnd();
  }
  
  console.groupEnd();
  
  // Erstelle JSON-String für Copy-Paste
  const errorJson = JSON.stringify(errorReport, null, 2);
  console.log('📋 Fehler-Report als JSON (kopieren für Export):');
  console.log(errorJson);
  
  return errorReport;
}

/**
 * Erstellt eine Fehler-Zusammenfassung als Text
 */
function createErrorSummary() {
  const logs = getLastLogs(50);
  const errors = [];
  
  logs.forEach(log => {
    if (log.errors && log.errors.length > 0) {
      log.errors.forEach(error => {
        errors.push({
          logId: log.id,
          timestamp: log.timestamp,
          sampleParam: log.sampleParam,
          workflowUrl: log.workflowUrl,
          errorType: error.type || 'unknown',
          errorMessage: error.message || 'Keine Nachricht',
          errorStatus: error.status || null,
          errorBody: error.body || null,
          errorStack: error.stack || null
        });
      });
    }
  });
  
  if (errors.length === 0) {
    return '✅ Keine Fehler in den letzten 50 Runs gefunden';
  }
  
  let summary = `❌ Fehler-Zusammenfassung (${errors.length} Fehler in ${logs.length} Runs):\n\n`;
  
  errors.forEach((item, index) => {
    summary += `Fehler ${index + 1}:\n`;
    summary += `  Log-ID: ${item.logId}\n`;
    summary += `  Zeitstempel: ${item.timestamp}\n`;
    summary += `  Sample: ${item.sampleParam}\n`;
    summary += `  URL: ${item.workflowUrl}\n`;
    summary += `  Typ: ${item.errorType}\n`;
    summary += `  Nachricht: ${item.errorMessage}\n`;
    if (item.errorStatus) summary += `  HTTP Status: ${item.errorStatus}\n`;
    if (item.errorBody) summary += `  Response Body: ${item.errorBody}\n`;
    if (item.errorStack) summary += `  Stack Trace: ${item.errorStack}\n`;
    summary += '\n';
  });
  
  return summary;
}

/**
 * Zeigt Fehler-Zusammenfassung und kopiert sie
 */
function showErrorSummary() {
  const summary = createErrorSummary();
  console.log(summary);
  
  // Versuche in Clipboard zu kopieren
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary).then(() => {
      console.log('✅ Fehler-Zusammenfassung wurde in Clipboard kopiert');
    }).catch(err => {
      console.warn('⚠️ Clipboard-Zugriff fehlgeschlagen:', err);
    });
  }
  
  return summary;
}

// Export für Node.js (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    exportLogsToFile,
    downloadLogsJSON,
    showLastRunErrorsForExport,
    createErrorSummary,
    showErrorSummary
  };
}

// Globale Funktionen im Browser
if (typeof window !== 'undefined') {
  window.exportLogsToFile = exportLogsToFile;
  window.downloadLogsJSON = downloadLogsJSON;
  window.showLastRunErrorsForExport = showLastRunErrorsForExport;
  window.createErrorSummary = createErrorSummary;
  window.showErrorSummary = showErrorSummary;
  
  console.log('✅ Log-Export-Funktionen geladen! Nutze:');
  console.log('  - downloadLogsJSON() - Downloadet alle Logs als JSON');
  console.log('  - showLastRunErrorsForExport() - Zeigt Fehler des letzten Runs');
  console.log('  - showErrorSummary() - Zeigt und kopiert Fehler-Zusammenfassung');
  console.log('  - exportLogsToFile() - Gibt Logs als Objekt zurück');
}

