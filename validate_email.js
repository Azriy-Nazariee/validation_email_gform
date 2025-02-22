function onFormSubmit(e) {
    Logger.log("✅ Form submission triggered");

    var response = e.response;
    if (!response) {
        Logger.log("🚨 ERROR: No response object received!");
        return;
    }

    var itemResponses = response.getItemResponses();
    var nric = "";
    var email = response.getRespondentEmail().trim(); // Get respondent's email
    var isMember = false;

    Logger.log("📧 Respondent Email: " + email);

    // Extract responses dynamically
    for (var i = 0; i < itemResponses.length; i++) {
        var question = itemResponses[i].getItem().getTitle();
        var answer = itemResponses[i].getResponse().trim();

        Logger.log("📝 Processing question: " + question + " → Answer: " + answer);

        if (question.includes("NRIC / Passport Number")) {
            nric = answer.replace(/[-\s]/g, ""); // Remove hyphens and spaces
            Logger.log("🔢 Processed NRIC: " + nric);
        }

        if (question.includes("Have you registered as UAA Member?") && answer.toLowerCase() === "yes") {
            isMember = true;
        }
    }

    if (!isMember) {
        Logger.log("❌ User did not select 'Yes' for membership.");
        return;
    }

    Logger.log("✅ User selected 'Yes' for membership. Checking membership database...");

    // Open membership sheet
    var sheet = SpreadsheetApp.openById("id").getSheetByName("Validation");
    var data = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
        var sheetNRIC = data[i][1].toString().trim().replace(/[-\s]/g, ""); // Remove hyphens and spaces
        var sheetName = data[i][0]; // Get member's name

        if (sheetNRIC === nric) {
            Logger.log("✅ Match found! NRIC: " + sheetNRIC + ", Name: " + sheetName);
            Logger.log("✅ Membership verified! Sending email...");
            
            var votingFormURL = "url";
            
            try {
                MailApp.sendEmail({
                    to: email,
                    subject: "Cast Your Vote for UAA AGM 2024! 🗳️",
                    body: "Dear " + sheetName + ",\n\n"
                        + "Fantastic news! Your UAA membership has been successfully verified. We appreciate your involvement in this year’s Annual General Meeting, and now it’s time to make your voice count! 🗳️\n\n"
                        + "Click the link below to access your voting form:\n\n"
                        + votingFormURL + "\n\n"
                        + "If you have any questions, feel free to reach out. We're happy to help!\n\n"
                        + "Warmest regards,\n"
                        + "UAA AGM 2024 Committee",
                    htmlBody: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                width: 100%;
                                background: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                                text-align: center;
                                margin: 0 auto;
                            }
                            h2 {
                                color: green;
                            }
                            p {
                                font-size: 16px;
                                color: #333;
                                line-height: 1.6;
                            }
                            .button {
                                display: inline-block;
                                padding: 12px 20px;
                                margin: 20px 0;
                                font-size: 18px;
                                color: #ffffff;
                                background: #4A90E2;
                                text-decoration: none;
                                border-radius: 5px;
                            }
                            .footer {
                                margin-top: 20px;
                                font-size: 14px;
                                color: #777;
                            }
                            @media (max-width: 600px) {
                                .container {
                                    padding: 10px;
                                }
                                .button {
                                    padding: 10px 15px;
                                    font-size: 16px;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>🎉 You're Verified, ${sheetName}!</h2>
                            <p>Fantastic news! Your UAA membership has been successfully verified.</p>
                            <p>We appreciate your involvement in this year’s <strong>Annual General Meeting</strong>, and now it’s time to make your voice count! 🗳️</p>
                            <a class="button" href="${votingFormURL}" target="_blank">Cast Your Vote Now</a>
                            <p>If the button above doesn't work, click the link below:</p>
                            <p><a href="${votingFormURL}" target="_blank">${votingFormURL}</a></p>
                            <p>If you have any questions or need assistance, feel free to reach out. We're always happy to help!</p>
                            <p class="footer">Best regards,<br>UAA AGM 2024 Committee</p>
                        </div>
                    </body>
                    </html>`
                });
                Logger.log("✅ Email sent successfully to: " + email);
            } catch (error) {
                Logger.log("🚨 ERROR: Unable to send email! " + error.message);
            }
            return;
        }
    }

    Logger.log("❌ User is NOT a member or credentials do not match.");
}

function sendManualEmail() {
  var emailMapping = {
    "email": "name",
  };

  var votingFormURL = "url";

  for (var recipientEmail in emailMapping) {
    if (emailMapping.hasOwnProperty(recipientEmail)) {
      var recipientName = emailMapping[recipientEmail];

      try {
        MailApp.sendEmail({
          to: recipientEmail,
          subject: "Cast Your Vote for UAA AGM 2024! 🗳️",
          body: "Dear " + recipientName + ",\n\n"
            + "Fantastic news! Your UAA membership has been successfully verified. We appreciate your involvement in this year’s Annual General Meeting, and now it’s time to make your voice count! 🗳️\n\n"
            + "Click the link below to access your voting form:\n\n"
            + votingFormURL + "\n\n"
            + "If you have any questions, feel free to reach out. We're happy to help!\n\n"
            + "Warmest regards,\n"
            + "UAA AGM 2024 Committee",
          htmlBody: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  width: 100%;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  text-align: center;
                  margin: 0 auto;
                }
                h2 {
                  color: green;
                }
                p {
                  font-size: 16px;
                  color: #333;
                  line-height: 1.6;
                }
                .button {
                  display: inline-block;
                  padding: 12px 20px;
                  margin: 20px 0;
                  font-size: 18px;
                  color: #ffffff;
                  background: #4A90E2;
                  text-decoration: none;
                  border-radius: 5px;
                }
                .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #777;
                }
                @media (max-width: 600px) {
                  .container {
                    padding: 10px;
                  }
                  .button {
                    padding: 10px 15px;
                    font-size: 16px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>🎉 You're Verified, ${recipientName}!</h2>
                <p>Fantastic news! Your UAA membership has been successfully verified.</p>
                <p>We appreciate your involvement in this year’s <strong>Annual General Meeting</strong>, and now it’s time to make your voice count! 🗳️</p>
                <a class="button" href="${votingFormURL}" target="_blank">Cast Your Vote Now</a>
                <p>If the button above doesn't work, click the link below:</p>
                <p><a href="${votingFormURL}" target="_blank">${votingFormURL}</a></p>
                <p>If you have any questions or need assistance, feel free to reach out. We're always happy to help!</p>
                <p class="footer">Best regards,<br>UAA AGM 2024 Committee</p>
              </div>
            </body>
            </html>`
        });
        Logger.log("✅ Email sent successfully to: " + recipientEmail);
      } catch (error) {
        Logger.log("🚨 ERROR: Unable to send email to " + recipientEmail + "! " + error.message);
      }
    }
  }
}