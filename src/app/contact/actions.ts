"use server";

import { Resend } from "resend";

import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

/**
 * Contact form delivery.
 *
 * A Server Action rather than a route handler under `/api`: there is no other
 * consumer, and a route handler would be a public POST endpoint that has to
 * carry its own origin checks. Server Actions are bound to this form and
 * already origin-checked by Next.
 *
 * The client is constructed per invocation rather than at module scope. At
 * module scope it would run during the build, where `RESEND_API_KEY` is absent,
 * and the constructor throws on a missing key - taking the whole prerender of
 * `/contact` down with it.
 */

export type ContactState = {
  status: "idle" | "sent" | "error";
  /** Shown above the form. Empty when `status` is idle or sent. */
  message?: string;
  /** Keyed by field name, so each input can render its own error. */
  errors?: Partial<Record<"name" | "email" | "body", string>>;
  /** Echoed back so a rejected submission does not clear what was typed. */
  values?: { name: string; email: string; body: string };
};

/** Generous enough for a real correction, short enough to bound the payload. */
const LIMITS = { name: 120, email: 200, body: 5000 } as const;

/**
 * Deliberately loose. Strict address grammar rejects valid addresses, and the
 * only thing this check needs to catch is the obvious typo - anything subtler
 * is caught by the reply bouncing.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const values = { name, email, body };

  /**
   * Honeypot. A field no human sees and no human fills; bots that submit every
   * input in the form fill it. Returning the success state rather than an error
   * denies the sender any signal about why nothing arrived.
   */
  if (String(formData.get("company") ?? "")) {
    return { status: "sent" };
  }

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!name) errors.name = "Tell us who you are.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";

  if (!email) errors.email = "An address is needed to reply to you.";
  else if (email.length > LIMITS.email) errors.email = "That address is too long.";
  else if (!EMAIL.test(email)) errors.email = "That does not look like an email address.";

  if (!body) errors.body = "Say what you would like to report.";
  else if (body.length > LIMITS.body)
    errors.body = `Please keep this under ${LIMITS.body} characters.`;

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!apiKey || !domain) {
    /**
     * Configuration failure, not sender error, so the address is offered as the
     * way through. Saying "try again" would be a lie - it will fail identically
     * until the environment is fixed.
     */
    return {
      status: "error",
      message: `This form is not able to send right now. Please email ${CONTACT_EMAIL} instead.`,
      values,
    };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      /**
       * `from` has to be on the verified sending domain - putting the sender's
       * address here would be a forgery that SPF and DKIM reject. The sender
       * reaches the reply instead, through `replyTo`, so hitting reply in the
       * mail client goes to them rather than back to this form.
       */
      from: `${SITE_NAME} contact form <noreply@${domain}>`,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `Contact form: ${name}`,
      text: [`From: ${name} <${email}>`, "", body].join("\n"),
    });

    if (error) {
      return {
        status: "error",
        message: `That did not send. Please email ${CONTACT_EMAIL} directly.`,
        values,
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: `That did not send. Please email ${CONTACT_EMAIL} directly.`,
      values,
    };
  }
}
