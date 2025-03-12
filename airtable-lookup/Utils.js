// function logToSheet(message) {
//   let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
//   if (!sheet) {
//     sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Logs");
//     sheet.appendRow(["Timestamp", "Log Message"]);
//   }
//   sheet.appendRow([new Date(), message]); // Log the message with timestamp
// }

// function formatDate(inputDate) {
//   try {
//     if(inputDate instanceof Date) return Utilities.formatDate(inputDate, Session.getScriptTimeZone(), "yyyy/MM/dd");
//     const inputDateFormat = Utilities.formatDate(new Date(inputDate), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss.SSSZ");
//     return Utilities.formatDate(new Date(inputDateFormat), Session.getScriptTimeZone(), "yyyy/MM/dd");
//   } catch(err) {
//     logToSheet(err);
//   }
// }