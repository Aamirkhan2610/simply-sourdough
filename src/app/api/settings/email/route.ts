import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-session";
import {
  describeStorage,
  getEmailSettings,
  isValidEmail,
  parseRecipients,
  saveEmailSettings,
  toSafeEmailSettings,
} from "@/lib/email-settings";
import type { EmailSettings } from "@/lib/types";

function unauthorized() {
  return NextResponse.json({ error: "Not authorised." }, { status: 401 });
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  const settings = await getEmailSettings();
  return NextResponse.json({
    settings: toSafeEmailSettings(settings),
    storage: describeStorage(),
  });
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();

  let body: Partial<EmailSettings>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const orderRecipient = String(body.orderRecipient ?? "").trim();
  if (!isValidEmail(orderRecipient)) {
    return NextResponse.json(
      { error: "Enter a valid email address for order notifications." },
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

  const fromAddress = String(body.fromAddress ?? "").trim();
  if (fromAddress && !isValidEmail(fromAddress)) {
    return NextResponse.json(
      { error: "Enter a valid From address." },
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

  const smtpUser = String(body.smtpUser ?? "").trim();
  if (!smtpUser) {
    return NextResponse.json(
      { error: "Enter the SMTP username." },
      { status: 400 }
    );
  }

  try {
    const saved = await saveEmailSettings({
      orderRecipient,
      ccRecipients,
      fromAddress: fromAddress || smtpUser,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPassword: String(body.smtpPassword ?? ""),
      sendCustomerConfirmation: body.sendCustomerConfirmation !== false,
    });
    return NextResponse.json({
      settings: toSafeEmailSettings(saved),
      storage: describeStorage(),
    });
  } catch (error) {
    console.error("could not save email settings", error);
    return NextResponse.json(
      { error: "Could not save these settings. Please try again." },
      { status: 500 }
    );
  }
}
