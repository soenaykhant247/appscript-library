// function buildLeaveRequestMessage(values) {
//   try {
//     const spreadsheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
//     const [timestamp,name,email, leaveType,startDate, endDate,totalLeave,informedTo,reason, _, attachedFile] = values;
//     const userId = getSlackUserId(informedTo);
//    logToSheet("UserID = " +userId+
//    "timestamp = " +timestamp+
//    "name = " +name+
//    "leavetype = " +leaveType
//    +"informedto = " +informedTo
//    +"startdate = " +startDate
//    +"enddate = " +endDate
//    +"totalleave = " +totalLeave
//    +"reason = " +reason
//    +"attachedfile = " +attachedFile);
//    logToSheet(values);

//     const message = {
//       channel: userId,
//       blocks: [
//       {
//         type: "header",
//         text: {
//           type: "plain_text",
//           text: "📝 New Leave Request Submitted",
//           emoji: true
//         }
//       },
//       { type: "divider" },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*👤 Name :*\n         ${name}`
//           },
//           {
//             type: "mrkdwn",
//             text: `*📌 Leave Type :*\n         ${leaveType}`
//           }
//         ]
//       },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*👨🏻‍💻 Informed To :*\n         ${informedTo}`
//           }
//         ]
//       },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*📅 From Date :*\n         ${formatDate(startDate)}`
//           },
//           {
//             type: "mrkdwn",
//             text: `*📅 To Date :*\n         ${formatDate(endDate)}`
//           }
//         ]
//       },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*📊 Total Leave :*\n         ${totalLeave}`
//           },
//           {
//             type: "mrkdwn",
//             text: `*📝 Reason :*\n         ${reason}`
//           }
//         ]
//       },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*🕒 Submitted On :*\n         ${timestamp}`
//           },
//           {
//             type: "mrkdwn",
//             text: attachedFile ? `*📎 Attached File :*\n       <${attachedFile}|Click to View Attachment>` : `*📎 Attached File :*\n       -`
//           }
//         ]
//       },
//       {
//         type: 'actions',
//         elements: [
//           {
//             type: 'button',
//             text: { type: 'plain_text', text: '🔍 Review Leave Request' },
//             url: spreadsheetUrl,
//             style: 'primary'
//           }
//         ]
//       }
//     ],
//     };
//     return JSON.stringify(message);
//   } catch(err) {
//     Logger.log(err)
//     logToSheet(err);
//   }
// }

// function sendToSlack(message) {
//      Logger.log("Message" + message);
//   const options = {
//     method: "POST",
//     contentType: "application/json",
//     headers: {
//         Authorization: `Bearer ${BOT_TOKEN}`,
//       },
//     payload: message,
 
//   };
//   try {
//     UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
//     logToSheet("Slack notification sent successfully." + message);
//   } catch(err) {
//     Logger.log(err)
//     logToSheet(err);
//   }
// }
// function getSlackUserId(informedTo) {
//   try{
//     const options = {
//       method: "get",
//       headers: {
//         Authorization: `Bearer ${BOT_TOKEN}`,
//       },
//     };
//     const response = UrlFetchApp.fetch(`${USER_LIST_URL}`, options);
//     const users = JSON.parse(response).members;
//     const user = users.filter((u) => !u.deleted).find(u => u.real_name === informedTo);
//     return user ? user.id : null;
//     logToSheet("gelSlackUserID User " + user + "user id = "+user.id);
//   } catch(err) {
//     logToSheet(err);
//   }
// }
// function getSlackUserIdByEmail(email) {
//   try {
//     const url = `${LOOK_UP_BY_EMAIL_URL}?email=${encodeURIComponent(email)}`;
//     const options = {
//       "method": "get",
//       "headers": {
//         "Authorization": "Bearer " + BOT_TOKEN
//       }
//     };
//     const response = UrlFetchApp.fetch(url, options);
//     const result = JSON.parse(response.getContentText());
//     if (result.ok) {
//       var userId = result.user.id;
//       return userId;
//     } else {
//       throw new Error('User ID not found!')
//     }
//   } catch(err) {
//     logToSheet(err);
//   }
// }

// // function testFunction(){
// //   const data = {
// //     userName : 'Soe Nay Khant',
// //     requesterEmail : 'soenaykhantworks247@gmail.com',
// //     fromDate : '6/8/2025',
// //     toDate: '7/8/2025',
// //     status : 'Approved',
// //     rejectedReason: '-'
// //   }
// //   sendEmailToRequester(data);
// // }

// function sendEmailToRequester({userName, requesterEmail, fromDate, toDate, status, rejectedReason}) {
//   try {
//     const subject = `Leave Request Status: ${status === 'Approved' ? '✅ Approved' : '❌ Rejected'}`;

//     const rejectReason = rejectedReason;

//     const htmlBody = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//         <p>Dear <strong>${userName}</strong>,</p>

//         <p>We would like to inform you about the status of your leave request.</p>

//         <p><strong>📅 Leave Duration:</strong> ${formatDate(fromDate)} to ${formatDate(toDate)}</p>

//         <p><strong>📅 Leave Request Status:</strong> <span style="color: ${status === 'Approved' ? '#4CAF50' : '#F44336'}; font-weight: bold;">${status === 'Approved' ? '✅ Approved' : '❌ Rejected'}</span></p>

//         ${status === 'Rejected' && rejectReason ? `<p><strong>❌ Rejected Reason:</strong> ${rejectReason}</p>` : ''}

//         <p>Please contact the HR department if you have any further questions or require assistance.</p>

//         <p>Best regards,</p>
//         <p><strong>Leave Management Team</strong><br>Your Company Name , PIITS</p>
//       </div>
//     `;

//     MailApp.sendEmail({
//       to: requesterEmail,
//       subject,
//       htmlBody,
//     });
//   } catch(err) {
//     logToSheet(err);
//   }
// }

// function sendLeaveResponseSlackMessage({userName, userId, leaveType, status, fromDate, toDate, managerEmail, rejectedReason}) {
//   const isApproved = status === 'Approved';
//   const statusText = isApproved ? '*✅ Approved*' : '*❌ Rejected*';
  
//   const message = {
//     channel: userId,
//     blocks: [
//       {
//         type: "header",
//         text: {
//           type: "plain_text",
//           text: `👋 Hello ${userName}, Your leave request has been ${status}.`,
//           emoji: true
//         }
//       },
//       { type: "divider" },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*📌 Leave Type :*\n         ${leaveType}`
//           },
//           {
//             type: "mrkdwn",
//             text: `*📊 Status :*\n         ${statusText}`
//           }
//         ]
//       },

//       ...(status === 'Rejected' && rejectedReason ? [{
//         type: 'section',
//         fields: [
//           {
//             type: 'mrkdwn',
//             text: `*💁🏻 Reject because:*\n${rejectedReason}`
//           }
//         ]
//       }] : []),
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*📅 From Date :*\n         ${formatDate(fromDate)}`
//           },
//           {
//             type: "mrkdwn",
//             text: `*📅 To Date :*\n         ${formatDate(toDate)}`
//           }
//         ]
//       },
//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*👨🏻‍💼 Approver :*\n         ${managerEmail}`
//           }
//         ]
//       }
//     ],
//   };

//   const payload = JSON.stringify(message);

//   const options = {
//     method: "POST",
//     contentType  :   "application/json",
//     headers: {
//       Authorization: `Bearer ${BOT_TOKEN}`,
//     },
//     payload,
//   };

//   try {
//     UrlFetchApp.fetch(POST_MSG_URL, options);
//     logToSheet("Slack notification sent successfully.");
//   } catch(err) {
//     logToSheet(err);
//   }
// }

