function onFormSubmit(e) {

  try {
    const values = e?.values;
    if (!values) {
      throw new Error('Invalid submitted data!');
    }
    const sheet = SpreadsheetApp.getActiveSheet();

    const statusColumnIndex = 13;

    const lastRow = sheet.getLastRow();

    if (!sheet.getRange(lastRow, statusColumnIndex).getValue()) {
      sheet.getRange(lastRow, statusColumnIndex).setValue("Pending");
    }
    // const message = buildLeaveRequestMessage(values);
    // sendToSlack(message);
    const message = SlackApp.buildLeaveRequestMessage(values);
    SlackApp.sendToSlack(message);
  } catch (err) {
    // logToSheet(err);
    UtilServiceApp.logToSheet(err);
  }
}

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;

  if (range.getColumn() === STATUS_COL) {
    const row = range.getRow();
    const requesterEmail = sheet.getRange(row, REQUESTER_EMAIL_COL).getValue();
    const userId = SlackApp.getSlackUserIdByEmail(requesterEmail);
    const data = {
      userName: sheet.getRange(row, USER_NAME_COL).getValue(),
      requesterEmail,
      leaveType: sheet.getRange(row, LEAVE_TYPE_COL).getValue(),
      fromDate: sheet.getRange(row, FROM_DATE_COL).getValue(),
      toDate: sheet.getRange(row, TO_DATE_COL).getValue(),
      status: range.getValue(),
      userId,
      rejectedReason: sheet.getRange(row, REJECTED_REASON_COL).getValue(),
      managerEmail: Session.getActiveUser().getEmail(),
    };

    // sendEmailToRequester(data);
    // sendLeaveResponseSlackMessage(data);
    SlackApp.sendEmailToRequester(data);
    SlackApp.sendLeaveResponseSlackMessage(data);
  }
}
