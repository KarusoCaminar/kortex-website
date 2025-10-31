// Script zum Abrufen der letzten Workflow-Logs aus localStorage

/**
 * Ruft die letzten N Workflow-Logs ab
 * @param {number} count - Anzahl der abzurufenden Logs (default: 1 = letzter Run)
 * @returns {Array} Array von Log-Objekten
 */
function getLastLogs(count = 1) {
  try {
    const storedLogs = localStorage.getItem('workflowLogs');
    if (!storedLogs) {
      console.log('Keine Logs gefunden');
      return [];
    }
    
    const logs = JSON.parse(storedLogs);
    return logs.slice(0, count);
  } catch (e) {
    console.error('Fehler beim Abrufen der Logs:', e);
    return [];
  }
}

/**
 * Ruft den letzten Workflow-Run ab
 * @returns {Object|null} Letztes Log-Objekt oder null
 */
function getLastRun() {
  const logs = getLastLogs(1);
  return logs.length > 0 ? logs[0] : null;
}

/**
 * Ruft alle Fehler aus dem letzten Run ab
 * @returns {Array} Array von Fehler-Objekten
 */
function getLastRunErrors() {
  const lastRun = getLastRun();
  if (!lastRun) {
    return [];
  }
  return lastRun.errors || [];
}

/**
 * Zeigt die Fehler des letzten Runs in der Console an
 */
function showLastRunErrors() {
  const lastRun = getLastRun();
  
  if (!lastRun) {
    console.log('❌ Kein letzter Run gefunden');
    return;
  }
  
  console.group(`🔍 Letzter Run: ${lastRun.id}`);
  console.log('⏰ Zeitstempel:', lastRun.timestamp);
  console.log('📝 Sample Parameter:', lastRun.sampleParam);
  console.log('🌐 Webhook URL:', lastRun.workflowUrl);
  console.log('📊 Status:', lastRun.status);
  console.log('⏱️ Dauer:', lastRun.duration || 'N/A');
  
  if (lastRun.errors && lastRun.errors.length > 0) {
    console.group('❌ Fehler:');
    lastRun.errors.forEach((error, index) => {
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
  
  if (lastRun.events && lastRun.events.length > 0) {
    console.group('📋 Events:');
    lastRun.events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.type} (${event.timestamp})`, event.data);
    });
    console.groupEnd();
  }
  
  if (lastRun.response) {
    console.group('✅ Response:');
    console.log(lastRun.response);
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return lastRun;
}

/**
 * Zeigt eine Zusammenfassung aller Fehler aus allen Logs
 */
function showAllErrors() {
  const logs = getLastLogs(50); // Letzte 50 Logs
  const allErrors = [];
  
  logs.forEach(log => {
    if (log.errors && log.errors.length > 0) {
      log.errors.forEach(error => {
        allErrors.push({
          logId: log.id,
          timestamp: log.timestamp,
          sampleParam: log.sampleParam,
          error: error
        });
      });
    }
  });
  
  if (allErrors.length === 0) {
    console.log('✅ Keine Fehler in den letzten 50 Runs gefunden');
    return;
  }
  
  console.group(`❌ Gefundene Fehler (${allErrors.length}):`);
  allErrors.forEach((item, index) => {
    console.group(`Fehler ${index + 1} - Log: ${item.logId}`);
    console.log('Zeitstempel:', item.timestamp);
    console.log('Sample:', item.sampleParam);
    console.error('Fehler:', item.error);
    console.groupEnd();
  });
  console.groupEnd();
  
  return allErrors;
}

// Export für Node.js (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getLastLogs,
    getLastRun,
    getLastRunErrors,
    showLastRunErrors,
    showAllErrors
  };
}

// Globale Funktionen im Browser
if (typeof window !== 'undefined') {
  window.getLastLogs = getLastLogs;
  window.getLastRun = getLastRun;
  window.getLastRunErrors = getLastRunErrors;
  window.showLastRunErrors = showLastRunErrors;
  window.showAllErrors = showAllErrors;
  
  // Hilfsfunktion: Öffne Log-Viewer
  window.openLogViewer = function() {
    window.open('view-logs.html', '_blank');
  };
  
  console.log('✅ Log-Funktionen geladen! Nutze:');
  console.log('  - getLastRun() - Letzter Run');
  console.log('  - getLastRunErrors() - Fehler des letzten Runs');
  console.log('  - showLastRunErrors() - Zeigt Fehler des letzten Runs');
  console.log('  - showAllErrors() - Zeigt alle Fehler');
  console.log('  - openLogViewer() - Öffnet Log-Viewer');
}

