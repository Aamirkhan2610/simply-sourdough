import nodemailer from "nodemailer";
import { getEmailSettings, parseRecipients } from "@/lib/email-settings";
import type { EmailSettings } from "@/lib/types";

export interface Mailer {
  settings: EmailSettings;
  send(message: {
    to: string;
    cc?: string[];
    replyTo?: string;
    subject: string;
    text: string;
  }): Promise<void>;
}

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("No SMTP password is configured.");
    this.name = "MailerNotConfiguredError";
  }
}

/**
 * Build a transport from the settings an admin saved, falling back to the
 * SMTP_* environment variables for anything they have not changed.
 */
export async function getMailer(): Promise<Mailer> {
  const settings = await getEmailSettings();
  if (!settings.smtpPassword) {
    throw new MailerNotConfiguredError();
  }

  const transport = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpPort === 465,
    auth: { user: settings.smtpUser, pass: settings.smtpPassword },
  });

  const from = settings.fromAddress || settings.smtpUser;

  return {
    settings,
    async send(message) {
      await transport.sendMail({
        from,
        to: message.to,
        cc: message.cc?.length ? message.cc : undefined,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
      });
    },
  };
}

/** The bakery inbox plus any CC addresses an admin added. */
export function orderRecipients(settings: EmailSettings): {
  to: string;
  cc: string[];
} {
  return {
    to: settings.orderRecipient,
    cc: parseRecipients(settings.ccRecipients),
  };
}
