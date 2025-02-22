# UAA AGM 2024 Voting Email Script

This Google Apps Script automates the process of verifying UAA members and sending them voting emails for the UAA AGM 2024.

## Features

- **Automatic Verification:** When a user submits a Google Form with their NRIC/Passport Number and confirms their UAA membership, the script checks their details against a membership database in a Google Sheet.
- **Email Sending:** If the user is a verified member, the script sends them an email with a link to the voting form.
- **Manual Email Sending:** The script also includes a function to manually send emails to specific members, which is useful for testing or sending reminders.
- **Logging:** The script logs important events and errors to help with debugging and monitoring.

## Setup

### 1. Create a Google Sheet
- Create a new Google Sheet and name it **"Validation"** (or update the script with your sheet name).
- In the first column, list the names of UAA members.
- In the second column, list their corresponding NRIC/Passport Numbers.
- Ensure that the NRIC/Passport Numbers are formatted consistently (with or without hyphens).

### 2. Create a Google Form
- Create a Google Form with fields for:
  - **NRIC/Passport Number**
  - **UAA Membership Confirmation** (Yes/No question)

### 3. Copy the Script
- Copy the provided Google Apps Script code into the script editor of your Google Sheet.

### 4. Update Variables
- Update the `votingFormURL` variable with the actual URL of your voting form.
- If you want to use the manual email sending feature, update the `emailMapping` object in the `sendManualEmail` function with the email addresses and names of the recipients.

### 5. Set up Triggers
- In the Apps Script editor, go to **"Triggers"** and create a new trigger:
  - Choose `onFormSubmit` as the function to run.
  - Select **"From spreadsheet"** as the event source.
  - Select **"On form submit"** as the event type.

## Usage

- **Automatic Email Sending:** When a user submits the Google Form, the script will automatically verify their membership and send the voting email if they are eligible.
- **Manual Email Sending:** To manually send emails, run the `sendManualEmail` function from the Apps Script editor.

## Troubleshooting

- **Check Logs:** If you encounter any issues, check the execution transcript in the Apps Script editor for error messages and logged information.
- **Verify Data:** Ensure that the NRIC/Passport Numbers in your Google Sheet are accurate and formatted consistently.

## Security

- **Protect Sensitive Data:** Be mindful of the sensitive data (like NRIC) being handled by the script. Ensure your spreadsheet and script are secured appropriately.
- **Review Permissions:** Make sure the script has the necessary permissions to access your spreadsheet and send emails.

## Contributing

Feel free to submit pull requests or issues if you have any improvements or suggestions for this script.
