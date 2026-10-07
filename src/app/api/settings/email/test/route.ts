import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import { isValidEmail } from "@/lib/email-settings";
import {
  getMailer,
  MailerNotConfiguredError,
  orderRecipients,
} from "@/lib/mailer";

/** Sends a throwaway message so an admin can confirm the inbox receives it. */
export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  let body: { to?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* an empty body just means "use the saved recipient" */
  }

  let mailer;
  try {
    mailer = await getMailer();
  } catch (error) {
    if (error instanceof MailerNotConfiguredError) {
      return NextResponse.json(
        { error: "Add the SMTP password before sending a test." },
        { status: 400 }
      );
    }
    throw error;
  }

  const override = String(body.to ?? "").trim();
  if (override && !isValidEmail(override)) {
    return NextResponse.json(
      { error: "Enter a valid address to send the test to." },
      { status: 400 }
    );
  }

  const { to, cc } = orderRecipients(mailer.settings);
  const target = override || to;

  try {
    await mailer.send({
      to: target,
      cc: override ? [] : cc,
      subject: "Simply Sourdough — order email test",
      text: [
        "This is a test from the Simply Sourdough admin panel.",
        "",
        `New website orders are being sent to: ${to}`,
        cc.length ? `Copied to: ${cc.join(", ")}` : "No CC addresses set.",
        `Sent through: ${mailer.settings.smtpHost}:${mailer.settings.smtpPort} as ${mailer.settings.smtpUser}`,
        "",
        "If you received this, order notifications will arrive here too.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("test email failed", error);
    const detail =
      error instanceof Error ? error.message : "Unknown SMTP error.";
    return NextResponse.json(
      { error: `The test could not be sent. ${detail}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ sent: true, to: target });
}
