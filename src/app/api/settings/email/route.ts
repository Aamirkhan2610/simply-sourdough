import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import {
  describeStorage,
  getEmailSettings,
  isValidEmail,
  parseRecipients,
  saveEmailSettings,
} from "@/lib/email-settings";
import type { EmailSettings } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Not authorised." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const settings = await getEmailSettings();
  return NextResponse.json({ settings, storage: describeStorage() });
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  let body: Partial<EmailSettings>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid Zoho email address." },
      { status: 400 }
    );
  }

  const password = String(body.password ?? "").trim();
  if (!password) {
    return NextResponse.json(
      { error: "Enter the Zoho account password." },
      { status: 400 }
    );
  }

  const ccRecipients = String(body.ccRecipients ?? "").trim();
  const invalidCc = parseRecipients(ccRecipients).find(
    (address) => !isValidEmail(address)
  );
  if (invalidCc) {
    return NextResponse.json(
      { error: `"${invalidCc}" is not a valid email address.` },
      { status: 400 }
    );
  }

  const smtpHost = String(body.smtpHost ?? "").trim();
  if (!smtpHost) {
    return NextResponse.json(
      { error: "Enter the SMTP host." },
      { status: 400 }
    );
  }

  const smtpPort = Number(body.smtpPort);
  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
    return NextResponse.json(
      { error: "Enter a valid SMTP port, for example 465." },
      { status: 400 }
    );
  }

  try {
    const saved = await saveEmailSettings({
      email,
      password,
      smtpHost,
      smtpPort,
      ccRecipients,
      sendCustomerConfirmation: body.sendCustomerConfirmation !== false,
    });
    return NextResponse.json({ settings: saved, storage: describeStorage() });
  } catch (error) {
    console.error("could not save email settings", error);
    return NextResponse.json(
      { error: "Could not save these settings. Please try again." },
      { status: 500 }
    );
  }
}
