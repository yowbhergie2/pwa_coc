// ============================
// FIREBASE CONFIGURATION
// ============================

const FIRESTORE_PROJECT_ID = 'comptime-tracker-97857';
const FIRESTORE_EMAIL = 'firestore-admin@comptime-tracker-97857.iam.gserviceaccount.com';
const FIRESTORE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/Z9yW+t8TR9Va\nqOKiuafWHsXwtAW+o3cxpzejfZpIgGtAWMm7ZolxwhiBAjc2nShL6G2B/N2tOiov\nCuwA5h+5UcihV97EdmtFiryUjbwU3fVQ8Sfyl3RNZLsyyJ0Q30RXwjV0AI9v1uCQ\nOb6Dg3U4r32Y4IZDgVdc14yD+TYf3mEzzsNIzOhKQlO2wlo5h30zaGu5K2H/5RqF\nQPoKjFReFf71WaaZjoHW4dRnOOAoqkz2zun96qRpjwOGrjo+yvBihrg5CJ9c8pAf\nVqWkII1YICG4JB34HMjXLkzIctcVfSZCUMXc3c98oal/Df6yX0TyDyCoRYsoxo8U\nxaCMaVp7AgMBAAECggEAJKkXgqGFZZN+JXGwivtlTqkxP3Ozn/p+Q3fkO7+8c8OJ\nB1eaN/chPzUubVNH0QGT7MoVY27T5LB90OnWHyv0ipHEDEcgx19pF3ZFvWxSSGrk\n6D5waNIieAphoo3zK36f//EWPOQ4lPLCq00sFNNyect/Em96t+ZHneQ5KTPr7nlb\n5F+tMtiYV8ife0/UpUEjdU7JpNGNqo9PFyd8qAG5FiIHs6OqAvzCmc/0h+mKYCh3\nBIme2L3w63ZVMd1yn6/gWyzEVBbAU4q4rYkH/anARkJMlk5Ep24Mhrrx63BfhviU\n1jTZg48R67Q7s0Q8kd3O3JppBvYaZPhrGfTO9G1p2QKBgQDxpZi9pRoa2uYJnhop\nittwl+ohqj+6C+tKlsaFs9TG5hhTo4vTLkdsMe2wEq1ewnK8qMzKSlqGW/TcC9jQ\nfSirh1FeT3nWn23WNe8TBtVQNfNpgFOIy7lyP/wwXR0BSNZ1zYSCMK1JUMUMNwX+\n/97ZS1YbhCUcJ++w+b+aa0XRswKBgQDKxlCAqvkmH02e2KnSlMFYyAeQifnZ0JzP\nmyKhTFa35u8KJlite4QnUyQAHNN921hS2KgLXGGn4Uzthnc42RZc5nF0ClmommDG\n1iXnAzB2WYDHLNXa/+TFl2E/3fSqwAj2nfsA8bZPuRmDizDsZFUmNdg9vPBYwGWj\nAVvtPligGQKBgF5FKww4/7EgWoPAARbZy/fl2/ocL9ZF1hn4LiR03nplw3HFqMPP\nFx/3bnG1J5uDIj3FYHc+gIhQEXtSx9e2LAqWtMClIrP+6FucGNOEY+1xzq8G2A/S\n4lrW6Wx4ttsMblXwwlQD52ZlsymrwZQUf/ynbkU3zT5puhGBrSTx2oAPAoGAXj9w\n2W0eYq64CDXSMRN9DoPiqDbJT4kb6Y7EuM3fnJiU0FXkb7XyRcjp+bdsQZo64j7b\nVHR622nntJsEPQMB1uoxH2tUIv6mLqUIduhPlSKirXDUcXbw4TosNGA4wUiCogXp\nzZWLVGDHUBHZCnbT8O+j84Ym/ElotCwEiy+oR7kCgYEAmHXhgodnywFht3HeQ/WG\nXggb1aImYa1i0tvSL7RRRbCwNGWT5nyxaXvvR7UYgydX15xDE6sMDKwt2VhucKUt\nI95K0Bc5aX/OjMLwwuUBpLKoS5hE4kPk3m5nhRNZB1sLBzdWC5n0+urP4TgOj4nD\n/p23eqMuKHrA+ijlvuI7qBI=\n-----END PRIVATE KEY-----\n';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCxM58B1TRg6HBo9ZNqWtMziliX2N5YZA",
  authDomain: "comptime-tracker-97857.firebaseapp.com",
  projectId: "comptime-tracker-97857",
  storageBucket: "comptime-tracker-97857.firebasestorage.app",
  messagingSenderId: "119022135793",
  appId: "1:119022135793:web:c3f931343d01645c747c50"
};

// Certificate Template Spreadsheet
const CERTIFICATE_TEMPLATE_ID = '12j7SZEwR5J78HMAbDn0-Nbg5DEYuRngsH1vCDnCln9E';

// ============================
// JWT TOKEN CREATION
// ============================

function createJWT() {
  const now = Math.floor(Date.now() / 1000);
  const userEmail = Session.getActiveUser().getEmail();
  
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  const payload = {
    iss: FIRESTORE_EMAIL,
    sub: FIRESTORE_EMAIL,
    aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
    iat: now,
    exp: now + 3600,
    uid: FIRESTORE_EMAIL,
    claims: {
      email: userEmail
    }
  };
  
  const encodedHeader = Utilities.base64EncodeWebSafe(JSON.stringify(header)).replace(/=+$/, '');
  const encodedPayload = Utilities.base64EncodeWebSafe(JSON.stringify(payload)).replace(/=+$/, '');
  
  const signatureInput = encodedHeader + '.' + encodedPayload;
  
  const signature = Utilities.computeRsaSha256Signature(signatureInput, FIRESTORE_KEY);
  const encodedSignature = Utilities.base64EncodeWebSafe(signature).replace(/=+$/, '');
  
  return signatureInput + '.' + encodedSignature;
}

// ============================
// MENU & UI
// ============================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('COC Admin')
    .addItem('Open CompTime Tracker', 'showAppModal')
    .addSeparator()
    .addItem('Sync Reports to Sheet', 'syncReportsToSheet')
    .addToUi();
}

function showAppModal() {
  // --- FIX ---
  // Was: HtmlService.createHtmlOutputFromFile('Main')
  // This just gets the raw text.
  //
  // Now: HtmlService.createTemplateFromFile('Main').evaluate()
  // This creates a template, processes all the <?!= ... ?> tags,
  // and returns the final, evaluated HTML.
  const html = HtmlService.createTemplateFromFile('Main').evaluate()
    .setWidth(1400)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'CompTime Tracker');
}

// ============================
// HTML INCLUDE HELPER
// ============================

/**
 * Include external HTML files for modular HTML structure
 * Usage in HTML: <?!= include('filename') ?>
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ============================
// CLIENT-SIDE CONFIG & TOKEN
// ============================

function getFirebaseConfigAndToken() {
  try {
    const customToken = createJWT();
    const userEmail = Session.getActiveUser().getEmail();
    
    return {
      config: FIREBASE_CONFIG,
      token: customToken,
      userEmail: userEmail
    };
  } catch (error) {
    throw new Error('Failed to create authentication token: ' + error.toString());
  }
}

// ============================
// FIRESTORE INITIALIZATION
// ============================

function getFirestore() {
  return FirestoreApp.getFirestore(FIRESTORE_EMAIL, FIRESTORE_KEY, FIRESTORE_PROJECT_ID);
}

// ============================
// SERVER-SIDE FUNCTIONS
// ============================

// ========== LOG OVERTIME FEATURE SERVER FUNCTIONS ==========

// Check if overtime can be logged (no certificate or historical balance for that month)
function checkOvertimeBlocks_SERVER(employeeId, month, year) {
  try {
    const db = getFirestore();
    const monthYearStr = `${year}-${String(month + 1).padStart(2, '0')}`;

    // Check for existing certificate for this month/year
    // Query all certificates for employee and filter by month/year in code
    const allCertificatesQuery = db.getDocuments('certificates');

    for (let i = 0; i < allCertificatesQuery.length; i++) {
      const cert = allCertificatesQuery[i].obj;
      if (cert.employeeId === employeeId && cert.month === month && cert.year === year) {
        return {
          success: false,
          error: 'A certificate already exists for this month. Cannot log overtime.'
        };
      }
    }

    // Check for historical balance for this month/year
    // Query all creditBatches for employee and filter in code
    const allBatchesQuery = db.getDocuments('creditBatches');

    for (let i = 0; i < allBatchesQuery.length; i++) {
      const batch = allBatchesQuery[i].obj;
      if (batch.employeeId === employeeId &&
          batch.source === 'Historical' &&
          batch.monthYear === monthYearStr) {
        return {
          success: false,
          error: 'Historical balance exists for this month. Cannot log overtime.'
        };
      }
    }

    return { success: true };

  } catch (error) {
    Logger.log('Error checking overtime blocks: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get uncertified overtime logs for a specific month
function getUncertifiedOvertimeForMonth_SERVER(employeeId, month, year) {
  try {
    const db = getFirestore();

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    const logDocs = db.getDocuments('overtimeLogs');
    const logs = [];

    for (let i = 0; i < logDocs.length; i++) {
      const log = logDocs[i].obj;
      if (!log || log.employeeId !== employeeId) {
        continue;
      }

      if (log.status !== 'Uncertified' || !log.overtimeDate) {
        continue;
      }

      const overtimeDate = new Date(log.overtimeDate);
      if (overtimeDate >= monthStart && overtimeDate <= monthEnd) {
        logs.push(log);
      }
    }

    return logs;

  } catch (error) {
    Logger.log('Error getting uncertified overtime: ' + error.toString());
    return [];
  }
}

// Get total balance (Active + Uncertified)
function getTotalBalance_SERVER(employeeId) {
  try {
    const db = getFirestore();

    // Get Active credits
    const batchDocs = db.getDocuments('creditBatches');
    let activeBalance = 0;

    for (let i = 0; i < batchDocs.length; i++) {
      const batch = batchDocs[i].obj;
      if (batch && batch.employeeId === employeeId && batch.status === 'Active') {
        activeBalance += Number(batch.remainingHours || 0);
      }
    }

    // Get Uncertified logs
    const logDocs = db.getDocuments('overtimeLogs');
    let uncertifiedBalance = 0;

    for (let i = 0; i < logDocs.length; i++) {
      const log = logDocs[i].obj;
      if (log && log.employeeId === employeeId && log.status === 'Uncertified') {
        uncertifiedBalance += Number(log.earnedHours || 0);
      }
    }

    const totalBalance = activeBalance + uncertifiedBalance;

    return {
      success: true,
      active: Number(activeBalance.toFixed(2)),
      uncertified: Number(uncertifiedBalance.toFixed(2)),
      total: Number(totalBalance.toFixed(2))
    };

  } catch (error) {
    return {
      success: false,
      total: 0,
      error: error.toString()
    };
  }
}

// Auto-detect day type (weekday/weekend/holiday)
function getDayType_SERVER(dateStr) {
  try {
    const db = getFirestore();
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Check if weekend
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

    // Check if holiday
    let isHoliday = false;
    let holidayName = '';

    try {
      const holidaysQuery = db.getDocuments('holidays');

      for (let i = 0; i < holidaysQuery.length; i++) {
        const holiday = holidaysQuery[i].obj;
        if (holiday.date === dateStr) {
          isHoliday = true;
          holidayName = holiday.name || 'Holiday';
          break;
        }
      }
    } catch (holidayError) {
      Logger.log('Error checking holidays (collection may not exist): ' + holidayError.toString());
      // Continue without holiday check
    }

    return {
      success: true,
      isWeekend: isWeekend,
      isHoliday: isHoliday,
      holidayName: holidayName
    };

  } catch (error) {
    Logger.log('Error detecting day type: ' + error.toString());
    return {
      success: false,
      isWeekend: false,
      isHoliday: false,
      error: error.toString()
    };
  }
}

// Get months with historical balance for an employee
function getHistoricalBalanceMonths_SERVER(employeeId, year) {
  try {
    const db = getFirestore();
    const allBatchesQuery = db.getDocuments('creditBatches');

    const historicalMonths = [];

    for (let i = 0; i < allBatchesQuery.length; i++) {
      const batch = allBatchesQuery[i].obj;
      if (batch.employeeId === employeeId && batch.source === 'Historical' && batch.monthYear) {
        const [batchYear, batchMonth] = batch.monthYear.split('-');
        if (parseInt(batchYear) === parseInt(year)) {
          historicalMonths.push(parseInt(batchMonth) - 1); // Return 0-indexed month
        }
      }
    }

    return {
      success: true,
      months: historicalMonths
    };

  } catch (error) {
    Logger.log('Error getting historical balance months: ' + error.toString());
    return {
      success: false,
      months: [],
      error: error.toString()
    };
  }
}

// Get months with overtime entries for an employee
function getOvertimeMonths_SERVER(employeeId, year) {
  try {
    const db = getFirestore();
    const allLogsQuery = db.getDocuments('overtimeLogs');

    const monthsWithEntries = new Set();

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.employeeId === employeeId && log.overtimeDate) {
        const logDate = new Date(log.overtimeDate);
        const logYear = logDate.getFullYear();
        const logMonth = logDate.getMonth(); // 0-indexed

        if (logYear === parseInt(year)) {
          monthsWithEntries.add(logMonth);
        }
      }
    }

    return {
      success: true,
      months: Array.from(monthsWithEntries)
    };

  } catch (error) {
    Logger.log('Error getting overtime months: ' + error.toString());
    return {
      success: false,
      months: [],
      error: error.toString()
    };
  }
}

// Log overtime batch
function logOvertimeBatch_SERVER(data) {
  try {
    const db = getFirestore();

    // Validate required data
    if (!data.employeeId || data.month === undefined || !data.year || !data.entries || data.entries.length === 0) {
      return {
        success: false,
        error: 'Missing required data'
      };
    }

    // Check monthly cap
    const existingLogs = getUncertifiedOvertimeForMonth_SERVER(data.employeeId, data.month, data.year);
    const existingMonthTotal = existingLogs.reduce((sum, log) => sum + Number(log.earnedHours || 0), 0);
    const newEntriesTotal = data.entries.reduce((sum, entry) => sum + entry.cocEarned, 0);
    const totalMonthly = existingMonthTotal + newEntriesTotal;

    if (totalMonthly > 40) {
      return {
        success: false,
        error: `Monthly accrual cap exceeded. Total would be ${totalMonthly.toFixed(1)} hours (cap: 40 hours)`
      };
    }

    // Check total balance cap
    const balanceData = getTotalBalance_SERVER(data.employeeId);
    const newTotalBalance = balanceData.total + newEntriesTotal;

    if (newTotalBalance > 120) {
      return {
        success: false,
        error: `Total balance cap exceeded. Total would be ${newTotalBalance.toFixed(1)} hours (cap: 120 hours)`
      };
    }

    // Check for duplicate dates within the submission
    const dateSet = new Set();
    for (const entry of data.entries) {
      if (dateSet.has(entry.date)) {
        return {
          success: false,
          error: `Duplicate date found: ${entry.date}`
        };
      }
      dateSet.add(entry.date);
    }

    // Get all existing uncertified logs for this employee + month + year
    const allLogsQuery = db.getDocuments('overtimeLogs');
    const existingLogsMap = {}; // Map by date ISO string
    const existingLogIds = new Set();

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log.employeeId === data.employeeId &&
          log.month === data.month &&
          log.year === data.year &&
          log.status === 'Uncertified') {
        existingLogsMap[log.overtimeDate] = log;
        existingLogIds.add(log.logId);
      }
    }

    // Process entries: UPDATE existing or CREATE new
    let createdCount = 0;
    let updatedCount = 0;
    let totalCocEarned = 0;
    const processedLogIds = new Set();

    for (const entry of data.entries) {
      const overtimeDate = new Date(entry.date);
      const overtimeDateISO = overtimeDate.toISOString();
      const existingLog = existingLogsMap[overtimeDateISO];

      if (existingLog) {
        // UPDATE existing log - merge new data with old metadata
        const updatedLogData = {
          logId: existingLog.logId,
          employeeId: data.employeeId,
          overtimeDate: overtimeDateISO,
          dayType: entry.dayType,
          isHoliday: entry.isHoliday || false,
          holidayName: entry.holidayName || '',
          amIn: entry.amIn || null,
          amOut: entry.amOut || null,
          pmIn: entry.pmIn || null,
          pmOut: entry.pmOut || null,
          hoursWorked: entry.hoursWorked,
          earnedHours: entry.cocEarned,
          status: 'Uncertified',
          month: data.month,
          year: data.year,
          // Keep original creation metadata
          createdAt: existingLog.createdAt,
          createdBy: existingLog.createdBy,
          // Add modification metadata
          lastModifiedAt: new Date().toISOString(),
          lastModifiedBy: Session.getActiveUser().getEmail()
        };

        db.updateDocument('overtimeLogs/' + existingLog.logId, updatedLogData);
        processedLogIds.add(existingLog.logId);
        updatedCount++;
        totalCocEarned += entry.cocEarned;

      } else {
        // CREATE new log
        const logId = 'LOG_' + Utilities.getUuid();
        const logData = {
          logId: logId,
          employeeId: data.employeeId,
          overtimeDate: overtimeDateISO,
          dayType: entry.dayType,
          isHoliday: entry.isHoliday || false,
          holidayName: entry.holidayName || '',
          amIn: entry.amIn || null,
          amOut: entry.amOut || null,
          pmIn: entry.pmIn || null,
          pmOut: entry.pmOut || null,
          hoursWorked: entry.hoursWorked,
          earnedHours: entry.cocEarned,
          status: 'Uncertified',
          month: data.month,
          year: data.year,
          createdAt: new Date().toISOString(),
          createdBy: Session.getActiveUser().getEmail()
        };

        db.createDocument('overtimeLogs/' + logId, logData);
        createdCount++;
        totalCocEarned += entry.cocEarned;
      }
    }

    // DELETE logs that were removed from the form
    let deletedCount = 0;
    for (const logId of existingLogIds) {
      if (!processedLogIds.has(logId)) {
        db.deleteDocument('overtimeLogs/' + logId);
        deletedCount++;
      }
    }

    Logger.log(`Overtime batch: Created ${createdCount}, Updated ${updatedCount}, Deleted ${deletedCount}`);

    return {
      success: true,
      created: createdCount,
      updated: updatedCount,
      deleted: deletedCount,
      totalCocEarned: totalCocEarned
    };

  } catch (error) {
    Logger.log('Error logging overtime batch: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function generateCertificate_SERVER(data) {
  try {
    const db = getFirestore();
    
    if (!data.selectedLogIds || data.selectedLogIds.length === 0) {
      return {
        success: false,
        error: 'No overtime logs selected'
      };
    }
    
    let totalEarnedHours = 0;
    const logs = [];
    
    data.selectedLogIds.forEach(logId => {
      const logDoc = db.getDocument('overtimeLogs/' + logId);
      if (logDoc && logDoc.obj.status === 'Uncertified' && logDoc.obj.employeeId === data.employeeId) {
        logs.push(logDoc.obj);
        totalEarnedHours += Number(logDoc.obj.earnedHours || 0);
      }
    });
    
    if (logs.length === 0) {
      return {
        success: false,
        error: 'No valid uncertified logs found'
      };
    }
    
    const certificateId = 'CERT_' + Utilities.getUuid();
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerId = 'LEDGER_' + Utilities.getUuid();
    
    const configDoc = db.getDocument('configuration/accrualRules');
    const expiryMonths = configDoc.obj.expiryMonths || 12;
    
    const issueDate = new Date();
    const expiryDate = new Date(issueDate);
    expiryDate.setMonth(expiryDate.getMonth() + expiryMonths);
    
    const certData = {
      certificateId: certificateId,
      employeeId: data.employeeId,
      totalEarnedHours: totalEarnedHours,
      issueDate: issueDate.toISOString(),
      logIds: data.selectedLogIds,
      createdAt: issueDate.toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('certificates/' + certificateId, certData);

    // Update all logs to Certified status (merge with existing data to preserve all fields)
    logs.forEach(log => {
      const updateData = Object.assign({}, log, {
        status: 'Certified',
        certificateId: certificateId,
        certifiedAt: issueDate.toISOString(),
        certifiedBy: Session.getActiveUser().getEmail()
      });
      db.updateDocument('overtimeLogs/' + log.logId, updateData);
    });
    
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: certificateId,
      earnedHours: totalEarnedHours,
      remainingHours: totalEarnedHours,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'Active',
      isHistorical: false,
      createdAt: issueDate.toISOString()
    };
    
    db.createDocument('creditBatches/' + batchId, batchData);
    
    const allBatchDocs = db.getDocuments('creditBatches');
    let balanceAfter = 0;

    for (let i = 0; i < allBatchDocs.length; i++) {
      const batch = allBatchDocs[i].obj;
      if (batch && batch.employeeId === data.employeeId && batch.status === 'Active') {
        balanceAfter += Number(batch.remainingHours || 0);
      }
    }
    
    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: issueDate.toISOString(),
      transactionType: 'Earned',
      referenceId: certificateId,
      hoursChange: totalEarnedHours,
      balanceAfter: balanceAfter,
      remarks: `Certificate ${certificateId} issued`,
      createdAt: issueDate.toISOString()
    };
    
    db.createDocument('ledger/' + ledgerId, ledgerData);
    
    return {
      success: true,
      certificateId: certificateId,
      totalEarnedHours: totalEarnedHours
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

// ========== GENERATE CERTIFICATE FEATURE SERVER FUNCTIONS ==========

// Get uncertified overtime logs grouped by month/year for an employee
function getUncertifiedMonthsByEmployee_SERVER(employeeId) {
  try {
    const db = getFirestore();
    const allLogsQuery = db.getDocuments('overtimeLogs');

    // Group by month/year
    const monthsMap = {};

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.employeeId === employeeId && log.status === 'Uncertified') {
        const key = `${log.month}-${log.year}`;
        if (!monthsMap[key]) {
          monthsMap[key] = {
            month: log.month,
            year: log.year,
            entries: [],
            totalHours: 0
          };
        }
        monthsMap[key].entries.push(log);
        monthsMap[key].totalHours += Number(log.earnedHours || 0);
      }
    }

    // Convert to array and sort by year/month descending
    const months = Object.values(monthsMap).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    return {
      success: true,
      months: months
    };

  } catch (error) {
    Logger.log('Error getting uncertified months: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      months: []
    };
  }
}

// Get all employees with uncertified logs for a specific month/year
function getEmployeesByMonthWithUncertified_SERVER(month, year) {
  try {
    const db = getFirestore();
    const allLogsQuery = db.getDocuments('overtimeLogs');
    const employeesQuery = db.getDocuments('employees');

    // Build employee map
    const employeeMap = {};
    for (let i = 0; i < employeesQuery.length; i++) {
      const emp = employeesQuery[i].obj;
      if (emp) {
        employeeMap[emp.employeeId] = emp;
      }
    }

    // Group uncertified logs by employee for this month/year
    const employeeLogsMap = {};

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.status === 'Uncertified' && log.month === month && log.year === year) {
        if (!employeeLogsMap[log.employeeId]) {
          employeeLogsMap[log.employeeId] = {
            employeeId: log.employeeId,
            entries: [],
            totalHours: 0
          };
        }
        employeeLogsMap[log.employeeId].entries.push(log);
        employeeLogsMap[log.employeeId].totalHours += Number(log.earnedHours || 0);
      }
    }

    // Convert to array with employee details
    const employees = [];
    for (const empId in employeeLogsMap) {
      const employee = employeeMap[empId];
      if (employee) {
        let fullName = `${employee.firstName} ${employee.lastName}`;
        if (employee.suffix) {
          const needsComma = employee.suffix.toLowerCase().includes('jr') || employee.suffix.toLowerCase().includes('sr');
          fullName += needsComma ? `, ${employee.suffix}` : ` ${employee.suffix}`;
        }
        employees.push({
          employeeId: empId,
          fullName: fullName,
          office: employee.office || 'N/A',
          totalHours: employeeLogsMap[empId].totalHours,
          entriesCount: employeeLogsMap[empId].entries.length
        });
      }
    }

    // Sort by name
    employees.sort((a, b) => a.fullName.localeCompare(b.fullName));

    return {
      success: true,
      employees: employees
    };

  } catch (error) {
    Logger.log('Error getting employees by month: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      employees: []
    };
  }
}

// Generate COC Certificate with PDF for a specific month/year
function generateCOCCertificate_SERVER(data) {
  try {
    const db = getFirestore();

    // Validate required data
    if (!data.employeeId || data.month === undefined || !data.year || !data.dateOfIssuance) {
      return {
        success: false,
        error: 'Missing required data'
      };
    }

    // Get employee data
    const employeeDoc = db.getDocument('employees/' + data.employeeId);
    if (!employeeDoc || !employeeDoc.obj) {
      return {
        success: false,
        error: 'Employee not found'
      };
    }
    const employee = employeeDoc.obj;

    // Get all uncertified logs for this employee/month/year
    const allLogsQuery = db.getDocuments('overtimeLogs');
    const logs = [];
    let totalEarnedHours = 0;

    for (let i = 0; i < allLogsQuery.length; i++) {
      const log = allLogsQuery[i].obj;
      if (log && log.employeeId === data.employeeId &&
          log.month === data.month && log.year === data.year &&
          log.status === 'Uncertified') {
        logs.push(log);
        totalEarnedHours += Number(log.earnedHours || 0);
      }
    }

    if (logs.length === 0) {
      return {
        success: false,
        error: 'No uncertified logs found for this month/year'
      };
    }

    // Validate Date of Issuance
    const dateOfIssuance = new Date(data.dateOfIssuance);

    // Calculate valid date range: last day of earned month to last day of following month
    // Note: data.month is 0-based (0=Jan, 1=Feb, ..., 11=Dec)
    const lastDayOfMonth = new Date(data.year, data.month + 1, 0); // Get last day of the earned month
    const followingMonth = data.month === 11 ? 0 : data.month + 1; // 11=December -> 0=January
    const followingYear = data.month === 11 ? data.year + 1 : data.year;
    const lastDayOfFollowingMonth = new Date(followingYear, followingMonth + 1, 0);

    // Normalize dates to midnight for comparison (ignore time portion)
    const issuanceDate = new Date(dateOfIssuance.getFullYear(), dateOfIssuance.getMonth(), dateOfIssuance.getDate());
    const minDate = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate());
    const maxDate = new Date(lastDayOfFollowingMonth.getFullYear(), lastDayOfFollowingMonth.getMonth(), lastDayOfFollowingMonth.getDate());

    // Validate date is within range
    if (issuanceDate < minDate || issuanceDate > maxDate) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'];
      return {
        success: false,
        error: `Date of Issuance must be between ${monthNames[lastDayOfMonth.getMonth()]} ${lastDayOfMonth.getDate()}, ${lastDayOfMonth.getFullYear()} and ${monthNames[lastDayOfFollowingMonth.getMonth()]} ${lastDayOfFollowingMonth.getDate()}, ${lastDayOfFollowingMonth.getFullYear()}`
      };
    }

    // Calculate Valid Until (1 year minus 1 day from date of issuance)
    const validUntil = new Date(dateOfIssuance);
    validUntil.setFullYear(validUntil.getFullYear() + 1);
    validUntil.setDate(validUntil.getDate() - 1);

    // Check for existing certificate for this month/year
    const allCertsQuery = db.getDocuments('certificates');
    for (let i = 0; i < allCertsQuery.length; i++) {
      const cert = allCertsQuery[i].obj;
      if (cert && cert.employeeId === data.employeeId &&
          cert.month === data.month && cert.year === data.year) {
        return {
          success: false,
          error: 'Certificate already exists for this month/year'
        };
      }
    }

    // IMPORTANT: Generate PDFs FIRST before creating any database records
    // If PDF generation fails, entire certificate generation should fail

    // Generate Certificate PDF
    let pdfUrl = null;
    let pdfId = null;
    const pdfResult = generateCertificatePDF({
      employee: employee,
      totalHours: totalEarnedHours,
      dateOfIssuance: dateOfIssuance,
      validUntil: validUntil
    });
    pdfUrl = pdfResult.url;
    pdfId = pdfResult.id;

    // Generate Overtime Summary PDF
    let summaryPdfUrl = null;
    let summaryPdfId = null;
    const summaryResult = generateOvertimeSummaryPDF({
      employee: employee,
      logs: logs,
      month: data.month,
      year: data.year
    });
    summaryPdfUrl = summaryResult.url;
    summaryPdfId = summaryResult.id;

    // Only proceed with database writes if both PDFs generated successfully
    // Generate IDs
    const certificateId = 'CERT_' + Utilities.getUuid();
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerId = 'LEDGER_' + Utilities.getUuid();

    // Create certificate document with both PDFs info
    const certData = {
      certificateId: certificateId,
      employeeId: data.employeeId,
      month: data.month,
      year: data.year,
      totalEarnedHours: totalEarnedHours,
      dateOfIssuance: dateOfIssuance.toISOString(),
      validUntil: validUntil.toISOString(),
      logIds: logs.map(log => log.logId),
      pdfUrl: pdfUrl,
      pdfId: pdfId,
      summaryPdfUrl: summaryPdfUrl,
      summaryPdfId: summaryPdfId,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };

    db.createDocument('certificates/' + certificateId, certData);

    // Update all logs to Active status (merge with existing data to preserve all fields)
    logs.forEach(log => {
      const updateData = Object.assign({}, log, {
        status: 'Active',
        certificateId: certificateId,
        validUntil: validUntil.toISOString(),
        certifiedAt: new Date().toISOString(),
        certifiedBy: Session.getActiveUser().getEmail()
      });
      db.updateDocument('overtimeLogs/' + log.logId, updateData);
    });

    // Create credit batch with standardized fields
    const monthYearStr = `${data.year}-${String(data.month + 1).padStart(2, '0')}`;
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: certificateId,
      source: 'Certificate',
      initialHours: totalEarnedHours,
      earnedHours: totalEarnedHours,
      usedHours: 0,
      remainingHours: totalEarnedHours,
      earnedMonth: data.month + 1,
      earnedYear: data.year,
      monthYear: monthYearStr,
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: validUntil.toISOString(),
      status: 'Active',
      isHistorical: false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };

    db.createDocument('creditBatches/' + batchId, batchData);

    // Create ledger entry
    const allBatchDocs = db.getDocuments('creditBatches');
    let balanceAfter = 0;
    for (let i = 0; i < allBatchDocs.length; i++) {
      const batch = allBatchDocs[i].obj;
      if (batch && batch.employeeId === data.employeeId && batch.status === 'Active') {
        balanceAfter += Number(batch.remainingHours || 0);
      }
    }

    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: dateOfIssuance.toISOString(),
      transactionType: 'Earned',
      referenceId: certificateId,
      hoursChange: totalEarnedHours,
      balanceAfter: balanceAfter,
      remarks: `Certificate ${certificateId} issued`,
      createdAt: new Date().toISOString()
    };

    db.createDocument('ledger/' + ledgerId, ledgerData);

    // Get employee full name for response
    let employeeFullName = `${employee.firstName} ${employee.lastName}`;
    if (employee.suffix) {
      // Add comma for Jr., Sr., etc.
      const needsComma = employee.suffix.toLowerCase().includes('jr') || employee.suffix.toLowerCase().includes('sr');
      employeeFullName += needsComma ? `, ${employee.suffix}` : ` ${employee.suffix}`;
    }

    return {
      success: true,
      certificateId: certificateId,
      totalEarnedHours: totalEarnedHours,
      pdfUrl: pdfUrl,
      summaryPdfUrl: summaryPdfUrl,
      employeeName: employeeFullName,
      monthYear: `${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][data.month]} ${data.year}`,
      // Date format: MM/dd/yyyy - produces "09/01/2025"
      dateOfIssuance: Utilities.formatDate(dateOfIssuance, Session.getScriptTimeZone(), 'MM/dd/yyyy'),
      validUntil: Utilities.formatDate(validUntil, Session.getScriptTimeZone(), 'MM/dd/yyyy')
    };

  } catch (error) {
    Logger.log('Error generating certificate: ' + error.toString());
    return {
      success: false,
      error: 'Certificate generation failed: ' + error.toString()
    };
  }
}

// Generate certificates for multiple employees (batch mode)
function generateBatchCertificates_SERVER(data) {
  try {
    if (!data.employeeIds || data.employeeIds.length === 0 ||
        data.month === undefined || !data.year || !data.dateOfIssuance) {
      return {
        success: false,
        error: 'Missing required data'
      };
    }

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (const employeeId of data.employeeIds) {
      const result = generateCOCCertificate_SERVER({
        employeeId: employeeId,
        month: data.month,
        year: data.year,
        dateOfIssuance: data.dateOfIssuance
      });

      results.push({
        employeeId: employeeId,
        success: result.success,
        error: result.error || null,
        certificateId: result.certificateId || null,
        employeeName: result.employeeName || null,
        pdfUrl: result.pdfUrl || null,
        summaryPdfUrl: result.summaryPdfUrl || null
      });

      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    return {
      success: true,
      successCount: successCount,
      failCount: failCount,
      results: results
    };

  } catch (error) {
    Logger.log('Error in batch generation: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get all certificates with filters
function getCertificates_SERVER(filters) {
  try {
    const db = getFirestore();
    const allCerts = db.getDocuments('certificates');
    const allEmployees = db.getDocuments('employees');

    // Build employee map
    const employeeMap = {};
    for (let i = 0; i < allEmployees.length; i++) {
      const emp = allEmployees[i].obj;
      if (emp) {
        employeeMap[emp.employeeId] = emp;
      }
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    let certificates = [];
    for (let i = 0; i < allCerts.length; i++) {
      const cert = allCerts[i].obj;
      if (!cert) continue;

      const employee = employeeMap[cert.employeeId];
      if (!employee) continue;

      // Apply filters
      if (filters.year && cert.year !== parseInt(filters.year)) continue;
      if (filters.month !== undefined && filters.month !== '' && cert.month !== parseInt(filters.month)) continue;

      const employeeName = `${employee.lastName}, ${employee.firstName}`;
      if (filters.search && filters.search.trim() !== '') {
        const searchLower = filters.search.toLowerCase();
        if (!employeeName.toLowerCase().includes(searchLower) &&
            !cert.certificateId.toLowerCase().includes(searchLower)) {
          continue;
        }
      }

      // Determine status
      const now = new Date();
      const validUntil = new Date(cert.validUntil);
      let status = 'Active';
      if (validUntil < now) {
        status = 'Expired';
      }

      certificates.push({
        certificateId: cert.certificateId,
        employeeId: cert.employeeId,
        employeeName: employeeName,
        month: cert.month,
        year: cert.year,
        period: `${monthNames[cert.month]} ${cert.year}`,
        totalHours: cert.totalEarnedHours,
        dateOfIssuance: cert.dateOfIssuance,
        validUntil: cert.validUntil,
        pdfUrl: cert.pdfUrl || null,
        pdfId: cert.pdfId || null,
        summaryPdfUrl: cert.summaryPdfUrl || null,
        summaryPdfId: cert.summaryPdfId || null,
        status: status,
        createdAt: cert.createdAt,
        createdBy: cert.createdBy
      });
    }

    // Sort by creation date (newest first)
    certificates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      success: true,
      certificates: certificates
    };

  } catch (error) {
    Logger.log('Error getting certificates: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      certificates: []
    };
  }
}

// Helper function to get signatory configuration
function getSignatoryConfig() {
  try {
    const db = getFirestore();
    const signatoryDoc = db.getDocument('libraries/signatory');

    if (signatoryDoc && signatoryDoc.obj) {
      return {
        name: signatoryDoc.obj.name || '',
        position: signatoryDoc.obj.position || ''
      };
    }

    // Return empty if not configured
    return {
      name: '',
      position: ''
    };
  } catch (error) {
    Logger.log('Error getting signatory config: ' + error.toString());
    return {
      name: '',
      position: ''
    };
  }
}

// Helper function to convert sheet to PDF with proper settings

// ============================
// PDF CONVERSION FUNCTION (FIXED)
// ============================

/**
 * Convert a specific sheet to PDF
 * @param {Spreadsheet} spreadsheet - The spreadsheet object
 * @param {Sheet} sheet - The sheet to convert
 * @returns {Blob} PDF blob
 */
function convertSheetToPDF(spreadsheet, sheet) {
  const sheetId = sheet.getSheetId();
  const spreadsheetId = spreadsheet.getId();

  // Build export URL
  const url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export' +
    '?format=pdf' +
    '&gid=' + sheetId +
    '&size=A4' +
    '&portrait=true' +
    '&scale=4' +  // Scale to fit (1=normal, 2=fit to width, 3=fit to height, 4=fit to page)
    '&top_margin=0.3' +
    '&bottom_margin=0.3' +
    '&left_margin=0.3' +
    '&right_margin=0.3' +
    '&gridlines=false' +
    '&printtitle=false' +
    '&sheetnames=false' +
    '&pagenum=false' +
    '&horizontal_alignment=CENTER' +
    '&vertical_alignment=TOP';

  // Fetch PDF
  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  return response.getBlob();
}

// ============================
// CERTIFICATE PDF GENERATION (FIXED)
// ============================

/**
 * Generate PDF certificate from template
 * @param {Object} data - Certificate data
 * @returns {Object} PDF URL and ID
 */
function generateCertificatePDF(data) {
  try {
    // Validate CERTIFICATE_TEMPLATE_ID is set
    if (!CERTIFICATE_TEMPLATE_ID) {
      throw new Error('CERTIFICATE_TEMPLATE_ID constant is not defined');
    }

    // Try to open the template spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(CERTIFICATE_TEMPLATE_ID);
    } catch (e) {
      throw new Error('Cannot access certificate template spreadsheet. Please check CERTIFICATE_TEMPLATE_ID and permissions: ' + e.toString());
    }

    const templateSheet = ss.getSheetByName('CERTIFICATE');
    if (!templateSheet) {
      throw new Error('CERTIFICATE template sheet not found in spreadsheet. Available sheets: ' + ss.getSheets().map(s => s.getName()).join(', '));
    }

    // Create temporary copy
    const tempSheetName = 'TEMP_CERT_' + data.employee.employeeId + '_' + Date.now();
    const tempSheet = templateSheet.copyTo(ss);
    tempSheet.setName(tempSheetName);

    // CRITICAL: Ensure temp sheet is visible (not hidden)
    // Hidden sheets cannot be exported as PDF
    if (tempSheet.isSheetHidden()) {
      tempSheet.showSheet();
    }

    // Get signatory configuration
    const signatory = getSignatoryConfig();

    // Prepare employee data
    let employeeName = `${data.employee.firstName} ${data.employee.lastName}`;
    if (data.employee.suffix) {
      const needsComma = data.employee.suffix.toLowerCase().includes('jr') || data.employee.suffix.toLowerCase().includes('sr');
      employeeName += needsComma ? `, ${data.employee.suffix}` : ` ${data.employee.suffix}`;
    }
    employeeName = employeeName.toUpperCase().trim();
    const position = (data.employee.position || '').toUpperCase();
    const office = (data.employee.office || '').toUpperCase();
    const totalHours = data.totalHours.toFixed(1);
    
    // Format dates using Asia/Manila timezone with MM/dd/yyyy format
    const dateIssued = Utilities.formatDate(data.dateOfIssuance, 'Asia/Manila', 'MM/dd/yyyy');
    const validUntil = Utilities.formatDate(data.validUntil, 'Asia/Manila', 'MM/dd/yyyy');

    // Ensure the sheet has enough columns (at least 6 columns = F)
    const maxColumns = tempSheet.getMaxColumns();
    if (maxColumns < 6) {
      tempSheet.insertColumnsAfter(maxColumns, 6 - maxColumns);
    }

    // Ensure the sheet has enough rows (at least 44 rows)
    const maxRows = tempSheet.getMaxRows();
    if (maxRows < 44) {
      tempSheet.insertRowsAfter(maxRows, 44 - maxRows);
    }

    // Calculate font size for position based on text length (auto-shrink for long positions)
    let positionFontSize = 11; // Default font size
    if (position.length > 35) {
      positionFontSize = 8;
    } else if (position.length > 30) {
      positionFontSize = 9;
    } else if (position.length > 25) {
      positionFontSize = 10;
    }

    // Fill in TOP certificate (rows 1-23)
    tempSheet.getRange(4, 5).setValue(employeeName);      // E4: Employee Name
    tempSheet.getRange(6, 2).setValue(position).setFontSize(positionFontSize).setWrap(true);  // B6: Position with auto-size
    tempSheet.getRange(6, 6).setValue(office);            // F6: Office
    tempSheet.getRange(9, 2).setValue(totalHours);        // B9: Total Hours
    tempSheet.getRange(15, 6).setValue(signatory.name);   // F15: Signatory Name
    tempSheet.getRange(16, 6).setValue(signatory.position); // F16: Signatory Position
    tempSheet.getRange(19, 4).setValue(dateIssued);       // D19: Date Issued
    tempSheet.getRange(20, 4).setValue(validUntil);       // D20: Valid Until

    // Fill in BOTTOM certificate (rows 24-44, offset by 24 rows)
    tempSheet.getRange(28, 5).setValue(employeeName);     // E28: Employee Name
    tempSheet.getRange(30, 2).setValue(position).setFontSize(positionFontSize).setWrap(true);  // B30: Position with auto-size
    tempSheet.getRange(30, 6).setValue(office);           // F30: Office
    tempSheet.getRange(33, 2).setValue(totalHours);       // B33: Total Hours
    tempSheet.getRange(39, 6).setValue(signatory.name);   // F39: Signatory Name
    tempSheet.getRange(40, 6).setValue(signatory.position); // F40: Signatory Position
    tempSheet.getRange(43, 4).setValue(dateIssued);       // D43: Date Issued
    tempSheet.getRange(44, 4).setValue(validUntil);       // D44: Valid Until

    // Hide gridlines for cleaner PDF
    tempSheet.setHiddenGridlines(true);

    // CRITICAL: Flush all pending changes to the spreadsheet before converting to PDF
    SpreadsheetApp.flush();

    // Convert to PDF
    let pdfBlob;
    try {
      pdfBlob = convertSheetToPDF(ss, tempSheet);
    } catch (e) {
      // Clean up temp sheet before throwing error
      try {
        ss.deleteSheet(tempSheet);
      } catch (cleanupError) {
        Logger.log('Error cleaning up temp sheet: ' + cleanupError.toString());
      }
      throw new Error('Failed to convert sheet to PDF: ' + e.toString());
    }

    // Use employee name in format: "LastName, FirstName"
    const pdfFileName = `COC_Certificate_${data.employee.lastName}, ${data.employee.firstName}.pdf`;
    pdfBlob.setName(pdfFileName);

    // Save to Drive with year/month organization
    const CERTIFICATES_FOLDER_ID = '1QltJeBLauIIjITAE8UUTNKwWb3u4r4Nr';

    // Validate folder access
    let mainFolder;
    try {
      mainFolder = DriveApp.getFolderById(CERTIFICATES_FOLDER_ID);
    } catch (e) {
      throw new Error('Cannot access certificates folder. Please check folder ID and permissions: ' + e.toString());
    }

    // Get year and month from date of issuance
    const year = data.dateOfIssuance.getFullYear();
    const monthNames = ['01-January', '02-February', '03-March', '04-April', '05-May', '06-June',
                       '07-July', '08-August', '09-September', '10-October', '11-November', '12-December'];
    const monthFolderName = monthNames[data.dateOfIssuance.getMonth()];

    // Create or get year folder
    let yearFolder;
    const yearFolders = mainFolder.getFoldersByName(year.toString());
    if (yearFolders.hasNext()) {
      yearFolder = yearFolders.next();
    } else {
      yearFolder = mainFolder.createFolder(year.toString());
    }

    // Create or get month folder
    let monthFolder;
    const monthFolders = yearFolder.getFoldersByName(monthFolderName);
    if (monthFolders.hasNext()) {
      monthFolder = monthFolders.next();
    } else {
      monthFolder = yearFolder.createFolder(monthFolderName);
    }

    // Save PDF to month folder
    let pdfFile;
    try {
      pdfFile = monthFolder.createFile(pdfBlob);
    } catch (e) {
      // Clean up temp sheet before throwing error
      try {
        ss.deleteSheet(tempSheet);
      } catch (cleanupError) {
        Logger.log('Error cleaning up temp sheet: ' + cleanupError.toString());
      }
      throw new Error('Failed to save PDF to Drive folder: ' + e.toString());
    }

    const pdfUrl = pdfFile.getUrl();
    const pdfId = pdfFile.getId();

    // Delete temporary sheet
    ss.deleteSheet(tempSheet);

    return {
      url: pdfUrl,
      id: pdfId
    };

  } catch (error) {
    Logger.log('PDF generation error: ' + error.toString());
    throw error;
  }
}

/**
 * Generate Overtime Summary PDF
 * @param {Object} data - Summary data
 * @returns {Object} {url, id} of the generated PDF
 */
function generateOvertimeSummaryPDF(data) {
  try {
    // Validate CERTIFICATE_TEMPLATE_ID is set (we'll use same spreadsheet)
    if (!CERTIFICATE_TEMPLATE_ID) {
      throw new Error('CERTIFICATE_TEMPLATE_ID constant is not defined');
    }

    // Open the template spreadsheet
    let ss;
    try {
      ss = SpreadsheetApp.openById(CERTIFICATE_TEMPLATE_ID);
    } catch (e) {
      throw new Error('Cannot access certificate template spreadsheet: ' + e.toString());
    }

    // Create temporary sheet for summary
    const tempSheetName = 'TEMP_SUMMARY_' + data.employee.employeeId + '_' + Date.now();
    const tempSheet = ss.insertSheet(tempSheetName);

    // Format employee name
    let employeeName = `${data.employee.firstName} ${data.employee.lastName}`;
    if (data.employee.suffix) {
      const needsComma = data.employee.suffix.toLowerCase().includes('jr') || data.employee.suffix.toLowerCase().includes('sr');
      employeeName += needsComma ? `, ${data.employee.suffix}` : ` ${data.employee.suffix}`;
    }
    employeeName = employeeName.trim();
    const position = data.employee.position || '';
    const office = data.employee.office || '';

    // Format month/year
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthYear = `${monthNames[data.month]} ${data.year}`;

    // Set column widths
    tempSheet.setColumnWidth(1, 100);  // A: Date
    tempSheet.setColumnWidth(2, 130);  // B: Day Type
    tempSheet.setColumnWidth(3, 80);   // C: AM In
    tempSheet.setColumnWidth(4, 80);   // D: AM Out
    tempSheet.setColumnWidth(5, 80);   // E: PM In
    tempSheet.setColumnWidth(6, 80);   // F: PM Out
    tempSheet.setColumnWidth(7, 90);   // G: Hours Worked
    tempSheet.setColumnWidth(8, 90);   // H: COC Earned

    let currentRow = 1;

    // Title
    tempSheet.getRange(currentRow, 1, 1, 8).merge()
      .setValue('OVERTIME SUMMARY REPORT')
      .setFontSize(16)
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setBackground('#1a73e8')
      .setFontColor('#ffffff');
    currentRow += 2;

    // Employee Information Section
    tempSheet.getRange(currentRow, 1).setValue('Employee:').setFontWeight('bold');
    tempSheet.getRange(currentRow, 2, 1, 7).merge().setValue(employeeName);
    currentRow++;

    tempSheet.getRange(currentRow, 1).setValue('Position:').setFontWeight('bold');
    tempSheet.getRange(currentRow, 2, 1, 7).merge().setValue(position);
    currentRow++;

    tempSheet.getRange(currentRow, 1).setValue('Office:').setFontWeight('bold');
    tempSheet.getRange(currentRow, 2, 1, 7).merge().setValue(office);
    currentRow++;

    tempSheet.getRange(currentRow, 1).setValue('Period:').setFontWeight('bold');
    tempSheet.getRange(currentRow, 2, 1, 7).merge().setValue(monthYear);
    currentRow += 2;

    // Table Headers
    const headers = ['Date', 'Day Type', 'AM In', 'AM Out', 'PM In', 'PM Out', 'Hours Worked', 'COC Earned'];
    const headerRange = tempSheet.getRange(currentRow, 1, 1, 8);
    headerRange.setValues([headers])
      .setFontWeight('bold')
      .setBackground('#f0f0f0')
      .setHorizontalAlignment('center')
      .setBorder(true, true, true, true, true, true);
    currentRow++;

    // Sort logs by date
    const sortedLogs = data.logs.slice().sort((a, b) => {
      return new Date(a.overtimeDate) - new Date(b.overtimeDate);
    });

    // Data Rows
    sortedLogs.forEach(log => {
      const overtimeDate = new Date(log.overtimeDate);
      const formattedDate = Utilities.formatDate(overtimeDate, 'Asia/Manila', 'MM/dd/yyyy');

      // Determine day type display
      let dayTypeDisplay = '';
      if (log.isHoliday) {
        dayTypeDisplay = log.holidayName || 'Holiday';
      } else if (log.dayType === 'weekend') {
        dayTypeDisplay = 'Weekend';
      } else {
        dayTypeDisplay = 'Weekday';
      }

      const rowData = [
        formattedDate,
        dayTypeDisplay,
        log.amIn || '-',
        log.amOut || '-',
        log.pmIn || '-',
        log.pmOut || '-',
        log.hoursWorked ? log.hoursWorked.toFixed(1) : '0.0',
        log.earnedHours ? log.earnedHours.toFixed(1) : '0.0'
      ];

      tempSheet.getRange(currentRow, 1, 1, 8)
        .setValues([rowData])
        .setHorizontalAlignment('center')
        .setBorder(true, true, true, true, false, false);

      // Color code day type
      if (log.isHoliday) {
        tempSheet.getRange(currentRow, 2).setBackground('#fce4ec'); // Light red for holidays
      } else if (log.dayType === 'weekend') {
        tempSheet.getRange(currentRow, 2).setBackground('#fff9c4'); // Light yellow for weekends
      }

      currentRow++;
    });

    // Total Row
    tempSheet.getRange(currentRow, 1, 1, 6).merge()
      .setValue('TOTAL:')
      .setFontWeight('bold')
      .setHorizontalAlignment('right')
      .setBackground('#e3f2fd')
      .setBorder(true, true, true, true, false, false);

    const totalHoursWorked = sortedLogs.reduce((sum, log) => sum + (log.hoursWorked || 0), 0);
    const totalEarned = sortedLogs.reduce((sum, log) => sum + (log.earnedHours || 0), 0);

    tempSheet.getRange(currentRow, 7)
      .setValue(totalHoursWorked.toFixed(1))
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setBackground('#e3f2fd')
      .setBorder(true, true, true, true, false, false);

    tempSheet.getRange(currentRow, 8)
      .setValue(totalEarned.toFixed(1))
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setBackground('#e3f2fd')
      .setBorder(true, true, true, true, false, false);

    currentRow += 2;

    // Footer note
    tempSheet.getRange(currentRow, 1, 1, 8).merge()
      .setValue('This summary is automatically generated with the\nCompensatory Overtime Credit (COC) and Compensatory Time-Off (CTO) Management System.')
      .setFontSize(9)
      .setFontStyle('italic')
      .setHorizontalAlignment('center')
      .setWrap(true);

    // Hide gridlines
    tempSheet.setHiddenGridlines(true);

    // Flush changes
    SpreadsheetApp.flush();

    // Convert to PDF
    let pdfBlob;
    try {
      pdfBlob = convertSheetToPDF(ss, tempSheet);
    } catch (e) {
      ss.deleteSheet(tempSheet);
      throw new Error('Failed to convert summary sheet to PDF: ' + e.toString());
    }

    // Set PDF filename
    const pdfFileName = `Overtime_Summary_${data.employee.lastName}, ${data.employee.firstName}_${monthYear}.pdf`;
    pdfBlob.setName(pdfFileName);

    // Save to Drive (same location as certificate)
    const CERTIFICATES_FOLDER_ID = '1QltJeBLauIIjITAE8UUTNKwWb3u4r4Nr';

    let mainFolder;
    try {
      mainFolder = DriveApp.getFolderById(CERTIFICATES_FOLDER_ID);
    } catch (e) {
      throw new Error('Cannot access certificates folder: ' + e.toString());
    }

    // Get year and month folders
    const year = data.year;
    const monthFolderNames = ['01-January', '02-February', '03-March', '04-April', '05-May', '06-June',
                              '07-July', '08-August', '09-September', '10-October', '11-November', '12-December'];
    const monthFolderName = monthFolderNames[data.month];

    // Create or get year folder
    let yearFolder;
    const yearFolders = mainFolder.getFoldersByName(year.toString());
    if (yearFolders.hasNext()) {
      yearFolder = yearFolders.next();
    } else {
      yearFolder = mainFolder.createFolder(year.toString());
    }

    // Create or get month folder
    let monthFolder;
    const monthFolders = yearFolder.getFoldersByName(monthFolderName);
    if (monthFolders.hasNext()) {
      monthFolder = monthFolders.next();
    } else {
      monthFolder = yearFolder.createFolder(monthFolderName);
    }

    // Save PDF
    let pdfFile;
    try {
      pdfFile = monthFolder.createFile(pdfBlob);
    } catch (e) {
      ss.deleteSheet(tempSheet);
      throw new Error('Failed to save summary PDF to Drive: ' + e.toString());
    }

    const pdfUrl = pdfFile.getUrl();
    const pdfId = pdfFile.getId();

    // Delete temporary sheet
    ss.deleteSheet(tempSheet);

    return {
      url: pdfUrl,
      id: pdfId
    };

  } catch (error) {
    Logger.log('Summary PDF generation error: ' + error.toString());
    throw error;
  }
}


function logCto_SERVER(data) {
  try {
    const db = getFirestore();

    const hoursUsed = parseFloat(data.hoursUsed);
    const dateFrom = new Date(data.dateFrom);
    const dateTo = new Date(data.dateTo);

    // Check for overlapping CTO dates
    const ledgerDocs = db.getDocuments('ledger');
    for (let i = 0; i < ledgerDocs.length; i++) {
      const ledgerDoc = ledgerDocs[i].obj;
      if (!ledgerDoc ||
          ledgerDoc.employeeId !== data.employeeId ||
          ledgerDoc.transactionType !== 'Used' ||
          ledgerDoc.status === 'Cancelled') {
        continue;
      }

      if (ledgerDoc.inclusiveDateFrom && ledgerDoc.inclusiveDateTo) {
        const existingFrom = new Date(ledgerDoc.inclusiveDateFrom);
        const existingTo = new Date(ledgerDoc.inclusiveDateTo);

        // Check if dates overlap
        if ((dateFrom <= existingTo && dateTo >= existingFrom)) {
          return {
            success: false,
            error: `Date overlap detected! You already have a CTO application from ${existingFrom.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})} to ${existingTo.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})}.`
          };
        }
      }
    }

    const batchDocs = db.getDocuments('creditBatches');
    let availableBalance = 0;
    const batches = [];

    for (let i = 0; i < batchDocs.length; i++) {
      const doc = batchDocs[i];
      const batch = doc.obj;
      if (!batch || batch.employeeId !== data.employeeId || batch.status !== 'Active') {
        continue;
      }

      const batchId = doc.name.split('/').pop();
      batches.push({ id: batchId, data: batch });
      availableBalance += Number(batch.remainingHours || 0);
    }

    // Sort batches by earned month/year (TRUE FIFO - oldest earned first)
    batches.sort((a, b) => {
      // Get year and month for batch A
      let yearA = a.data.earnedYear;
      let monthA = a.data.earnedMonth;

      // If not present, try parsing from monthYear field
      if (!yearA && a.data.monthYear) {
        const parts = a.data.monthYear.split('-');
        if (parts.length === 2) {
          yearA = parseInt(parts[0]);
          monthA = parseInt(parts[1]);
        }
      }

      // If still not available, try parsing from issueDate or createdAt
      if (!yearA) {
        const dateStr = a.data.issueDate || a.data.dateOfIssuance || a.data.createdAt;
        if (dateStr) {
          const date = new Date(dateStr);
          yearA = date.getFullYear();
          monthA = date.getMonth() + 1;
        } else {
          yearA = 9999;
          monthA = 12;
        }
      }

      // Get year and month for batch B
      let yearB = b.data.earnedYear;
      let monthB = b.data.earnedMonth;

      // If not present, try parsing from monthYear field
      if (!yearB && b.data.monthYear) {
        const parts = b.data.monthYear.split('-');
        if (parts.length === 2) {
          yearB = parseInt(parts[0]);
          monthB = parseInt(parts[1]);
        }
      }

      // If still not available, try parsing from issueDate or createdAt
      if (!yearB) {
        const dateStr = b.data.issueDate || b.data.dateOfIssuance || b.data.createdAt;
        if (dateStr) {
          const date = new Date(dateStr);
          yearB = date.getFullYear();
          monthB = date.getMonth() + 1;
        } else {
          yearB = 9999;
          monthB = 12;
        }
      }

      // Sort by year first, then by month
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });

    if (hoursUsed > availableBalance) {
      return {
        success: false,
        error: `Insufficient balance. Available: ${availableBalance.toFixed(2)} hours, Requested: ${hoursUsed.toFixed(2)} hours`
      };
    }
    
    let remainingToUse = hoursUsed;
    const usedBatches = [];
    
    for (let i = 0; i < batches.length && remainingToUse > 0; i++) {
      const batch = batches[i];
      const available = batch.data.remainingHours;
      const toUse = Math.min(available, remainingToUse);
      
      usedBatches.push({
        batchId: batch.id,
        hoursUsed: toUse,
        newRemaining: available - toUse
      });
      
      remainingToUse -= toUse;
    }
    
    const ctoId = 'CTO_' + Utilities.getUuid();
    const filingDate = new Date(data.filingDate);

    // Collect batch information for display
    const batchInfo = [];
    usedBatches.forEach(usage => {
      const newStatus = usage.newRemaining === 0 ? 'Depleted' : 'Active';

      // Get batch details
      const batchDoc = db.getDocument('creditBatches/' + usage.batchId);
      if (batchDoc && batchDoc.obj) {
        const batchData = batchDoc.obj;

        // Get month and year from batch data
        let month = 'Unknown';
        let year = 'Unknown';

        if (batchData.earnedMonth && batchData.earnedYear) {
          // Use earnedMonth and earnedYear fields
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                             'July', 'August', 'September', 'October', 'November', 'December'];
          month = monthNames[batchData.earnedMonth - 1] || 'Unknown';
          year = batchData.earnedYear;
        } else if (batchData.monthYear) {
          // Parse from monthYear format (e.g., "2024-10")
          const parts = batchData.monthYear.split('-');
          if (parts.length === 2) {
            year = parseInt(parts[0]);
            const monthIdx = parseInt(parts[1]) - 1;
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
            month = monthNames[monthIdx] || 'Unknown';
          }
        }

        batchInfo.push({
          batchId: usage.batchId,
          hours: usage.hoursUsed,
          month: month,
          year: year
        });
      }

      // Get current batch to preserve all existing fields
      const currentBatchDoc = db.getDocument('creditBatches/' + usage.batchId);
      if (!currentBatchDoc || !currentBatchDoc.obj) {
        Logger.log('Warning: Batch document not found: ' + usage.batchId);
        return; // Skip this iteration in forEach
      }

      const currentBatch = currentBatchDoc.obj;
      const currentUsedHours = currentBatch.usedHours || 0;

      // Merge existing fields with updates to preserve all data
      const updatedBatch = Object.assign({}, currentBatch, {
        remainingHours: usage.newRemaining,
        usedHours: currentUsedHours + usage.hoursUsed,
        status: newStatus,
        lastUsedDate: filingDate.toISOString(),
        lastUsedBy: Session.getActiveUser().getEmail()
      });

      db.updateDocument('creditBatches/' + usage.batchId, updatedBatch);
    });

    const newBalance = availableBalance - hoursUsed;

    const ledgerId = 'LEDGER_' + Utilities.getUuid();
    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: filingDate.toISOString(),
      transactionType: 'Used',
      referenceId: ctoId,
      hoursChange: -hoursUsed,
      balanceAfter: newBalance,
      filingDate: filingDate.toISOString(),
      inclusiveDateFrom: dateFrom.toISOString(),
      inclusiveDateTo: dateTo.toISOString(),
      dayBreakdown: data.dayBreakdown || {},
      deductedFrom: batchInfo, // Store FIFO deduction info
      status: 'Active',
      remarks: data.remarks || `CTO filed on ${filingDate.toISOString().split('T')[0]} for ${dateFrom.toISOString().split('T')[0]} to ${dateTo.toISOString().split('T')[0]}`,
      createdAt: new Date().toISOString()
    };

    db.createDocument('ledger/' + ledgerId, ledgerData);

    return {
      success: true,
      ctoId: ctoId,
      hoursUsed: hoursUsed,
      totalEarned: availableBalance,
      newBalance: newBalance,
      creditedFrom: batchInfo
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get all CTO applications from ledger
function getCtoApplications_SERVER() {
  try {
    const db = getFirestore();

    // Get all ledger entries with transaction type 'Used'
    const allLedger = db.getDocuments('ledger');
    const ctoApplications = [];

    // Get all employees for name lookup
    const allEmployees = db.getDocuments('employees');
    const employeeMap = {};
    for (let i = 0; i < allEmployees.length; i++) {
      const emp = allEmployees[i].obj;
      if (emp) {
        let fullName = `${emp.firstName} ${emp.lastName}`;
        if (emp.suffix) {
          const needsComma = emp.suffix.toLowerCase().includes('jr') || emp.suffix.toLowerCase().includes('sr');
          fullName += needsComma ? `, ${emp.suffix}` : ` ${emp.suffix}`;
        }
        employeeMap[emp.employeeId] = fullName;
      }
    }

    for (let i = 0; i < allLedger.length; i++) {
      const ledger = allLedger[i].obj;
      if (ledger && ledger.transactionType === 'Used') {
        ctoApplications.push({
          ledgerId: ledger.ledgerId,
          employeeId: ledger.employeeId,
          employeeName: employeeMap[ledger.employeeId] || 'Unknown',
          filingDate: ledger.filingDate || ledger.transactionDate,
          inclusiveDateFrom: ledger.inclusiveDateFrom || ledger.transactionDate,
          inclusiveDateTo: ledger.inclusiveDateTo || ledger.transactionDate,
          hoursChange: ledger.hoursChange,
          balanceAfter: ledger.balanceAfter,
          status: ledger.status || 'Active',
          dayBreakdown: ledger.dayBreakdown || {},
          deductedFrom: ledger.deductedFrom || [], // FIFO batch info
          remarks: ledger.remarks,
          createdAt: ledger.createdAt
        });
      }
    }

    // Sort by filing date (newest first)
    ctoApplications.sort((a, b) => new Date(b.filingDate) - new Date(a.filingDate));

    return {
      success: true,
      applications: ctoApplications
    };

  } catch (error) {
    Logger.log('Error getting CTO applications: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get CTO calendar for a specific month/year
function getCtoCalendar_SERVER(data) {
  try {
    const db = getFirestore();

    const month = data.month; // 0-11
    const year = data.year;

    // Get all ledger entries with transaction type 'Used'
    const allLedger = db.getDocuments('ledger');

    // Get all employees for name lookup
    const allEmployees = db.getDocuments('employees');
    const employeeMap = {};
    for (let i = 0; i < allEmployees.length; i++) {
      const emp = allEmployees[i].obj;
      if (emp) {
        let fullName = `${emp.firstName} ${emp.lastName}`;
        if (emp.suffix) {
          const needsComma = emp.suffix.toLowerCase().includes('jr') || emp.suffix.toLowerCase().includes('sr');
          fullName += needsComma ? `, ${emp.suffix}` : ` ${emp.suffix}`;
        }
        employeeMap[emp.employeeId] = fullName;
      }
    }

    const ctosByDate = {};
    let totalApplications = 0;

    for (let i = 0; i < allLedger.length; i++) {
      const ledger = allLedger[i].obj;
      if (ledger && ledger.transactionType === 'Used' && ledger.inclusiveDateFrom && ledger.inclusiveDateTo) {
        const dateFrom = new Date(ledger.inclusiveDateFrom);
        const dateTo = new Date(ledger.inclusiveDateTo);

        // Check if any date in the inclusive range falls within the selected month/year
        const currentDate = new Date(dateFrom);
        while (currentDate <= dateTo) {
          if (currentDate.getMonth() === month && currentDate.getFullYear() === year) {
            const dateStr = Utilities.formatDate(currentDate, 'GMT', 'yyyy-MM-dd');

            if (!ctosByDate[dateStr]) {
              ctosByDate[dateStr] = [];
            }

            ctosByDate[dateStr].push({
              employeeName: employeeMap[ledger.employeeId] || 'Unknown',
              hoursUsed: Math.abs(ledger.hoursChange)
            });

            // Only count once per application
            if (currentDate.getTime() === dateFrom.getTime()) {
              totalApplications++;
            }
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }

    return {
      success: true,
      ctosByDate: ctosByDate,
      totalApplications: totalApplications
    };

  } catch (error) {
    Logger.log('Error getting CTO calendar: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Get a single CTO application for editing
function getCtoApplication_SERVER(ledgerId) {
  try {
    const db = getFirestore();

    // Get the ledger entry
    const ledgerDoc = db.getDocument('ledger/' + ledgerId);
    if (!ledgerDoc) {
      return {
        success: false,
        error: 'CTO application not found'
      };
    }

    const ledger = ledgerDoc.obj;

    // Get employee details
    const employeeDoc = db.getDocument('employees/' + ledger.employeeId);
    const employee = employeeDoc ? employeeDoc.obj : null;

    let employeeName = 'Unknown';
    if (employee) {
      employeeName = `${employee.firstName} ${employee.lastName}`;
      if (employee.suffix) {
        const needsComma = employee.suffix.toLowerCase().includes('jr') || employee.suffix.toLowerCase().includes('sr');
        employeeName += needsComma ? `, ${employee.suffix}` : ` ${employee.suffix}`;
      }
    }

    return {
      success: true,
      application: {
        ledgerId: ledger.ledgerId,
        employeeId: ledger.employeeId,
        employeeName: employeeName,
        filingDate: ledger.filingDate || ledger.transactionDate,
        inclusiveDateFrom: ledger.inclusiveDateFrom || ledger.transactionDate,
        inclusiveDateTo: ledger.inclusiveDateTo || ledger.transactionDate,
        hoursUsed: Math.abs(ledger.hoursChange),
        dayBreakdown: ledger.dayBreakdown || {},
        status: ledger.status || 'Active',
        remarks: ledger.remarks || ''
      }
    };

  } catch (error) {
    Logger.log('Error getting CTO application: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Update an existing CTO application
function updateCto_SERVER(data) {
  try {
    const db = getFirestore();

    // Get the existing ledger entry
    const ledgerDoc = db.getDocument('ledger/' + data.ledgerId);
    if (!ledgerDoc) {
      return {
        success: false,
        error: 'CTO application not found'
      };
    }

    const oldLedger = ledgerDoc.obj;
    const oldHoursUsed = Math.abs(oldLedger.hoursChange);
    const newHoursUsed = parseFloat(data.hoursUsed);

    const dateFrom = new Date(data.dateFrom);
    const dateTo = new Date(data.dateTo);

    // Note: Restore remarks are optional when editing CTO
    // Remarks are only required for cancellation

    // Check for overlapping CTO dates (exclude current one being edited)
    const allLedgerDocs = db.getDocuments('ledger');
    for (let i = 0; i < allLedgerDocs.length; i++) {
      const otherLedger = allLedgerDocs[i].obj;
      const otherLedgerId = allLedgerDocs[i].name.split('/').pop();

      if (!otherLedger ||
          otherLedgerId === data.ledgerId || // Exclude current one
          otherLedger.employeeId !== data.employeeId ||
          otherLedger.transactionType !== 'Used' ||
          otherLedger.status === 'Cancelled') {
        continue;
      }

      if (otherLedger.inclusiveDateFrom && otherLedger.inclusiveDateTo) {
        const existingFrom = new Date(otherLedger.inclusiveDateFrom);
        const existingTo = new Date(otherLedger.inclusiveDateTo);

        // Check if dates overlap
        if ((dateFrom <= existingTo && dateTo >= existingFrom)) {
          return {
            success: false,
            error: `Date overlap detected! You already have a CTO application from ${existingFrom.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})} to ${existingTo.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})}.`
          };
        }
      }
    }

    // Step 1: Restore hours from the old CTO (reverse the original deduction)
    // We need to restore hours back to credit batches using FIFO
    const batchDocs = db.getDocuments('creditBatches');
    const batches = [];

    for (let i = 0; i < batchDocs.length; i++) {
      const doc = batchDocs[i];
      const batch = doc.obj;
      if (!batch || batch.employeeId !== data.employeeId) {
        continue;
      }

      const batchId = doc.name.split('/').pop();
      batches.push({ id: batchId, data: batch });
    }

    // Sort batches by earned month/year (TRUE FIFO - oldest earned first)
    batches.sort((a, b) => {
      // Get year and month for batch A
      let yearA = a.data.earnedYear;
      let monthA = a.data.earnedMonth;

      // If not present, try parsing from monthYear field
      if (!yearA && a.data.monthYear) {
        const parts = a.data.monthYear.split('-');
        if (parts.length === 2) {
          yearA = parseInt(parts[0]);
          monthA = parseInt(parts[1]);
        }
      }

      // If still not available, try parsing from issueDate or createdAt
      if (!yearA) {
        const dateStr = a.data.issueDate || a.data.dateOfIssuance || a.data.createdAt;
        if (dateStr) {
          const date = new Date(dateStr);
          yearA = date.getFullYear();
          monthA = date.getMonth() + 1;
        } else {
          yearA = 9999;
          monthA = 12;
        }
      }

      // Get year and month for batch B
      let yearB = b.data.earnedYear;
      let monthB = b.data.earnedMonth;

      // If not present, try parsing from monthYear field
      if (!yearB && b.data.monthYear) {
        const parts = b.data.monthYear.split('-');
        if (parts.length === 2) {
          yearB = parseInt(parts[0]);
          monthB = parseInt(parts[1]);
        }
      }

      // If still not available, try parsing from issueDate or createdAt
      if (!yearB) {
        const dateStr = b.data.issueDate || b.data.dateOfIssuance || b.data.createdAt;
        if (dateStr) {
          const date = new Date(dateStr);
          yearB = date.getFullYear();
          monthB = date.getMonth() + 1;
        } else {
          yearB = 9999;
          monthB = 12;
        }
      }

      // Sort by year first, then by month
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });

    // Restore hours to the EXACT batches where they were originally deducted from
    const nowManilaStr = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');
    const todayManila = new Date(nowManilaStr);
    todayManila.setHours(0, 0, 0, 0);

    let hoursActuallyRestored = 0;
    let batchesWithExpiredHours = [];

    if (oldLedger.deductedFrom && oldLedger.deductedFrom.length > 0) {
      // First, check if any of the batches are expired
      for (let i = oldLedger.deductedFrom.length - 1; i >= 0; i--) {
        const deductionInfo = oldLedger.deductedFrom[i];
        const batchId = deductionInfo.batchId;
        const hoursToRestoreToBatch = deductionInfo.hours;

        if (!batchId) {
          continue;
        }

        const batchDoc = db.getDocument('creditBatches/' + batchId);
        if (!batchDoc || !batchDoc.obj) {
          continue;
        }

        const batch = batchDoc.obj;

        // Check if the batch has expired
        if (batch.expiryDate) {
          const expiryDate = new Date(batch.expiryDate);
          expiryDate.setHours(0, 0, 0, 0);

          if (todayManila > expiryDate) {
            batchesWithExpiredHours.push({
              month: deductionInfo.month,
              year: deductionInfo.year,
              hours: hoursToRestoreToBatch
            });
          }
        }
      }

      // If there are expired batches, return error
      if (batchesWithExpiredHours.length > 0) {
        const expiredInfo = batchesWithExpiredHours.map(b =>
          `${b.hours.toFixed(1)} hrs from ${b.month} ${b.year}`
        ).join(', ');
        return {
          success: false,
          error: `Cannot update CTO: The following COC batches have expired and cannot receive restored hours: ${expiredInfo}. Expired COCs cannot be restored.`
        };
      }

      // Restore to the exact batches in reverse order (most recent first)
      for (let i = oldLedger.deductedFrom.length - 1; i >= 0; i--) {
        const deductionInfo = oldLedger.deductedFrom[i];
        const batchId = deductionInfo.batchId;
        const hoursToRestoreToBatch = deductionInfo.hours;

        if (!batchId) {
          continue;
        }

        const batchDoc = db.getDocument('creditBatches/' + batchId);
        if (!batchDoc || !batchDoc.obj) {
          continue;
        }

        const batch = batchDoc.obj;

        // Restore hours to this batch
        const newRemaining = batch.remainingHours + hoursToRestoreToBatch;
        const currentUsedHours = batch.usedHours || 0;
        const newUsedHours = Math.max(0, currentUsedHours - hoursToRestoreToBatch);
        const newStatus = newRemaining > 0 ? 'Active' : batch.status;

        // Merge existing fields with updates to preserve all data
        const updatedBatch = Object.assign({}, batch, {
          remainingHours: newRemaining,
          usedHours: newUsedHours,
          status: newStatus
        });

        db.updateDocument('creditBatches/' + batchId, updatedBatch);
        hoursActuallyRestored += hoursToRestoreToBatch;
      }
    }

    // Step 2: Deduct new hours (same logic as logCto_SERVER)
    let availableBalance = 0;
    const activeBatches = [];

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      // Re-fetch to get updated remaining hours
      const updatedBatchDoc = db.getDocument('creditBatches/' + batch.id);
      const updatedBatch = updatedBatchDoc.obj;

      if (updatedBatch.status === 'Active') {
        activeBatches.push({ id: batch.id, data: updatedBatch });
        availableBalance += Number(updatedBatch.remainingHours || 0);
      }
    }

    // IMPORTANT: When editing a CTO, if restoration didn't happen (no deductedFrom info),
    // we still need to account for the old hours that would have been available
    // The effective balance is: current balance + hours actually restored
    // If no restoration happened but oldHoursUsed > 0, use oldHoursUsed as fallback
    let effectiveAvailableBalance = availableBalance;
    if (hoursActuallyRestored === 0 && oldHoursUsed > 0) {
      // Legacy CTO without deductedFrom info - add old hours as available
      effectiveAvailableBalance = availableBalance + oldHoursUsed;
      Logger.log('WARNING: CTO being edited has no deductedFrom info. Using fallback logic. Old hours: ' + oldHoursUsed);
    }

    // Sort active batches by earned month/year (TRUE FIFO - oldest earned first)
    activeBatches.sort((a, b) => {
      // Get year and month for batch A
      let yearA = a.data.earnedYear;
      let monthA = a.data.earnedMonth;

      // If not present, try parsing from monthYear field
      if (!yearA && a.data.monthYear) {
        const parts = a.data.monthYear.split('-');
        if (parts.length === 2) {
          yearA = parseInt(parts[0]);
          monthA = parseInt(parts[1]);
        }
      }

      // If still not available, try parsing from issueDate or createdAt
      if (!yearA) {
        const dateStr = a.data.issueDate || a.data.dateOfIssuance || a.data.createdAt;
        if (dateStr) {
          const date = new Date(dateStr);
          yearA = date.getFullYear();
          monthA = date.getMonth() + 1;
        } else {
          yearA = 9999;
          monthA = 12;
        }
      }

      // Get year and month for batch B
      let yearB = b.data.earnedYear;
      let monthB = b.data.earnedMonth;

      // If not present, try parsing from monthYear field
      if (!yearB && b.data.monthYear) {
        const parts = b.data.monthYear.split('-');
        if (parts.length === 2) {
          yearB = parseInt(parts[0]);
          monthB = parseInt(parts[1]);
        }
      }

      // If still not available, try parsing from issueDate or createdAt
      if (!yearB) {
        const dateStr = b.data.issueDate || b.data.dateOfIssuance || b.data.createdAt;
        if (dateStr) {
          const date = new Date(dateStr);
          yearB = date.getFullYear();
          monthB = date.getMonth() + 1;
        } else {
          yearB = 9999;
          monthB = 12;
        }
      }

      // Sort by year first, then by month
      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });

    if (newHoursUsed > effectiveAvailableBalance) {
      return {
        success: false,
        error: `Insufficient balance. Available: ${effectiveAvailableBalance.toFixed(2)} hours, Requested: ${newHoursUsed.toFixed(2)} hours`
      };
    }

    // Deduct new hours
    let remainingToUse = newHoursUsed;
    const usedBatches = [];

    for (let i = 0; i < activeBatches.length && remainingToUse > 0; i++) {
      const batch = activeBatches[i];
      const available = batch.data.remainingHours;
      const toUse = Math.min(available, remainingToUse);

      usedBatches.push({
        batchId: batch.id,
        hoursUsed: toUse,
        newRemaining: available - toUse
      });

      remainingToUse -= toUse;
    }

    const filingDate = new Date(data.filingDate);

    // Collect batch information for display
    const batchInfo = [];
    usedBatches.forEach(usage => {
      const newStatus = usage.newRemaining === 0 ? 'Depleted' : 'Active';

      // Get batch details
      const batchDoc = db.getDocument('creditBatches/' + usage.batchId);
      if (batchDoc && batchDoc.obj) {
        const batchData = batchDoc.obj;

        // Get month and year from batch data
        let month = 'Unknown';
        let year = 'Unknown';

        if (batchData.earnedMonth && batchData.earnedYear) {
          // Use earnedMonth and earnedYear fields
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                             'July', 'August', 'September', 'October', 'November', 'December'];
          month = monthNames[batchData.earnedMonth - 1] || 'Unknown';
          year = batchData.earnedYear;
        } else if (batchData.monthYear) {
          // Parse from monthYear format (e.g., "2024-10")
          const parts = batchData.monthYear.split('-');
          if (parts.length === 2) {
            year = parseInt(parts[0]);
            const monthIdx = parseInt(parts[1]) - 1;
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
            month = monthNames[monthIdx] || 'Unknown';
          }
        }

        batchInfo.push({
          batchId: usage.batchId,
          hours: usage.hoursUsed,
          month: month,
          year: year
        });
      }

      // Get current batch to preserve all existing fields
      const currentBatchDoc = db.getDocument('creditBatches/' + usage.batchId);
      if (!currentBatchDoc || !currentBatchDoc.obj) {
        Logger.log('Warning: Batch document not found: ' + usage.batchId);
        return; // Skip this iteration in forEach
      }

      const currentBatch = currentBatchDoc.obj;
      const currentUsedHours = currentBatch.usedHours || 0;

      // Merge existing fields with updates to preserve all data
      const updatedBatch = Object.assign({}, currentBatch, {
        remainingHours: usage.newRemaining,
        usedHours: currentUsedHours + usage.hoursUsed,
        status: newStatus,
        lastUsedDate: filingDate.toISOString(),
        lastUsedBy: Session.getActiveUser().getEmail()
      });

      db.updateDocument('creditBatches/' + usage.batchId, updatedBatch);
    });

    const newBalance = availableBalance - newHoursUsed;

    // Prepare remarks - include restore remarks if hours were restored
    let ledgerRemarks = data.remarks || `CTO updated on ${new Date().toISOString().split('T')[0]} for ${dateFrom.toISOString().split('T')[0]} to ${dateTo.toISOString().split('T')[0]}`;
    if (hoursActuallyRestored > 0 && data.restoreRemarks) {
      ledgerRemarks += `\n\n[Hours Restored: ${hoursActuallyRestored.toFixed(2)} hrs] ${data.restoreRemarks}`;
    }

    // Update the ledger entry - preserve all original fields
    const updatedLedgerData = Object.assign({}, oldLedger, {
      transactionDate: filingDate.toISOString(),
      hoursChange: -newHoursUsed,
      balanceAfter: newBalance,
      filingDate: filingDate.toISOString(),
      inclusiveDateFrom: dateFrom.toISOString(),
      inclusiveDateTo: dateTo.toISOString(),
      dayBreakdown: data.dayBreakdown || {},
      deductedFrom: batchInfo, // Store FIFO deduction info
      remarks: ledgerRemarks,
      updatedAt: new Date().toISOString()
    });

    db.updateDocument('ledger/' + data.ledgerId, updatedLedgerData);

    // Calculate NET hours restored for display (oldHoursUsed - newHoursUsed)
    // This is the actual benefit to the user, not the gross restoration
    const netHoursRestored = oldHoursUsed - newHoursUsed;

    // Prepare restored batches info - show where the NET restoration went
    let restoredBatches = [];
    if (netHoursRestored > 0 && oldLedger.deductedFrom) {
      // Show the batches from the old deduction
      // But adjust the hours to show the NET restoration, not gross
      let remainingToShow = netHoursRestored;

      for (let i = oldLedger.deductedFrom.length - 1; i >= 0 && remainingToShow > 0; i--) {
        const deductionInfo = oldLedger.deductedFrom[i];
        const hoursToShow = Math.min(deductionInfo.hours, remainingToShow);

        restoredBatches.push({
          hours: hoursToShow,
          month: deductionInfo.month,
          year: deductionInfo.year
        });

        remainingToShow -= hoursToShow;
      }
    }

    return {
      success: true,
      hoursUsed: newHoursUsed,
      totalEarned: availableBalance,
      newBalance: newBalance,
      creditedFrom: batchInfo,
      originalHours: oldHoursUsed,
      hoursRestored: netHoursRestored,  // Changed to NET restoration
      restoredTo: restoredBatches
    };

  } catch (error) {
    Logger.log('Error updating CTO: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Cancel a CTO application and restore hours
function cancelCto_SERVER(ledgerId, reason) {
  try {
    const db = getFirestore();

    // Validate reason
    if (!reason || !reason.trim()) {
      return {
        success: false,
        error: 'Cancellation reason is required'
      };
    }

    // Get the ledger entry
    const ledgerDoc = db.getDocument('ledger/' + ledgerId);
    if (!ledgerDoc) {
      return {
        success: false,
        error: 'CTO application not found'
      };
    }

    const ledger = ledgerDoc.obj;

    // Check if already cancelled
    if (ledger.status === 'Cancelled') {
      return {
        success: false,
        error: 'CTO application is already cancelled'
      };
    }

    const hoursToRestore = Math.abs(ledger.hoursChange);

    // Get today's date in Manila timezone for expiry check
    const nowManilaStr = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');
    const todayManila = new Date(nowManilaStr);
    todayManila.setHours(0, 0, 0, 0);

    let hoursActuallyRestored = 0;
    let hoursForfeitedDueToExpiry = 0;

    // Restore hours to the EXACT batches where they were originally deducted from
    if (ledger.deductedFrom && ledger.deductedFrom.length > 0) {
      // Restore to the exact batches in reverse order (most recent first)
      for (let i = ledger.deductedFrom.length - 1; i >= 0; i--) {
        const deductionInfo = ledger.deductedFrom[i];
        const batchId = deductionInfo.batchId;
        const hoursToRestoreToBatch = deductionInfo.hours;

        if (!batchId) {
          // Legacy data without batchId - skip
          Logger.log('Warning: No batchId in deductedFrom info, skipping');
          hoursForfeitedDueToExpiry += hoursToRestoreToBatch;
          continue;
        }

        // Get the batch
        const batchDoc = db.getDocument('creditBatches/' + batchId);
        if (!batchDoc || !batchDoc.obj) {
          Logger.log('Warning: Batch not found: ' + batchId);
          hoursForfeitedDueToExpiry += hoursToRestoreToBatch;
          continue;
        }

        const batch = batchDoc.obj;

        // Check if the batch has expired
        if (batch.expiryDate) {
          const expiryDate = new Date(batch.expiryDate);
          expiryDate.setHours(0, 0, 0, 0);

          if (todayManila > expiryDate) {
            // COC has expired - forfeit these hours
            Logger.log('Batch ' + batchId + ' has expired. Forfeiting ' + hoursToRestoreToBatch + ' hours.');
            hoursForfeitedDueToExpiry += hoursToRestoreToBatch;
            continue;
          }
        }

        // Restore hours to this batch
        const newRemaining = batch.remainingHours + hoursToRestoreToBatch;
        const currentUsedHours = batch.usedHours || 0;
        const newUsedHours = Math.max(0, currentUsedHours - hoursToRestoreToBatch);
        const newStatus = newRemaining > 0 ? 'Active' : batch.status;

        // Merge existing fields with updates to preserve all data
        const updatedBatch = Object.assign({}, batch, {
          remainingHours: newRemaining,
          usedHours: newUsedHours,
          status: newStatus
        });

        db.updateDocument('creditBatches/' + batchId, updatedBatch);
        hoursActuallyRestored += hoursToRestoreToBatch;
      }
    } else {
      // Fallback: If no deductedFrom info, log warning and forfeit
      Logger.log('Warning: No deductedFrom information in ledger. Cannot restore hours.');
      hoursForfeitedDueToExpiry = hoursToRestore;
    }

    // Calculate new balance by getting all active batches for the employee
    let newBalance = 0;
    const allBatchDocs = db.getDocuments('creditBatches');
    for (let i = 0; i < allBatchDocs.length; i++) {
      const doc = allBatchDocs[i];
      const batch = doc.obj;
      if (batch && batch.employeeId === ledger.employeeId && batch.status === 'Active') {
        newBalance += Number(batch.remainingHours || 0);
      }
    }

    // Update ledger entry to mark as cancelled - preserve all original fields
    const updatedLedger = Object.assign({}, ledger, {
      status: 'Cancelled',
      cancelledAt: new Date().toISOString(),
      cancelledBy: Session.getActiveUser().getEmail(),
      cancellationReason: reason.trim(),
      balanceAfter: newBalance // Update balance after restoration
    });

    db.updateDocument('ledger/' + ledgerId, updatedLedger);

    // Prepare response message
    let message = `Successfully cancelled CTO and restored ${hoursActuallyRestored.toFixed(1)} hours.`;
    if (hoursForfeitedDueToExpiry > 0) {
      message += ` ${hoursForfeitedDueToExpiry.toFixed(1)} hours were forfeited because the COC had expired.`;
    }

    return {
      success: true,
      hoursRestored: hoursActuallyRestored,
      hoursForfeitedDueToExpiry: hoursForfeitedDueToExpiry,
      newBalance: newBalance,
      message: message
    };

  } catch (error) {
    Logger.log('Error cancelling CTO: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addEmployee_SERVER(data) {
  try {
    const db = getFirestore();
    
    const allEmployees = db.getDocuments('employees');
    const count = allEmployees.length;
    const nextNumber = count + 1;
    const employeeId = 'EMP_' + String(nextNumber).padStart(3, '0');
    
    const employeeData = {
      employeeId: employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffix: data.suffix || '',
      office: data.office,
      position: data.position,
      isActive: data.isActive !== false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('employees/' + employeeId, employeeData);
    
    return {
      success: true,
      employeeId: employeeId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateEmployee_SERVER(employeeId, data) {
  try {
    const db = getFirestore();
    
    const updateData = {
      employeeId: employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffix: data.suffix || '',
      office: data.office,
      position: data.position,
      isActive: data.isActive !== false,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument('employees/' + employeeId, updateData);
    
    return {
      success: true,
      employeeId: employeeId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addHoliday_SERVER(data) {
  try {
    const db = getFirestore();
    
    const holidayId = 'HOL_' + Utilities.getUuid();
    
    const holidayData = {
      holidayId: holidayId,
      date: data.date,
      name: data.name,
      type: data.type,
      isRecurring: data.isRecurring || false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('holidays/' + holidayId, holidayData);
    
    return {
      success: true,
      holidayId: holidayId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateHoliday_SERVER(data) {
  try {
    const db = getFirestore();

    if (!data.holidayId) {
      return {
        success: false,
        error: 'Holiday ID is required'
      };
    }

    // Get existing holiday data to preserve all fields
    const existingDoc = db.getDocument('holidays/' + data.holidayId);
    if (!existingDoc || !existingDoc.obj) {
      return {
        success: false,
        error: 'Holiday not found'
      };
    }

    // Merge existing data with updates to preserve all fields (including createdAt, createdBy)
    const updateData = Object.assign({}, existingDoc.obj, {
      date: data.date,
      name: data.name,
      type: data.type,
      isRecurring: data.isRecurring || false,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    });

    db.updateDocument('holidays/' + data.holidayId, updateData);

    return {
      success: true,
      holidayId: data.holidayId
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteHoliday_SERVER(holidayId) {
  try {
    const db = getFirestore();
    db.deleteDocument('holidays/' + holidayId);

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function initializeHolidays_SERVER() {
  try {
    const db = getFirestore();

    const holidays2024 = [
      { date: '2024-01-01', name: "New Year's Day", type: 'Regular', isRecurring: true },
      { date: '2024-02-10', name: 'Chinese New Year', type: 'Special', isRecurring: false },
      { date: '2024-02-25', name: 'EDSA People Power Revolution Anniversary', type: 'Special', isRecurring: true },
      { date: '2024-03-28', name: 'Maundy Thursday', type: 'Regular', isRecurring: false },
      { date: '2024-03-29', name: 'Good Friday', type: 'Regular', isRecurring: false },
      { date: '2024-03-30', name: 'Black Saturday', type: 'Special', isRecurring: false },
      { date: '2024-04-09', name: 'Araw ng Kagitingan', type: 'Regular', isRecurring: true },
      { date: '2024-04-10', name: "Eid'l Fitr", type: 'Regular', isRecurring: false },
      { date: '2024-05-01', name: 'Labor Day', type: 'Regular', isRecurring: true },
      { date: '2024-06-12', name: 'Independence Day', type: 'Regular', isRecurring: true },
      { date: '2024-06-17', name: "Eid'l Adha", type: 'Regular', isRecurring: false },
      { date: '2024-08-21', name: 'Ninoy Aquino Day', type: 'Special', isRecurring: true },
      { date: '2024-08-26', name: 'National Heroes Day', type: 'Regular', isRecurring: false },
      { date: '2024-11-01', name: "All Saints' Day", type: 'Special', isRecurring: true },
      { date: '2024-11-02', name: 'All Souls\' Day', type: 'Special', isRecurring: true },
      { date: '2024-11-30', name: 'Bonifacio Day', type: 'Regular', isRecurring: true },
      { date: '2024-12-08', name: 'Feast of the Immaculate Conception', type: 'Special', isRecurring: true },
      { date: '2024-12-24', name: 'Christmas Eve', type: 'Special', isRecurring: true },
      { date: '2024-12-25', name: 'Christmas Day', type: 'Regular', isRecurring: true },
      { date: '2024-12-30', name: 'Rizal Day', type: 'Regular', isRecurring: true },
      { date: '2024-12-31', name: 'Last Day of the Year', type: 'Special', isRecurring: true }
    ];

    const holidays2025 = [
      { date: '2025-01-01', name: "New Year's Day", type: 'Regular', isRecurring: true },
      { date: '2025-01-29', name: 'Chinese New Year', type: 'Special', isRecurring: false },
      { date: '2025-02-25', name: 'EDSA People Power Revolution Anniversary', type: 'Special', isRecurring: true },
      { date: '2025-04-09', name: 'Araw ng Kagitingan', type: 'Regular', isRecurring: true },
      { date: '2025-04-17', name: 'Maundy Thursday', type: 'Regular', isRecurring: false },
      { date: '2025-04-18', name: 'Good Friday', type: 'Regular', isRecurring: false },
      { date: '2025-04-19', name: 'Black Saturday', type: 'Special', isRecurring: false },
      { date: '2025-05-01', name: 'Labor Day', type: 'Regular', isRecurring: true },
      { date: '2025-06-12', name: 'Independence Day', type: 'Regular', isRecurring: true },
      { date: '2025-08-21', name: 'Ninoy Aquino Day', type: 'Special', isRecurring: true },
      { date: '2025-08-25', name: 'National Heroes Day', type: 'Regular', isRecurring: false },
      { date: '2025-11-01', name: "All Saints' Day", type: 'Special', isRecurring: true },
      { date: '2025-11-02', name: 'All Souls\' Day', type: 'Special', isRecurring: true },
      { date: '2025-11-30', name: 'Bonifacio Day', type: 'Regular', isRecurring: true },
      { date: '2025-12-08', name: 'Feast of the Immaculate Conception', type: 'Special', isRecurring: true },
      { date: '2025-12-24', name: 'Christmas Eve', type: 'Special', isRecurring: true },
      { date: '2025-12-25', name: 'Christmas Day', type: 'Regular', isRecurring: true },
      { date: '2025-12-30', name: 'Rizal Day', type: 'Regular', isRecurring: true },
      { date: '2025-12-31', name: 'Last Day of the Year', type: 'Special', isRecurring: true }
    ];

    const allHolidays = holidays2024.concat(holidays2025);

    const existingDocs = db.getDocuments('holidays');
    const existingDates = new Set();

    for (let i = 0; i < existingDocs.length; i++) {
      const holiday = existingDocs[i].obj;
      if (holiday && holiday.date) {
        existingDates.add(holiday.date);
      }
    }

    let createdCount = 0;
    let skippedCount = 0;
    const createdHolidays = [];

    allHolidays.forEach(holiday => {
      if (existingDates.has(holiday.date)) {
        skippedCount++;
        return;
      }

      const holidayId = 'HOL_' + Utilities.getUuid();
      const holidayData = {
        holidayId: holidayId,
        date: holiday.date,
        name: holiday.name,
        type: holiday.type,
        isRecurring: holiday.isRecurring || false,
        createdAt: new Date().toISOString(),
        createdBy: Session.getActiveUser().getEmail()
      };

      db.createDocument('holidays/' + holidayId, holidayData);

      createdCount++;
      createdHolidays.push(`${holiday.date} - ${holiday.name}`);
      existingDates.add(holiday.date);
    });

    return {
      success: true,
      totalDefined: allHolidays.length,
      createdCount: createdCount,
      skippedCount: skippedCount,
      createdHolidays: createdHolidays
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addLibraryItem_SERVER(libraryType, data) {
  try {
    const db = getFirestore();
    
    const itemId = Utilities.getUuid();
    const path = `libraries/${libraryType}/items/${itemId}`;
    
    const itemData = {
      id: itemId,
      name: data.name,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument(path, itemData);
    
    return {
      success: true,
      itemId: itemId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateLibraryItem_SERVER(libraryType, itemId, data) {
  try {
    const db = getFirestore();
    
    const path = `libraries/${libraryType}/items/${itemId}`;
    
    const updateData = {
      name: data.name,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument(path, updateData);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteLibraryItem_SERVER(libraryType, itemId) {
  try {
    const db = getFirestore();
    
    const path = `libraries/${libraryType}/items/${itemId}`;
    db.deleteDocument(path);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function initializeLibraries_SERVER() {
  try {
    const db = getFirestore();
    
    const offices = [
      'Administrative Division',
      'Construction Division',
      'Equipment Management Division',
      'Finance Division',
      'Maintenance Division',
      'Office of the Regional Director',
      'Planning and Design Division',
      'Quality Assurance and Hydrology Division',
      'Right-of-Way Acquisition and Legal Division'
    ];
    
    const positions = [
      'Accountant I',
      'Accountant II',
      'Accountant III',
      'Accountant IV',
      'Administrative Aide III',
      'Administrative Aide IV',
      'Administrative Aide V',
      'Administrative Aide VI',
      'Administrative Assistant I',
      'Administrative Assistant II',
      'Administrative Assistant III',
      'Administrative Officer I',
      'Administrative Officer II',
      'Administrative Officer III',
      'Administrative Officer IV',
      'Administrative Officer V',
      'Architect II',
      'Assistant Regional Director',
      'Attorney III',
      'Attorney IV',
      'Attorney V',
      'Automotive Equipment Inspector II',
      'Chemist II',
      'Chief Administrative Officer',
      'Computer Programmer II',
      'District Engineer',
      'Engineer II',
      'Engineer III',
      'Engineer IV',
      'Engineer V',
      'Engineering Assistant',
      'Environmental Management Specialist II',
      'Geologist II',
      'Heavy Equipment Operator I',
      'Information Technologist Officer I',
      'Laboratory Technician I',
      'Laboratory Technician II',
      'Laboratory Technician Il',
      'Legal Assistant III',
      'Metal Worker I',
      'OIC - Assistant Regional Director',
      'Regional Director',
      'Supervising Administrative Officer',
      'Surveyman',
      'Welder I'
    ];
    
    const timestamp = new Date().toISOString();
    
    offices.forEach(office => {
      const itemId = Utilities.getUuid();
      const path = `libraries/offices/items/${itemId}`;
      const itemData = {
        id: itemId,
        name: office,
        createdAt: timestamp,
        createdBy: 'SYSTEM_INIT'
      };
      db.createDocument(path, itemData);
    });
    
    positions.forEach(position => {
      const itemId = Utilities.getUuid();
      const path = `libraries/positions/items/${itemId}`;
      const itemData = {
        id: itemId,
        name: position,
        createdAt: timestamp,
        createdBy: 'SYSTEM_INIT'
      };
      db.createDocument(path, itemData);
    });
    
    return {
      success: true,
      officesCreated: offices.length,
      positionsCreated: positions.length,
      message: 'Libraries initialized successfully!'
    };
    
  } catch (error) {
    Logger.log('Error initializing libraries: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function migrateHistoricalBalance_SERVER(data) {
  try {
    const db = getFirestore();
    
    const cocEarned = parseFloat(data.cocEarned);
    const cocUsed = parseFloat(data.cocUsed) || 0;
    const monthYear = data.monthYear;
    const dateOfIssuance = new Date(data.dateOfIssuance);
    
    const [year, month] = monthYear.split('-').map(Number);
    const earnedMonth = month;
    const earnedYear = year;
    
    if (cocEarned > 40) {
      return {
        success: false,
        error: 'COC Earned cannot exceed 40 hours per month (Monthly Accrual Cap)'
      };
    }
    
    if (cocUsed > cocEarned) {
      return {
        success: false,
        error: 'COC Used cannot exceed COC Earned'
      };
    }
    
    const lastDayOfEarnedMonth = new Date(earnedYear, earnedMonth, 0);
    const lastDayOfNextMonth = new Date(earnedYear, earnedMonth + 1, 0);

    // Date range validation - allows December to span into next year
    if (dateOfIssuance < lastDayOfEarnedMonth || dateOfIssuance > lastDayOfNextMonth) {
      return {
        success: false,
        error: `Date of Issuance must be between ${lastDayOfEarnedMonth.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})} and ${lastDayOfNextMonth.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})}`
      };
    }
    
    const duplicateQuery = db.getDocuments('creditBatches');
    for (let i = 0; i < duplicateQuery.length; i++) {
      const batch = duplicateQuery[i];
      if (batch.fields.employeeId && batch.fields.employeeId.stringValue === data.employeeId &&
          batch.fields.isHistorical && batch.fields.isHistorical.booleanValue === true &&
          batch.fields.earnedMonth && batch.fields.earnedMonth.integerValue == earnedMonth &&
          batch.fields.earnedYear && batch.fields.earnedYear.integerValue == earnedYear) {
        return {
          success: false,
          error: `Historical balance for ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} already exists for this employee`
        };
      }
    }
    
    const remainingHours = cocEarned - cocUsed;
    
    const batchesQuery = db.getDocuments('creditBatches');
    let currentBalance = 0;
    
    batchesQuery.forEach(doc => {
      const batch = doc.obj;
      if (batch.employeeId === data.employeeId && batch.status === 'Active') {
        currentBalance += Number(batch.remainingHours || 0);
      }
    });
    
    const logsQuery = db.getDocuments('overtimeLogs');
    logsQuery.forEach(doc => {
      const log = doc.obj;
      if (log.employeeId === data.employeeId && log.status === 'Uncertified') {
        currentBalance += Number(log.earnedHours || 0);
      }
    });
    
    if (currentBalance + remainingHours > 120) {
      return {
        success: false,
        error: `Total balance cap exceeded. Current balance: ${currentBalance.toFixed(2)} hours. Adding ${remainingHours.toFixed(2)} hours would exceed 120-hour cap.`
      };
    }
    
    const expiryDate = new Date(dateOfIssuance);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    expiryDate.setDate(expiryDate.getDate() - 1);

    // Calculate status with expiry check
    let status;
    if (remainingHours === 0) {
      status = 'Used';
    } else {
      // Check if expired - MUST use Manila timezone (UTC+8)
      // Get current date in Manila timezone as YYYY-MM-DD string
      const nowManilaStr = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');
      // Create Date object representing midnight of current day in Manila
      const todayManila = new Date(nowManilaStr);
      todayManila.setHours(0, 0, 0, 0);

      const expiry = new Date(expiryDate);
      expiry.setHours(0, 0, 0, 0);

      // "Valid Until Nov 11" means valid through entire day of Nov 11
      // Should only expire on Nov 12 onwards
      if (todayManila > expiry) {
        status = 'Expired';
      } else {
        status = 'Active';
      }
    }
    
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerEarnedId = 'LEDGER_' + Utilities.getUuid();
    const ledgerUsedId = 'LEDGER_' + Utilities.getUuid();
    
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: 'HISTORICAL',
      source: 'Historical',
      initialHours: cocEarned,
      earnedHours: cocEarned,
      usedHours: cocUsed,
      remainingHours: remainingHours,
      monthYear: monthYear,
      dateOfIssuance: dateOfIssuance.toISOString(),
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      isHistorical: true,
      earnedMonth: earnedMonth,
      earnedYear: earnedYear,
      migratedAt: new Date().toISOString(),
      migratedBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('creditBatches/' + batchId, batchData);
    
    const ledgerEarnedData = {
      ledgerId: ledgerEarnedId,
      employeeId: data.employeeId,
      transactionDate: dateOfIssuance.toISOString(),
      transactionType: 'Earned',
      referenceId: batchId,
      hoursChange: cocEarned,
      balanceAfter: currentBalance + cocEarned,
      remarks: `Historical balance - ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} (Initial Balance)`,
      createdAt: new Date().toISOString()
    };
    
    db.createDocument('ledger/' + ledgerEarnedId, ledgerEarnedData);
    
    if (cocUsed > 0) {
      const ledgerUsedData = {
        ledgerId: ledgerUsedId,
        employeeId: data.employeeId,
        transactionDate: dateOfIssuance.toISOString(),
        transactionType: 'Used',
        referenceId: batchId,
        hoursChange: -cocUsed,
        balanceAfter: currentBalance + remainingHours,
        remarks: `Historical balance - ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} (Initial Balance)`,
        createdAt: new Date().toISOString()
      };
      
      db.createDocument('ledger/' + ledgerUsedId, ledgerUsedData);
    }
    
    return {
      success: true,
      batchId: batchId,
      cocEarned: cocEarned,
      cocUsed: cocUsed,
      remainingHours: remainingHours,
      validUntil: expiryDate.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'}),
      status: status
    };
    
  } catch (error) {
    Logger.log('Historical balance migration error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function saveConfiguration_SERVER(data) {
  try {
    const db = getFirestore();
    
    const configData = {
      regularDayMultiplier: data.regularDayMultiplier,
      restDayMultiplier: data.restDayMultiplier,
      holidayMultiplier: data.holidayMultiplier,
      monthlyAccrualCap: data.monthlyAccrualCap,
      totalBalanceCap: data.totalBalanceCap,
      expiryMonths: data.expiryMonths,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument('configuration/accrualRules', configData);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateHistoricalBalance_SERVER(data) {
  try {
    const db = getFirestore();

    const cocEarned = parseFloat(data.cocEarned);
    const cocUsed = parseFloat(data.cocUsed) || 0;
    const monthYear = data.monthYear;
    const dateOfIssuance = new Date(data.dateOfIssuance);
    const batchId = data.batchId;

    const [year, month] = monthYear.split('-').map(Number);
    const earnedMonth = month;
    const earnedYear = year;

    // Get existing document to preserve ALL fields
    const existingDoc = db.getDocument('creditBatches/' + batchId);
    if (!existingDoc) {
      return {
        success: false,
        error: 'Historical balance not found'
      };
    }
    const existing = existingDoc.obj;

    // Same validations as create
    if (cocEarned > 40) {
      return {
        success: false,
        error: 'COC Earned cannot exceed 40 hours per month (Monthly Accrual Cap)'
      };
    }

    if (cocUsed > cocEarned) {
      return {
        success: false,
        error: 'COC Used cannot exceed COC Earned'
      };
    }

    const remainingHours = cocEarned - cocUsed;

    const expiryDate = new Date(dateOfIssuance);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    expiryDate.setDate(expiryDate.getDate() - 1);

    // Calculate status with expiry check
    let status;
    if (remainingHours === 0) {
      status = 'Used';
    } else {
      // Check if expired - MUST use Manila timezone (UTC+8)
      // Get current date in Manila timezone as YYYY-MM-DD string
      const nowManilaStr = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');
      // Create Date object representing midnight of current day in Manila
      const todayManila = new Date(nowManilaStr);
      todayManila.setHours(0, 0, 0, 0);

      const expiry = new Date(expiryDate);
      expiry.setHours(0, 0, 0, 0);

      // "Valid Until Nov 11" means valid through entire day of Nov 11
      // Should only expire on Nov 12 onwards
      if (todayManila > expiry) {
        status = 'Expired';
      } else {
        status = 'Active';
      }
    }

    // Merge: Start with ALL existing fields, then override only what we're updating
    const updateData = Object.assign({}, existing, {
      initialHours: cocEarned,
      earnedHours: cocEarned,
      usedHours: cocUsed,
      remainingHours: remainingHours,
      monthYear: monthYear,
      dateOfIssuance: dateOfIssuance.toISOString(),
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      earnedMonth: earnedMonth,
      earnedYear: earnedYear,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    });

    db.updateDocument('creditBatches/' + batchId, updateData);

    return {
      success: true,
      batchId: batchId,
      cocEarned: cocEarned,
      cocUsed: cocUsed,
      remainingHours: remainingHours,
      validUntil: expiryDate.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'}),
      status: status
    };

  } catch (error) {
    Logger.log('Historical balance update error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteHistoricalBalance_SERVER(batchId) {
  try {
    const db = getFirestore();
    db.deleteDocument('creditBatches/' + batchId);

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function checkEmployeeHasOvertimeLogs_SERVER(employeeId) {
  try {
    const db = getFirestore();

    const logDocs = db.getDocuments('overtimeLogs');
    let hasLogs = false;

    for (let i = 0; i < logDocs.length; i++) {
      const log = logDocs[i].obj;
      if (log && log.employeeId === employeeId) {
        hasLogs = true;
        break;
      }
    }

    return {
      success: true,
      hasLogs: hasLogs
    };

  } catch (error) {
    return {
      success: false,
      hasLogs: false,
      error: error.toString()
    };
  }
}

function dailyForfeitureTask() {
  try {
    const db = getFirestore();
    const today = new Date();
    
    const batchDocs = db.getDocuments('creditBatches');

    let forfeitedCount = 0;
    let totalForfeitedHours = 0;

    for (let i = 0; i < batchDocs.length; i++) {
      const doc = batchDocs[i];
      const batch = doc.obj;
      if (!batch || batch.status !== 'Active' || !batch.expiryDate) {
        continue;
      }

      const expiryDate = new Date(batch.expiryDate);
      if (expiryDate >= today) {
        continue;
      }

      const batchId = doc.name.split('/').pop();
      const remainingHours = Number(batch.remainingHours || 0);

      db.updateDocument('creditBatches/' + batchId, {
        status: 'Expired',
        expiredAt: today.toISOString()
      });

      const ledgerId = 'LEDGER_' + Utilities.getUuid();
      const ledgerData = {
        ledgerId: ledgerId,
        employeeId: batch.employeeId,
        transactionDate: today.toISOString(),
        transactionType: 'Forfeited',
        referenceId: batchId,
        hoursChange: -remainingHours,
        balanceAfter: 0,
        remarks: `Batch ${batchId} expired`,
        createdAt: today.toISOString()
      };

      db.createDocument('ledger/' + ledgerId, ledgerData);

      forfeitedCount++;
      totalForfeitedHours += remainingHours;
    }
    
    Logger.log(`Forfeiture task completed. ${forfeitedCount} batches expired. Total: ${totalForfeitedHours} hours`);
    
    return {
      success: true,
      forfeitedCount: forfeitedCount,
      totalForfeitedHours: totalForfeitedHours
    };
    
  } catch (error) {
    Logger.log('Forfeiture task error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function syncReportsToSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('COC Reports');
    
    if (!sheet) {
      sheet = ss.insertSheet('COC Reports');
    } else {
      sheet.clear();
    }
    
    const db = getFirestore();
    
    sheet.appendRow(['COC Liability Report', '', '', '', '']);
    sheet.appendRow(['Generated:', new Date().toLocaleString('en-US', {timeZone: 'Asia/Manila'}), '', '', '']);
    sheet.appendRow(['']);
    sheet.appendRow(['Employee ID', 'Name', 'Total Balance (hrs)', 'Active Batches', 'Earliest Expiry']);
    
    const employeeDocs = db.getDocuments('employees');
    const batchDocs = db.getDocuments('creditBatches');

    const reportData = [];

    const activeEmployees = employeeDocs
      .map(doc => doc.obj)
      .filter(emp => emp && emp.isActive)
      .sort((a, b) => {
        const lastA = (a.lastName || '').toLowerCase();
        const lastB = (b.lastName || '').toLowerCase();
        if (lastA < lastB) return -1;
        if (lastA > lastB) return 1;
        return 0;
      });

    activeEmployees.forEach(emp => {
      const employeeBatches = batchDocs
        .filter(doc => {
          const batch = doc.obj;
          return batch && batch.employeeId === emp.employeeId && batch.status === 'Active';
        })
        .map(doc => doc.obj)
        .sort((a, b) => {
          const dateA = a.expiryDate ? new Date(a.expiryDate) : new Date('9999-12-31');
          const dateB = b.expiryDate ? new Date(b.expiryDate) : new Date('9999-12-31');
          return dateA - dateB;
        });

      let totalBalance = 0;
      let activeBatches = 0;
      let earliestExpiry = '';

      employeeBatches.forEach(batch => {
        totalBalance += Number(batch.remainingHours || 0);
        activeBatches++;

        if (!earliestExpiry && batch.expiryDate) {
          earliestExpiry = new Date(batch.expiryDate).toLocaleDateString('en-US', {timeZone: 'Asia/Manila'});
        }
      });

      if (totalBalance > 0) {
        reportData.push([
          emp.employeeId,
          `${emp.lastName}, ${emp.firstName}`,
          totalBalance.toFixed(2),
          activeBatches,
          earliestExpiry
        ]);
      }
    });
    
    if (reportData.length > 0) {
      sheet.getRange(5, 1, reportData.length, 5).setValues(reportData);
    } else {
      sheet.appendRow(['No active COC balances found']);
    }
    
    sheet.autoResizeColumns(1, 5);
    
    const headerRange = sheet.getRange(1, 1, 1, 5);
    headerRange.setFontWeight('bold').setFontSize(14);
    
    const columnHeaderRange = sheet.getRange(4, 1, 1, 5);
    columnHeaderRange.setFontWeight('bold').setBackground('#667eea').setFontColor('white');
    
    SpreadsheetApp.getUi().alert('Reports synced successfully to "COC Reports" sheet!');
    
    return {
      success: true,
      recordCount: reportData.length
    };
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error syncing reports: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}
