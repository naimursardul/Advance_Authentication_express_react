import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];
  console.log(email);

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification email",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

// SEND WELCOME EMAIL
export const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "cc8aed30-d6c8-458c-a3f5-fb9147999966",
      template_variables: {
        company_info_name: "Advance auth",
        name: name,
        company_info_address: "Majhira",
        company_info_city: "Bogura",
        company_info_zip_code: "5800",
        company_info_country: "Bangladesh",
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, url) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: `Reset your password`,
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: `Reset password`,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: `Password reset successfully`,
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: `Password reset Seccess`,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
