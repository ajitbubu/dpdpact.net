"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { sendContactMessage, type ContactState } from "./actions";

const INITIAL: ContactState = { status: "idle" };

const labelClass =
  "font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-text-secondary";
const errorClass = "m-0 text-[13px] leading-[1.6] text-critical";

/**
 * The contact form.
 *
 * A client component only because it reports its own result; the submission
 * itself is a Server Action, so the form posts and works before this component
 * has hydrated.
 */
export function ContactForm() {
  const [state, action, pending] = React.useActionState(
    sendContactMessage,
    INITIAL,
  );

  if (state.status === "sent") {
    return (
      <div
        // Announced rather than merely rendered: the form it replaces is gone
        // from the page, and a screen reader has nothing to move focus to.
        role="status"
        className="flex items-start gap-[12px] rounded-lg border border-border-strong bg-surface p-[clamp(22px,4vw,32px)]"
      >
        <CheckCircle2
          size={22}
          aria-hidden="true"
          className="mt-[3px] shrink-0 text-primary-text"
        />
        <div>
          <h3 className="m-0 font-display text-[20px] font-semibold text-text">
            Message sent
          </h3>
          <p className="mb-0 mt-[8px] max-w-[64ch] text-[15px] leading-[1.75] text-text-secondary">
            Thank you - it reached a person, not a queue. Replies come from a
            monitored mailbox, and corrections that name their source are
            usually applied the same day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="flex flex-col gap-[16px] rounded-lg border border-border-strong bg-surface p-[clamp(22px,4vw,32px)]"
    >
      <div>
        <h3 className="m-0 font-display text-[24px] font-semibold text-text">
          Send a message
        </h3>
        <p className="mb-0 mt-[8px] max-w-[64ch] text-[15px] leading-[1.75] text-text-secondary">
          For anything you would rather not post in public. Name the page and
          quote the sentence you mean, and it can be verified against the source
          straight away.
        </p>
      </div>

      {state.message ? (
        <p
          role="alert"
          className="m-0 rounded-sm border border-critical bg-surface-inset px-[12px] py-[10px] text-[14px] leading-[1.7] text-critical"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="contact-name" className={labelClass}>
          Your name
        </label>
        <Input
          id="contact-name"
          name="name"
          size="lg"
          autoComplete="name"
          defaultValue={state.values?.name}
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "contact-name-error" : undefined}
        />
        {state.errors?.name ? (
          <p id="contact-name-error" className={errorClass}>
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="contact-email" className={labelClass}>
          Your email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          size="lg"
          autoComplete="email"
          defaultValue={state.values?.email}
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={
            state.errors?.email ? "contact-email-error" : undefined
          }
        />
        {state.errors?.email ? (
          <p id="contact-email-error" className={errorClass}>
            {state.errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="contact-body" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-body"
          name="body"
          rows={7}
          defaultValue={state.values?.body}
          aria-invalid={Boolean(state.errors?.body)}
          aria-describedby={state.errors?.body ? "contact-body-error" : undefined}
          className={cn(
            "w-full resize-y rounded-sm border border-border bg-surface-inset px-[12px] py-[10px]",
            "font-sans text-[14px] leading-[1.7] text-text outline-none",
            "transition-[border-color,box-shadow] duration-[var(--dur-fast)]",
            "focus:border-primary focus:shadow-[var(--shadow-focus)]",
          )}
        />
        {state.errors?.body ? (
          <p id="contact-body-error" className={errorClass}>
            {state.errors.body}
          </p>
        ) : null}
      </div>

      {/*
       * Honeypot. Hidden from sight and from the accessibility tree, and skipped
       * by the tab order, so no person ever meets it - which is what makes a
       * filled value a reliable bot signal. `display: none` rather than an
       * offscreen shift: some bots skip undisplayed fields, and one that skips
       * it submits like a human, which is the outcome we want anyway.
       */}
      <div hidden aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-[14px]">
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          <Send size={16} aria-hidden="true" />
          {pending ? "Sending..." : "Send message"}
        </Button>
        <p className="m-0 max-w-[52ch] text-[13px] leading-[1.7] text-text-muted">
          Your name, address and message are emailed to the editor so the
          message can be answered, and are not used for anything else. See the{" "}
          <Link
            href={routes.privacy}
            className="font-semibold text-primary-text"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
