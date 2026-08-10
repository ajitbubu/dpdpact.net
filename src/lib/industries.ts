import type { Route } from "next";

import {
  INDUSTRY_MENU,
  INDUSTRY_SLUGS,
  type IndustryMenuEntry,
  type IndustrySlug,
} from "./industries-menu";
import { routes } from "./routes";

/**
 * Industry implementation guides.
 *
 * The taxonomy is not marketing segmentation - every entry here exists because
 * the Act or the Rules treat that sector differently in a way you can point at:
 *
 *   - Three classes are *named* in the Third Schedule (rule 8(1)) with their
 *     own retention thresholds: e-commerce, online gaming, social media.
 *   - The Fourth Schedule (rule 12) turns section 9 off for defined classes,
 *     beginning with clinical and mental health establishments.
 *   - Section 17(1)(f) is written for financial institutions, and carries the
 *     Act's own bank-and-loan-default illustration.
 *   - Section 17(3) names startups as a class the Government *may* exempt.
 *   - Section 7(b) is the State's own legitimate use.
 *   - Sections 8(1) and 8(2) define the processor relationship that SaaS and
 *     IT services sit inside.
 *
 * A sector with no such hook does not get a page. "DPDP for manufacturing" is
 * the same Act with a different logo on it, and pages like that are precisely
 * what a search engine files as templated.
 */

export interface IndustryProvision {
  /** Section or Schedule reference, e.g. "§ 9(3)" or "Third Schedule". */
  ref: string;
  title: string;
  body: string;
}

/**
 * One hop in a processing activity: a real actor or system, not a lifecycle
 * stage.
 *
 * The distinction matters. "Collection -> consent -> processing -> sharing ->
 * retention -> erasure" is the same six boxes for every sector with the labels
 * swapped, which is the templated content this site exists to avoid. A hop is
 * "Courier API" or "Lab information system" - something that only appears in
 * that sector's flow, and that a reader recognises from their own architecture.
 */
export interface FlowStage {
  /** The party or system holding the data at this point. */
  actor: string;
  /** What happens to personal data here. */
  does: string;
  /** Provision governing this hop, where one does. */
  ref?: string;
  /** How this hop goes wrong in practice. Feeds the risk view. */
  risk?: string;
}

/** Which phase of an implementation programme a control belongs to. */
export type ControlPhase = "foundation" | "operationalise" | "governance";

/**
 * A processing activity: the unit the Act actually attaches obligations to.
 *
 * Lawful basis and retention attach to a *purpose*, not to a data category.
 * The same phone number in an e-commerce business is consented marketing,
 * contract fulfilment and a statutory tax record at once, with three different
 * erasure answers - so a table with one row per data type has to pick one and
 * is wrong for the other two.
 *
 * Every industry view is derived from this list. The activity table is one row
 * per activity, the diagram renders `flow`, the risk section collects each
 * hop's `risk`, and the implementation journey groups `control` by `phase`.
 * One place to change a fact, so the four presentations cannot drift apart.
 */
export interface ProcessingActivity {
  /** What the business is doing, in its own words. */
  name: string;
  /** The specified purpose, in the Act's sense. */
  purpose: string;
  /** Personal data this activity touches. */
  data: string[];
  flow: FlowStage[];
  /** Lawful basis. `ref` is the provision; `text` is why it applies here. */
  ground: { ref: string; text: string };
  /** The control that makes this lawful in practice, not on paper. */
  control: string;
  phase: ControlPhase;
  /** What you would put in front of an auditor. */
  evidence: string;
  /**
   * When the data must go.
   *
   * Where the answer comes from outside the Act - tax, company, RBI, clinical
   * records law - say so and point at it. Those statutes are not in this repo
   * and cannot be verified here, so stating a period would be inventing one.
   */
  retention: { ref: string; text: string };
}

/** A number worth seeing at a glance: "50 lakh" / "registered users". */
export interface Threshold {
  value: string;
  label: string;
  ref: string;
}

export interface IndustryContent {
  /**
   * When this guide was first published, and when its content last changed.
   *
   * Fixed literals per industry, deliberately not the site-wide
   * `CONTENT_UPDATED`. These feed `datePublished` and `dateModified` in the
   * Article schema, and pointing them at a mutable global meant every bump
   * rewrote the apparent publication date of all nine guides - telling search
   * engines the pages were written on a day they were not.
   */
  published: string;
  updated: string;
  /** Page <h1> and, via `absolute`, the <title>. Under 60 characters. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  lede: string;
  /**
   * Business terms that map to this sector.
   *
   * Search demand is in business language: people type "DPDP for hospitals",
   * not "DPDP for clinical establishments". The page is anchored in the
   * statute, so this is where the vocabulary people actually use lives,
   * without inventing nine more pages to hold it.
   */
  covers: string[];
  /** Why this sector is not just "the Act, again". The page's reason to exist. */
  standing: string[];
  /** The single source the activity table, diagram, risks and journey derive from. */
  activities: ProcessingActivity[];
  /** Numbers this sector needs at a glance. */
  thresholds: Threshold[];
  provisions: IndustryProvision[];
  actions: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  related: { href: Route; label: string; note: string }[];
}

export const INDUSTRY_CONTENT: Record<IndustrySlug, IndustryContent> = {
  "e-commerce": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for E-commerce: Retention and Consent",
    metaDescription:
      "How the DPDP Act applies to e-commerce: the Third Schedule three-year erasure rule at 2 crore users, and why withdrawal cannot cancel a paid order.",
    eyebrow: "Third Schedule · rule 8(1)",
    heading: "E-commerce Is Named",
    headingAccent: "In The Rules Themselves.",
    lede: "Most sectors have to reason by analogy from a general statute. E-commerce does not: it is one of three classes the Third Schedule names outright, and the Act uses online marketplaces in three of its own illustrations.",
    covers: ["online stores", "marketplaces", "D2C brands", "quick commerce", "retail chains"],
    standing: [
      "The Digital Personal Data Protection Act, 2023 is drafted to be sector-neutral. It defines a Data Fiduciary by what it does with personal data, not by what industry it is in, and almost every obligation applies identically to a hospital, a bank and a bookshop. That is deliberate, and it is why most \"DPDP for your industry\" material is the same checklist with a different heading.",
      "E-commerce is one of the genuine exceptions. The Third Schedule to the Digital Personal Data Protection Rules, 2025 names \"e-commerce entity\" as a class with its own erasure clock, triggered at two crore registered users in India. And the Act's drafters reached for an online marketplace three separate times when they needed an illustration - for pre-commencement consent under section 5, for withdrawal under section 6(6), and for erasure under section 8(7). Those illustrations are part of the Act. They are the closest thing you have to the legislature telling you how it expects your sector to behave.",
      "The practical consequence is that an e-commerce compliance programme is mostly about two things the rest of the Act treats as edge cases: what happens when a customer withdraws consent in the middle of a transaction, and when a dormant account has to be erased.",
    ],
    thresholds: [
      { value: "2 crore", label: "registered users in India", ref: "Third Schedule" },
      { value: "3 years", label: "since last approach, then erase", ref: "rule 8(1)" },
      { value: "48 hours", label: "notice before erasure", ref: "rule 8(2)" },
    ],
    activities: [
      {
        name: "Fulfil an order",
        purpose: "Complete the purchase the customer has already paid for",
        data: ["Name", "Delivery address", "Phone", "Payment reference", "Order contents"],
        flow: [
          {
            actor: "Checkout form",
            does: "Collects the delivery and contact details",
            ref: "§ 5",
            risk: "Notice bundled into terms of service rather than given at the point of collection",
          },
          {
            actor: "Order service",
            does: "Holds the order and its state transitions",
            ref: "§ 8(1)",
            risk: "Withdrawal wired as a global stop, cancelling deliveries the customer paid for",
          },
          {
            actor: "Courier",
            does: "Receives name, address and phone to deliver",
            ref: "§ 8(2)",
            risk: "Onboarded on a commercial contract with no processing terms at all",
          },
          {
            actor: "Payment gateway",
            does: "Processes the transaction and returns a reference",
            ref: "§ 8(2)",
            risk: "Treated as a peer rather than a processor, so no instruction trail exists",
          },
        ],
        ground: {
          ref: "§ 6",
          text: "Consent for the specified purpose. Section 6(6) then does unusual work here: withdrawal stops future processing but does not stop the supply of goods already ordered and paid for.",
        },
        control:
          "Model withdrawal and fulfilment as two independent states. Withdrawal closes future ordering; it must not cancel an in-flight delivery.",
        phase: "foundation",
        evidence:
          "Per-purpose consent records tied to the order, plus the order state transitions showing what continued after withdrawal and why.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase when the purpose is served, unless another law requires retention. Tax and company law do impose invoice retention; those periods come from statutes outside this Act, so confirm them against those statutes rather than assuming a number.",
        },
      },
      {
        name: "Market to past customers",
        purpose: "Promote further purchases to someone who has bought before",
        data: ["Email", "Phone", "Purchase history", "Browsing and click behaviour"],
        flow: [
          {
            actor: "Order service",
            does: "Exports the customer list and purchase history",
            risk: "Purchase data reused for marketing on the consent given for fulfilment",
          },
          {
            actor: "Marketing platform",
            does: "Segments and schedules campaigns",
            ref: "§ 8(2)",
            risk: "Segments built from behavioural data nobody consented to being profiled on",
          },
          {
            actor: "Email and SMS vendor",
            does: "Delivers the message",
            ref: "§ 8(2)",
            risk: "Suppression list not propagated, so withdrawal is honoured in one channel only",
          },
        ],
        ground: {
          ref: "§ 6",
          text: "A separate consent from the one that supports fulfilment. Consent must be free, specific and informed, so bundling marketing into checkout does not produce it.",
        },
        control:
          "A distinct opt-in for marketing, and withdrawal that is as easy as giving it was. Section 6(4) makes that comparability explicit rather than aspirational.",
        phase: "foundation",
        evidence:
          "Consent records showing purpose, timestamp and the exact wording shown, plus suppression propagating to every channel within a stated window.",
        retention: {
          ref: "§ 8(7)",
          text: "On withdrawal, cease and cause processors to cease, then erase. There is no marketing-specific carve-out.",
        },
      },
      {
        name: "Hold a dormant account",
        purpose:
          "None, once the customer stops returning. This is exactly the case the Third Schedule was written for.",
        data: ["Profile", "Saved addresses", "Order history", "Saved payment tokens"],
        flow: [
          {
            actor: "Account store",
            does: "Retains the profile indefinitely by default",
            ref: "Third Schedule",
            risk: "No last-approached timestamp, so the erasure date cannot be computed at all",
          },
          {
            actor: "Erasure job",
            does: "Computes the due date and erases",
            ref: "rule 8(1)",
            risk: "Runs on account creation date instead of last approach, erasing active customers",
          },
          {
            actor: "Notice job",
            does: "Warns the Data Principal before the period completes",
            ref: "rule 8(2)",
            risk: "Fires late, or does not cancel when the customer returns",
          },
        ],
        ground: {
          ref: "§ 8(7)",
          text: "Once the specified purpose is no longer being served there is no basis to keep holding it, whatever the user count. The Third Schedule adds a hard clock on top for large e-commerce entities.",
        },
        control:
          "Record last approach and last exercise of a right as first-class events, then drive a scheduled erasure and a forty-eight-hour notice from them.",
        phase: "operationalise",
        evidence:
          "Erasure job logs showing the computed date per Data Principal, the notice sent, and any reset caused by the customer returning.",
        retention: {
          ref: "Third Schedule",
          text: "Three years after the Data Principal last approached you or exercised a right, or three years from the rule's commencement, whichever is latest, at two crore or more registered users in India.",
        },
      },
      {
        name: "Answer a rights request",
        purpose: "Discharge the duties Chapter III places on you",
        data: ["Whatever the Data Principal asks about, across every system"],
        flow: [
          {
            actor: "Published contact",
            does: "Receives the request",
            ref: "§ 8(9)",
            risk: "No published contact, so requests arrive through support and are never recognised as rights requests",
          },
          {
            actor: "Identity check",
            does: "Confirms the requester is the Data Principal",
            risk: "Either too weak to be safe, or so heavy it becomes a barrier to the right",
          },
          {
            actor: "Systems sweep",
            does: "Finds the data across order, marketing and analytics stores",
            ref: "§ 11",
            risk: "Analytics and warehouse copies missed, so the summary given is incomplete",
          },
        ],
        ground: {
          ref: "§ 11",
          text: "The right to access information about processing, with correction and erasure under section 12 and grievance redressal under section 13.",
        },
        control:
          "One intake channel that is published, and a documented sweep list naming every store that can hold personal data.",
        phase: "governance",
        evidence:
          "A request log with received, identified, answered timestamps, and the sweep list itself under version control.",
        retention: {
          ref: "§ 8(7)",
          text: "The request record is its own processing activity. Keep what proves you complied, and no more.",
        },
      },
    ],
    provisions: [
      {
        ref: "Third Schedule",
        title: "Three years, at two crore users",
        body: "Rule 8(1) requires an e-commerce entity with two crore or more registered users in India to erase personal data three years after the Data Principal last approached it for the specified purpose or last exercised a right - or three years from the rule's commencement, whichever is latest. Retention required by another law survives this. Below the threshold the class rule does not bite, but section 8(7) still does.",
      },
      {
        ref: "Rule 8(2)",
        title: "Forty-eight hours' warning",
        body: "Before that period completes, the Data Principal must be told - at least forty-eight hours in advance - unless she comes back or exercises a right in the meantime, which resets the clock. This is an outbound notification duty with a hard deadline, so it is a system to build, not a policy to write.",
      },
      {
        ref: "§ 6(6)",
        title: "Withdrawal does not cancel the order",
        body: "The Act's own illustration: X consents, places an order and pays. If X withdraws consent, Y may stop letting her use the app to place orders - but may not stop processing for the supply of goods already ordered and paid for. Withdrawal is not a kill switch on an in-flight transaction, and building it as one would break the contract you owe the customer.",
      },
      {
        ref: "§ 8(7)",
        title: "Purpose served means erase",
        body: "Illustration (I) to section 8(7): X registers on a marketplace to sell her used car, the sale concludes, and Y shall no longer retain her personal data. This bites regardless of user count and regardless of the Third Schedule. Purpose exhaustion is the general rule; the Schedule is a backstop for accounts that never formally end.",
      },
    ],
    actions: [
      {
        title: "Find out whether you cross two crore",
        body: "\"Registered users in India\" is a number your growth team already reports. Establish who owns it, how it is counted, and what happens the quarter it crosses - the obligation arrives with the threshold, not with a notification.",
      },
      {
        title: "Instrument \"last approached\"",
        body: "The three-year clock runs from the Data Principal's last approach or exercise of a right. If your systems record only account-creation and last-login, you cannot compute the date the rule turns on. Add the event, then backfill what you can.",
      },
      {
        title: "Separate consent withdrawal from order fulfilment",
        body: "Model them as two different states. Withdrawal stops future processing for the consented purpose; it does not stop you shipping what has been paid for, and section 6(6) says so explicitly. Most consent tooling gets this wrong by treating withdrawal as a global stop.",
      },
      {
        title: "Build the forty-eight-hour notice as a job, not a policy",
        body: "It has to fire before a computed date, per Data Principal, and be cancellable when she returns. That is a scheduled pipeline with a suppression rule - the kind of thing that is trivial to specify and easy to leave until an audit asks for evidence it ran.",
      },
    ],
    faq: [
      {
        q: "Does the three-year rule apply if we have fewer than two crore users?",
        a: "The Third Schedule class obligation does not. Section 8(7) still does: you must erase when the Data Principal withdraws consent or when it is reasonable to assume the specified purpose is no longer being served, whichever is earlier, unless a law requires retention. In practice the general rule is often the stricter one, because it has no waiting period.",
      },
      {
        q: "Can we keep order history for accounting after erasure is due?",
        a: "Section 8(7) opens with \"unless retention is necessary for compliance with any law for the time being in force\". Tax and company law retention requirements sit inside that carve-out. The discipline is to retain the records the law names, for the period it names, and not to treat one statutory retention duty as a licence to keep the whole customer profile.",
      },
      {
        q: "Are marketplace sellers Data Fiduciaries too?",
        a: "It depends on who determines the purpose and means of processing, which is the test in the definition of Data Fiduciary. A seller who receives buyer data and decides for itself what to do with it is making that determination. A seller who only processes on the marketplace's instructions looks like a Data Processor, and section 8(2) then requires a valid contract between them.",
      },
    ],
    related: [
      {
        href: routes.obligations,
        label: "The eleven obligations",
        note: "What every Data Fiduciary owes, before any sector rule",
      },
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "All seven Schedules and the phased commencement dates",
      },
      {
        href: routes.sdf,
        label: "Significant Data Fiduciary",
        note: "The threshold above the threshold",
      },
    ],
  },

  "online-gaming": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for Online Gaming: Children and Retention",
    metaDescription:
      "Online gaming under the DPDP Act: the 50 lakh retention threshold, and section 9's outright ban on behavioural monitoring and ads aimed at under-18s.",
    eyebrow: "Third Schedule · § 9",
    heading: "The Lowest Threshold",
    headingAccent: "And The Hardest Section.",
    lede: "Online gaming intermediaries reach the Third Schedule's retention duty at fifty lakh users - a quarter of the trigger for e-commerce and social media. Then section 9 removes two things much of the sector is built on.",
    covers: ["real money gaming", "fantasy sports", "mobile games", "esports platforms"],
    standing: [
      "Two features of the framework land on online gaming harder than on anything else, and they compound.",
      "The first is arithmetic. The Third Schedule names online gaming intermediaries at fifty lakh registered users in India, against two crore for e-commerce and social media. A gaming platform therefore inherits a class-specific erasure duty at one quarter of the scale, which for a growing studio can mean the obligation arrives years earlier than the compliance function does.",
      "The second is section 9, and it is the one that changes product decisions rather than data-retention policy. Section 9(3) prohibits tracking, behavioural monitoring of children and targeted advertising directed at children - flatly, with no consent override. A parent cannot authorise it. Section 9(1) requires verifiable parental consent before processing a child's personal data at all, and section 9(2) prohibits processing likely to cause a detrimental effect on a child's well-being. Under the Act a child is anyone under eighteen, which is a materially different population from the thirteen-plus most global platforms are architected around.",
      "There is a route out, and it is narrow. Section 9(5) lets the Central Government notify a higher exempt age for a specific Data Fiduciary that has satisfied it the processing is verifiably safe. That is a per-operator notification, not a class exemption, and it has to be earned before it can be relied on.",
    ],
    thresholds: [
      {
        value: "50 lakh",
        label: "registered users in India",
        ref: "Third Schedule"
      },
      {
        value: "18",
        label: "age below which a player is a child",
        ref: "§ 2(f)"
      },
      {
        value: "0",
        label: "consent that can unlock § 9(3)",
        ref: "§ 9(3)"
      }
    ],
    activities: [
      {
        name: "Register a player",
        purpose: "Create an account and establish whether the player is a child",
        data: [
          "Username",
          "Email or phone",
          "Date of birth",
          "Device identifier"
        ],
        flow: [
          {
            actor: "Signup form",
            does: "Collects the account details",
            ref: "§ 5",
            risk: "Notice written for an adult reader that a fourteen-year-old cannot act on"
          },
          {
            actor: "Age assurance",
            does: "Establishes whether the player is under eighteen",
            ref: "§ 9(1)",
            risk: "A self-declared birth date, which is an age gate rather than assurance"
          },
          {
            actor: "Parent verification",
            does: "Obtains verifiable parental consent where the player is a child",
            ref: "§ 9(1)",
            risk: "Treated as a checkbox the child ticks on the parent's behalf"
          },
          {
            actor: "Account store",
            does: "Holds the account and its age status",
            risk: "Age captured once and never revisited, so a player who turns eighteen keeps child restrictions and a wrong entry is never corrected"
          }
        ],
        ground: {
          ref: "§ 9(1)",
          text: "For a child, verifiable parental consent before any processing. For an adult, ordinary consent under section 6. Which one applies is decided by the age step, so nothing downstream is safe until that step is right."
        },
        control: "Put age assurance at the front of the funnel, before any gameplay telemetry is collected, and make the result a property of the session rather than an editable profile field.",
        phase: "foundation",
        evidence: "The parental consent record, the method used to verify it, and the age status attached to each session.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase when the account closes and the purpose is served, subject to the Third Schedule clock for lapsed accounts."
        }
      },
      {
        name: "Run a game session",
        purpose: "Operate the game and keep it fair and functional",
        data: [
          "Session events",
          "Progression",
          "Latency and device telemetry",
          "Chat"
        ],
        flow: [
          {
            actor: "Game client",
            does: "Emits session and progression events",
            risk: "The same event stream emitted for adults and children alike"
          },
          {
            actor: "Telemetry pipeline",
            does: "Aggregates behaviour for balancing and anti-cheat",
            ref: "§ 9(3)",
            risk: "Behavioural profiling of children, which no consent can authorise"
          },
          {
            actor: "Analytics warehouse",
            does: "Retains per-player behavioural history",
            ref: "§ 9(3)",
            risk: "Child sessions indistinguishable from adult ones once they land in the warehouse"
          }
        ],
        ground: {
          ref: "§ 9(3)",
          text: "For children this is not a consent question. Tracking and behavioural monitoring are prohibited outright, so the question is what a child's session may emit at all, not what has been agreed."
        },
        control: "Decide per event whether it is necessary to operate the game or whether it builds a behavioural profile, and stop the second category at the client for child sessions rather than filtering it downstream.",
        phase: "operationalise",
        evidence: "An event inventory marking each event as operational or behavioural, and proof that behavioural events are absent from child sessions.",
        retention: {
          ref: "§ 8(7)",
          text: "Operational telemetry loses its purpose quickly. Set a period tied to that purpose rather than keeping it because storage is cheap."
        }
      },
      {
        name: "Monetise the game",
        purpose: "Sell items and show advertising",
        data: [
          "Purchase history",
          "In-game behaviour",
          "Advertising identifiers"
        ],
        flow: [
          {
            actor: "Offer engine",
            does: "Chooses which items to surface and when",
            ref: "§ 9(3)",
            risk: "Offers timed against a child's engagement pattern, which is behavioural monitoring put to commercial use"
          },
          {
            actor: "Ad mediation",
            does: "Selects and serves advertising",
            ref: "§ 9(3)",
            risk: "Targeted advertising reaching a child through a partner you did not directly configure"
          },
          {
            actor: "Payment processor",
            does: "Takes payment",
            ref: "§ 8(2)",
            risk: "Engaged without a processing contract"
          }
        ],
        ground: {
          ref: "§ 9(3)",
          text: "Targeted advertising directed at children is prohibited. For adult players ordinary consent applies, so monetisation has to be able to tell the two populations apart."
        },
        control: "Contextual-only inventory for under-eighteen sessions, verified across every mediation partner rather than assumed from a flag you pass downstream.",
        phase: "operationalise",
        evidence: "Mediation configuration per age band, and a test that a child session never receives a targeted creative.",
        retention: {
          ref: "§ 8(7)",
          text: "Purchase records may be required by tax or consumer law; those periods sit outside this Act and should be confirmed against those statutes."
        }
      },
      {
        name: "Hold a lapsed account",
        purpose: "None, once the player stops returning",
        data: [
          "Profile",
          "Progression",
          "Purchase history",
          "Chat history"
        ],
        flow: [
          {
            actor: "Account store",
            does: "Retains the account indefinitely by default",
            ref: "Third Schedule",
            risk: "No last-approached timestamp, so the erasure date cannot be computed"
          },
          {
            actor: "Erasure job",
            does: "Computes the due date and erases",
            ref: "rule 8(1)",
            risk: "Fifty lakh users arrives on one successful title, before anyone has built this"
          },
          {
            actor: "Notice job",
            does: "Warns before the period completes",
            ref: "rule 8(2)",
            risk: "Sent to a child's account rather than the parent who gave consent"
          }
        ],
        ground: {
          ref: "§ 8(7)",
          text: "No purpose survives a player who has stopped playing. The Third Schedule then adds a hard clock at fifty lakh registered users, the lowest of the three named classes."
        },
        control: "Record last approach as a first-class event from launch, because the threshold is reachable on a single hit title.",
        phase: "operationalise",
        evidence: "Erasure job logs with the computed date per player and the notice actually sent.",
        retention: {
          ref: "Third Schedule",
          text: "Three years after last approach or exercise of a right, at fifty lakh or more registered users in India."
        }
      }
    ],
    provisions: [
      {
        ref: "Third Schedule",
        title: "Fifty lakh registered users",
        body: "Rule 8(1) sets the online gaming intermediary threshold at fifty lakh registered users in India - the lowest of the three named classes. Above it, personal data must be erased three years after the Data Principal last approached the platform or exercised a right, unless a law requires retention, with forty-eight hours' notice before the period completes.",
      },
      {
        ref: "§ 9(3)",
        title: "No behavioural monitoring, no targeted ads",
        body: "A Data Fiduciary shall not undertake tracking or behavioural monitoring of children, or targeted advertising directed at children. There is no consent gate on this - it is a prohibition, not a permission that can be unlocked. For a sector that monetises engagement telemetry and personalises offers, this is a design constraint rather than a compliance control.",
      },
      {
        ref: "§ 9(1)",
        title: "Verifiable parental consent, under eighteen",
        body: "Before processing any personal data of a child, or of a person with a disability who has a lawful guardian, the Data Fiduciary must obtain verifiable consent of the parent or guardian in the manner prescribed. Rule 10 prescribes that manner. The Act's definition of child is anyone who has not completed eighteen years.",
      },
      {
        ref: "§ 9(5)",
        title: "The verifiably safe route",
        body: "If the Central Government is satisfied that a Data Fiduciary processes children's data in a verifiably safe manner, it may notify an age above which that Data Fiduciary is exempt from some or all of the section 9(1) and 9(3) obligations. It is granted to a named operator on evidence, and until it is granted the full obligation applies.",
      },
    ],
    actions: [
      {
        title: "Establish age before you establish anything else",
        body: "Every other decision on this page depends on knowing whether a player is under eighteen. Age assurance has to sit at the front of the funnel, not as a profile field a player can edit later, because a wrong answer retrospectively invalidates the consent you relied on.",
      },
      {
        title: "Audit telemetry against section 9(3), not against consent",
        body: "The usual compliance question is \"do we have consent for this?\". Here the question is \"does this constitute tracking or behavioural monitoring of a child?\" - because if it does, consent is irrelevant. Inventory every event you collect and every model you feed, then decide what a minor's session may emit at all.",
      },
      {
        title: "Split the ad stack by age",
        body: "Targeted advertising directed at children is prohibited outright. If your monetisation cannot distinguish a minor's session, it cannot comply - so contextual-only inventory for under-eighteens is usually the smallest change that works, and it needs to hold across your mediation partners too.",
      },
      {
        title: "Plan the fifty-lakh crossing early",
        body: "Retention duties and the forty-eight-hour notice job arrive at fifty lakh registered users. That is reachable on a single successful title, so the engineering should exist before the marketing does.",
      },
    ],
    faq: [
      {
        q: "Is a child under the DPDP Act anyone under 18?",
        a: "Yes. The Act defines a child as an individual who has not completed eighteen years of age. This is higher than the thirteen-plus threshold most international platforms are built to, and it is the single assumption most likely to be wrong in a codebase ported from a COPPA or GDPR design.",
      },
      {
        q: "Can a parent consent to behavioural monitoring of their child?",
        a: "No. Section 9(1) and section 9(3) do different work. Section 9(1) makes parental consent the gateway to processing a child's data at all. Section 9(3) is a prohibition on specific activities, and it is not drafted as a default that consent can displace. The only route to relief is a section 9(5) notification, granted by the Central Government to a specific Data Fiduciary.",
      },
      {
        q: "Do the children's rules apply to us if we do not target children?",
        a: "The obligations attach to processing a child's personal data, not to whether children are your intended audience. If under-eighteens are in fact using the service, the duties engage. That is why age assurance, rather than a terms-of-service age limit, is the operative control.",
      },
    ],
    related: [
      {
        href: routes.rights,
        label: "Rights and duties",
        note: "Chapter III, including how children's rights are exercised",
      },
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "Rule 10 on verifiable parental consent",
      },
      {
        href: routes.penalties,
        label: "Penalties",
        note: "Breach of children's obligations carries its own entry",
      },
    ],
  },

  "social-media": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for Social Media Intermediaries",
    metaDescription:
      "Social media under the DPDP Act: the retention duty at 2 crore users, and how narrow the carve-out for data a user publishes herself really is.",
    eyebrow: "Third Schedule · § 3(c)(ii)",
    heading: "The One Carve-Out",
    headingAccent: "Written For You.",
    lede: "Social media intermediaries are a named Third Schedule class. They are also the beneficiary of the Act's most consequential exclusion - and its illustration is about a blogger posting to social media.",
    covers: ["social networks", "content platforms", "community apps", "creator platforms"],
    standing: [
      "Section 3 sets the Act's territorial and material scope, and clause (c)(ii) takes out of it personal data that a Data Principal makes publicly available herself. The illustration is unusually direct: X, an individual, while blogging her views, has publicly made available her personal data on social media; in such case the provisions of the Act shall not apply.",
      "This matters enormously and it is routinely over-read. What falls outside the Act is the personal data the Data Principal herself made public. It is not a general exemption for platforms, and it does not reach the account data, the device and behavioural data, the private messages, or the inferences the platform derives - none of which the user published. A platform's obligations under Chapters II and III are largely untouched. What the carve-out does resolve is the awkward question of whether a public post is itself regulated personal data, and the answer is no.",
      "Alongside that sits the Third Schedule, which names social media intermediaries at two crore registered users in India with the same three-year erasure clock as e-commerce, and section 9, which prohibits behavioural monitoring of and targeted advertising to anyone under eighteen. For a platform whose ranking and advertising systems are built on behavioural signal, section 9(3) is the provision with real product consequences.",
    ],
    thresholds: [
      {
        value: "2 crore",
        label: "registered users in India",
        ref: "Third Schedule"
      },
      {
        value: "3 years",
        label: "since last approach, then erase",
        ref: "rule 8(1)"
      },
      {
        value: "18",
        label: "age below which ranking on behaviour is prohibited",
        ref: "§ 9(3)"
      }
    ],
    activities: [
      {
        name: "Publish what a user posts",
        purpose: "Show the user's own content to the audience she chose",
        data: [
          "Post text and media",
          "Profile shown alongside it",
          "Audience setting"
        ],
        flow: [
          {
            actor: "Composer",
            does: "Takes the post and its audience setting",
            ref: "§ 3",
            risk: "Public and private posts handled by one code path, so the carve-out is applied to both"
          },
          {
            actor: "Content store",
            does: "Holds the post",
            ref: "§ 3",
            risk: "The whole record treated as out of scope because part of it was published"
          },
          {
            actor: "Distribution",
            does: "Serves it to the chosen audience",
            risk: "Audience setting changed later without the earlier distribution being reconsidered"
          }
        ],
        ground: {
          ref: "§ 3",
          text: "Section 3(c)(ii) puts personal data the Data Principal makes publicly available herself outside the Act entirely. The illustration is a blogger posting to social media. It is narrow: it covers what she published, not what you observed about her."
        },
        control: "Classify the published content separately from everything else you hold. Account metadata, engagement signals, private messages and inferences stay fully in scope.",
        phase: "foundation",
        evidence: "A data map that draws the line explicitly, and shows which stores sit on which side of it.",
        retention: {
          ref: "§ 3",
          text: "The published content is outside the Act. Everything around it follows section 8(7) as normal."
        }
      },
      {
        name: "Rank the feed",
        purpose: "Decide what each user sees and in what order",
        data: [
          "Dwell time",
          "Taps and scrolls",
          "Follow graph",
          "Inferred interests"
        ],
        flow: [
          {
            actor: "Client",
            does: "Emits engagement signals",
            ref: "§ 9(3)",
            risk: "The same signals emitted whether the account belongs to an adult or a fifteen-year-old"
          },
          {
            actor: "Ranking service",
            does: "Builds a per-user behavioural profile",
            ref: "§ 9(3)",
            risk: "For a child this is behavioural monitoring, and no consent makes it lawful"
          },
          {
            actor: "Model training",
            does: "Learns from aggregated behaviour",
            risk: "Child behaviour already inside a trained model, which is far harder to unwind than a database row"
          }
        ],
        ground: {
          ref: "§ 9(3)",
          text: "Ranking on engagement is behavioural monitoring by any ordinary reading. For anyone under eighteen the Act prohibits it outright rather than gating it behind consent."
        },
        control: "Establish what a minor's session may emit at all, and confirm the ranking and recommendation systems still function without it rather than assuming a downstream flag is sufficient.",
        phase: "operationalise",
        evidence: "A signal inventory per age band, and evidence that child sessions are excluded from behavioural model training.",
        retention: {
          ref: "§ 8(7)",
          text: "Behavioural signals serve a purpose that ends; set a period against that purpose."
        }
      },
      {
        name: "Serve advertising",
        purpose: "Monetise attention",
        data: [
          "Inferred interests",
          "Advertising identifiers",
          "Engagement history"
        ],
        flow: [
          {
            actor: "Ad targeting",
            does: "Selects an audience segment",
            ref: "§ 9(3)",
            risk: "A segment that a child's account can fall into"
          },
          {
            actor: "Ad exchange",
            does: "Auctions the impression",
            ref: "§ 8(2)",
            risk: "Data shared with bidders under no processing contract"
          },
          {
            actor: "Measurement",
            does: "Attributes the outcome back to the user",
            risk: "Attribution rebuilding the behavioural profile the ranking controls were meant to prevent"
          }
        ],
        ground: {
          ref: "§ 9(3)",
          text: "Targeted advertising directed at children is prohibited. For adults, consent under section 6 applies and must be specific enough to cover the profiling involved."
        },
        control: "Contextual-only inventory for under-eighteen accounts, enforced at the exchange boundary rather than in your own stack alone.",
        phase: "operationalise",
        evidence: "Exchange configuration per age band, and a bid-request sample showing no behavioural attributes for child accounts.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase on withdrawal and cause processors and downstream bidders to do the same."
        }
      },
      {
        name: "Hold a lapsed account",
        purpose: "None, once the user stops returning",
        data: [
          "Profile",
          "Posts",
          "Message history",
          "Behavioural history"
        ],
        flow: [
          {
            actor: "Account store",
            does: "Retains indefinitely by default",
            ref: "Third Schedule",
            risk: "Passive impressions counted as approach, so the clock never starts"
          },
          {
            actor: "Erasure job",
            does: "Computes the due date and erases",
            ref: "rule 8(1)",
            risk: "Published content and observed data erased together, or neither"
          },
          {
            actor: "Notice job",
            does: "Warns before the period completes",
            ref: "rule 8(2)",
            risk: "Sent to an email the user abandoned with the account"
          }
        ],
        ground: {
          ref: "§ 8(7)",
          text: "Once no purpose is served there is no basis to keep holding it. The Third Schedule adds a three-year clock at two crore registered users."
        },
        control: "Define which interactions count as approach and log them deliberately. A passive impression is not the user approaching you.",
        phase: "operationalise",
        evidence: "The definition of approach under version control, plus erasure job logs.",
        retention: {
          ref: "Third Schedule",
          text: "Three years after last approach or exercise of a right, at two crore or more registered users in India."
        }
      }
    ],
    provisions: [
      {
        ref: "§ 3(c)(ii)",
        title: "Data the user made public herself",
        body: "The Act does not apply to personal data that the Data Principal makes publicly available herself, or that another person is under a legal obligation to make public. The illustration is a blogger publishing her views on social media. The exclusion is about the act of publication by the Data Principal - not about the platform, and not about everything the platform holds on her.",
      },
      {
        ref: "Third Schedule",
        title: "Two crore registered users",
        body: "Rule 8(1) names social media intermediaries alongside e-commerce entities at two crore or more registered users in India. Personal data must be erased three years after the Data Principal last approached the platform or exercised a right, with forty-eight hours' notice beforehand, unless retention is required by law.",
      },
      {
        ref: "§ 9(3)",
        title: "No behavioural monitoring of minors",
        body: "Tracking, behavioural monitoring of children and targeted advertising directed at children are prohibited outright, with no consent override. Under the Act a child is anyone under eighteen. A feed ranked on engagement telemetry is doing behavioural monitoring, whatever it is called internally.",
      },
      {
        ref: "§ 10",
        title: "You are a likely Significant Data Fiduciary",
        body: "The Central Government may notify a Data Fiduciary as Significant having regard to the volume and sensitivity of personal data processed and the risk to Data Principals' rights, among other factors. A platform at Third Schedule scale is squarely within the profile, which brings a Data Protection Officer in India, independent audit and Data Protection Impact Assessments.",
      },
    ],
    actions: [
      {
        title: "Draw the line around the carve-out precisely",
        body: "Classify what a user published herself and treat only that as out of scope. Account metadata, engagement telemetry, device signals, private messages and derived inferences stay in scope. A blanket \"public platform, therefore exempt\" reading is the failure mode here, and it is not what section 3(c)(ii) says.",
      },
      {
        title: "Test whether your ranking counts as behavioural monitoring",
        body: "For under-eighteens the question is not consent, it is permissibility. Establish what signals a minor's session may generate at all, and confirm your recommendation and advertising systems can operate without them rather than assuming a flag downstream will do.",
      },
      {
        title: "Prepare for the Significant Data Fiduciary designation",
        body: "The DPO, the independent auditor and the DPIA cadence take months to stand up and cannot be produced on notification. Building them before designation also produces the evidence that the designation was handled competently.",
      },
      {
        title: "Instrument last approach for the erasure clock",
        body: "Three years from last approach or exercise of a right is computable only if you record those events. Passive impressions are not an approach; establish which interactions reset the clock and log them deliberately.",
      },
    ],
    faq: [
      {
        q: "Does the DPDP Act apply to public posts?",
        a: "Not to the personal data the Data Principal made public herself - section 3(c)(ii) excludes it, and the illustration is a blogger posting to social media. It is a narrow exclusion. Everything else the platform holds about that user, including data about how she behaves on the service, remains fully in scope.",
      },
      {
        q: "Is a social media intermediary automatically a Significant Data Fiduciary?",
        a: "No. The designation is made by the Central Government under section 10, having regard to factors including the volume and sensitivity of personal data processed and the risk to the rights of Data Principals. Scale makes it likely, not automatic, and the obligations attach on notification.",
      },
      {
        q: "How does the Act interact with the IT Rules for intermediaries?",
        a: "Section 38(1) provides that the Act is in addition to and not in derogation of any other law in force. Intermediary obligations under the Information Technology Act and its rules continue to apply on their own terms. Where both bite, you satisfy both; the DPDP Act does not displace them.",
      },
    ],
    related: [
      {
        href: routes.sdf,
        label: "Significant Data Fiduciary",
        note: "DPO, audit and DPIA once you are notified",
      },
      {
        href: routes.roles,
        label: "Key roles explained",
        note: "Fiduciary, Processor, Principal and Consent Manager",
      },
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "Third Schedule thresholds in context",
      },
    ],
  },

  "healthcare": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for Healthcare and Hospitals in India",
    metaDescription:
      "Healthcare under the DPDP Act: the Fourth Schedule exemption for clinical care, why health data lost its special category, and what still binds you.",
    eyebrow: "Fourth Schedule · § 38(1)",
    heading: "Health Data Lost",
    headingAccent: "Its Special Status.",
    lede: "The SPDI Rules singled out medical records and physical and mental health condition for heightened protection. The DPDP Act abandons the category entirely - and then carves healthcare out of the children's provisions so that consent cannot gate a child's treatment.",
    covers: ["hospitals", "clinics", "diagnostic labs", "telemedicine", "pharmacies", "mental health services"],
    standing: [
      "Two changes define healthcare's position, and they pull in opposite directions.",
      "The first is a reduction in sector-specific treatment. Under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, physical and mental health condition and medical records were sensitive personal data, attracting a heavier standard than ordinary personal information. The DPDP Act abandons that category. It regulates all digital personal data at a single standard, and a hospital's obligations in respect of a diagnosis are, on the face of the Act, the obligations it has in respect of a phone number. This surprises people, and it is genuinely what the statute does.",
      "The second runs the other way, and it exists because the first would otherwise be dangerous. Section 9(1) requires verifiable parental consent before processing a child's personal data. Applied literally to a hospital, that would make parental consent a precondition of treating a child - including a child brought in unconscious, and including a sixteen-year-old seeking mental health support. Section 9(4) anticipated the problem by allowing classes and purposes to be prescribed as exempt, and rule 12 with the Fourth Schedule does exactly that: Part A begins with clinical establishments, mental health establishments and healthcare professionals, where the processing is restricted to providing health services to the child.",
      "Add section 38(1) - the Act is in addition to and not in derogation of any other law - and the shape becomes clear. Clinical establishment law, medical records retention, professional confidentiality obligations and the digital health frameworks all survive untouched. The DPDP Act is a new layer, not a replacement.",
    ],
    thresholds: [
      {
        value: "Part A",
        label: "Fourth Schedule classes exempt from § 9(1) and 9(3)",
        ref: "rule 12"
      },
      {
        value: "18",
        label: "age below which § 9 engages",
        ref: "§ 2(f)"
      },
      {
        value: "None",
        label: "special category for health data",
        ref: "§ 3"
      }
    ],
    activities: [
      {
        name: "Treat a patient",
        purpose: "Provide health services to the person in front of you",
        data: [
          "Name and contact",
          "Presenting complaint",
          "Diagnosis",
          "Prescriptions",
          "Next of kin"
        ],
        flow: [
          {
            actor: "Reception",
            does: "Registers the patient",
            ref: "§ 5",
            risk: "Consent forms used as the basis for treatment, creating a right to withdraw that you cannot honour mid-care"
          },
          {
            actor: "Clinician",
            does: "Records history, diagnosis and plan",
            ref: "§ 7",
            risk: "Section 7 legitimate uses never mapped, so everything is grounded in consent by default"
          },
          {
            actor: "Clinical record",
            does: "Stores the encounter",
            ref: "§ 38(1)",
            risk: "Clinical records law treated as displaced by the Act rather than surviving alongside it"
          },
          {
            actor: "Lab or imaging",
            does: "Receives the order and returns results",
            ref: "§ 8(2)",
            risk: "Referral partners engaged with no processing terms"
          }
        ],
        ground: {
          ref: "§ 7",
          text: "Certain legitimate uses, not consent. Section 7 covers responding to a medical emergency involving a threat to life or an immediate threat to health, and taking measures during an epidemic or outbreak. Consent is a poor basis for care a patient cannot meaningfully decline."
        },
        control: "Map each processing purpose to a basis that is not consent wherever the law already supplies one, and reserve consent for what a patient can genuinely refuse.",
        phase: "foundation",
        evidence: "A purpose-to-basis map per record type, and the clinical policy that implements it.",
        retention: {
          ref: "§ 38(1)",
          text: "Clinical establishment rules and professional obligations set the periods, and section 8(7) carves out retention required by law. Those periods come from statutes outside this Act; confirm them there rather than assuming a number."
        }
      },
      {
        name: "Treat a child",
        purpose: "Provide health services to a patient under eighteen",
        data: [
          "The child's clinical data",
          "Parent or guardian contact"
        ],
        flow: [
          {
            actor: "Reception",
            does: "Identifies the patient as a child",
            ref: "§ 9(1)",
            risk: "Parental consent treated as a precondition of care, which would gate an emergency"
          },
          {
            actor: "Clinician",
            does: "Delivers care",
            ref: "rule 12",
            risk: "The Fourth Schedule exemption assumed to cover everything the hospital does with the child's data"
          },
          {
            actor: "Clinical record",
            does: "Stores the encounter",
            risk: "Child records flowing into feedback, marketing or research systems where the exemption does not reach"
          }
        ],
        ground: {
          ref: "§ 9(4)",
          text: "Section 9(4) allows classes and purposes to be prescribed as exempt, and rule 12 with Part A of the Fourth Schedule does so - beginning with clinical establishments, mental health establishments and healthcare professionals, where processing is restricted to providing health services to the child."
        },
        control: "Confirm your class against the Schedule text, and treat the exemption as bounded by that purpose. Marketing, engagement analytics and research are not health services to the child.",
        phase: "foundation",
        evidence: "The class determination in writing, and a boundary showing which systems child data may and may not enter.",
        retention: {
          ref: "§ 8(7)",
          text: "As for any patient record, governed by the retention the law requires."
        }
      },
      {
        name: "Communicate with patients",
        purpose: "Appointment reminders, feedback requests and health campaigns",
        data: [
          "Phone",
          "Email",
          "Appointment history",
          "Condition, where campaigns are targeted"
        ],
        flow: [
          {
            actor: "Appointment system",
            does: "Exports the contact list",
            risk: "Clinical data reused for outreach on the basis given for treatment"
          },
          {
            actor: "Messaging vendor",
            does: "Sends the reminder or campaign",
            ref: "§ 8(2)",
            risk: "Health information sent over consumer messaging with no processing contract and no recipient verification"
          },
          {
            actor: "Feedback platform",
            does: "Collects responses",
            ref: "§ 8(2)",
            risk: "A third-party tool holding patient identity outside the clinical estate"
          }
        ],
        ground: {
          ref: "§ 6",
          text: "Outreach beyond care is ordinary processing needing ordinary consent, specific to that purpose. It does not inherit the basis that supports treatment."
        },
        control: "Separate operational reminders from marketing, and keep condition-derived targeting out of any channel you cannot verify the recipient on.",
        phase: "operationalise",
        evidence: "Separate consent records for outreach, and a vendor register with processing terms for each.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase on withdrawal. Ancillary systems, not the medical record, are usually where retention quietly becomes indefinite."
        }
      },
      {
        name: "Answer a rights request",
        purpose: "Discharge Chapter III duties",
        data: [
          "Whatever the patient asks about, across clinical and ancillary systems"
        ],
        flow: [
          {
            actor: "Published contact",
            does: "Receives the request",
            ref: "§ 8(9)",
            risk: "No published contact, so requests arrive at a ward and stop there"
          },
          {
            actor: "Identity check",
            does: "Confirms the requester",
            risk: "Records released to a family member who is not the Data Principal or a lawful guardian"
          },
          {
            actor: "Systems sweep",
            does: "Finds the data",
            ref: "§ 11",
            risk: "Ancillary systems missed, so the response describes the medical record only"
          }
        ],
        ground: {
          ref: "§ 11",
          text: "Access to a summary of what is processed and with whom it has been shared, with correction and erasure under section 12."
        },
        control: "One published channel, an identity standard proportionate to the sensitivity, and a sweep list naming every system including the ancillary ones.",
        phase: "governance",
        evidence: "Request log with timestamps, and the sweep list under version control.",
        retention: {
          ref: "§ 8(7)",
          text: "Keep what proves compliance, no more."
        }
      }
    ],
    provisions: [
      {
        ref: "Fourth Schedule",
        title: "Section 9 switched off for clinical care",
        body: "Rule 12 with Part A of the Fourth Schedule exempts defined classes of Data Fiduciary from sections 9(1) and 9(3) - beginning with clinical establishments, mental health establishments and healthcare professionals, where processing is restricted to providing health services to the child. Part B lists exempt purposes. Check the Schedule for your exact class rather than assuming the exemption reaches all of your processing.",
      },
      {
        ref: "§ 38(1)",
        title: "Existing medical law survives intact",
        body: "The provisions of this Act shall be in addition to and not in derogation of any other law for the time being in force. Records retention under clinical establishment rules, professional confidentiality duties and sectoral digital health requirements continue to apply. Where a retention period conflicts with an erasure duty, section 8(7)'s \"unless retention is necessary for compliance with any law\" is the reconciling clause.",
      },
      {
        ref: "No sensitive category",
        title: "One standard for all personal data",
        body: "The Act contains no equivalent of the SPDI Rules' sensitive personal data list. Health condition and medical records are personal data, protected at the same standard as everything else. Practically, the heightened handling that health data deserves now has to be justified as reasonable security safeguards under section 8(5) and as good clinical practice, rather than as a statutory tier.",
      },
      {
        ref: "§ 7",
        title: "Legitimate uses, including medical emergency",
        body: "Section 7 sets out the certain legitimate uses for which personal data may be processed without consent. These include responding to a medical emergency involving a threat to life or an immediate threat to health, and taking measures to provide medical treatment or health services during an epidemic or outbreak of disease. Consent is not the only lawful basis available to a clinician.",
      },
    ],
    actions: [
      {
        title: "Map each processing purpose to a basis that is not consent",
        body: "Treatment, emergency response and statutory records are better grounded in section 7 legitimate uses and in the laws section 38(1) preserves than in consent. Consent that a patient can withdraw is a poor foundation for a clinical record you are legally required to keep, and mapping this properly avoids promising a right you cannot honour.",
      },
      {
        title: "Confirm your class in the Fourth Schedule",
        body: "The exemption is class-and-purpose bound, and it is restricted to providing health services to the child. A hospital's marketing list, patient app engagement analytics and research use are not health services to the child, and section 9 applies to them in full.",
      },
      {
        title: "Reconcile retention schedules before erasure duties bite",
        body: "Set out, per record type, the law that requires retention and for how long. What that exercise does not cover is what section 8(7) requires you to erase. Most hospitals find the gap is in ancillary systems - appointment reminders, feedback platforms, marketing - rather than in the medical record itself.",
      },
      {
        title: "Do not rely on the old sensitive-data tiering",
        body: "If your controls were designed around the SPDI categories, the classification layer no longer maps to the statute. Keep the stronger controls - they are defensible as reasonable security safeguards - but stop describing the legal basis in SPDI terms, because a regulator reading your policy will notice.",
      },
    ],
    faq: [
      {
        q: "Is health data sensitive personal data under the DPDP Act?",
        a: "No. The Act has no sensitive personal data category at all. The SPDI Rules, 2011 did have one, covering medical records and physical and mental health condition, but the DPDP Act regulates all digital personal data at a single standard. Stronger safeguards for health data remain sound practice and are defensible under section 8(5), but they are no longer a separate statutory tier.",
      },
      {
        q: "Do we need parental consent before treating a child?",
        a: "Rule 12 with Part A of the Fourth Schedule exempts clinical establishments, mental health establishments and healthcare professionals from sections 9(1) and 9(3) where the processing is restricted to providing health services to the child. That is what prevents section 9 from gating treatment. The exemption is bounded by that purpose, so processing beyond the provision of health services is not covered.",
      },
      {
        q: "Does the DPDP Act override clinical records retention rules?",
        a: "No. Section 38(1) makes the Act additional to, and not in derogation of, other laws in force. Section 8(7) then carves retention required by law out of the erasure duty. The two provisions read together mean statutory medical records retention continues, and the DPDP erasure obligation applies to what those laws do not require you to keep.",
      },
    ],
    related: [
      {
        href: routes.spdi,
        label: "SPDI Rules vs DPDP",
        note: "What was repealed, and what still binds you",
      },
      {
        href: routes.obligations,
        label: "The eleven obligations",
        note: "Chapter II, including security safeguards",
      },
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "Rule 12 and the Fourth Schedule",
      },
    ],
  },

  "financial-services": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for Banking and Financial Services",
    metaDescription:
      "Banking and NBFCs under the DPDP Act: the section 17(1)(f) defaulter exemption, and why RBI directions survive untouched under section 38(1).",
    eyebrow: "§ 17(1)(f) · § 38(1)",
    heading: "The Act Has A Provision",
    headingAccent: "Just For Lenders.",
    lede: "Financial services is the only sector with an exemption drafted around its own business problem - and the Act illustrates both that exemption and its retention rule with a bank.",
    covers: ["banks", "NBFCs", "fintech", "lending apps", "insurance", "wealth platforms"],
    standing: [
      "Regulated financial institutions arrive at the DPDP Act already carrying more data obligations than almost anyone else: RBI directions on storage and localisation, KYC record-keeping, SEBI and IRDAI requirements, prevention of money laundering rules. The first question is always whether the new statute displaces any of it. Section 38(1) answers plainly - the Act is in addition to and not in derogation of any other law for the time being in force. Nothing is displaced. Where an RBI direction is stricter, it governs; where the Act adds a duty, the duty is added.",
      "What makes this sector distinctive is that the Act then legislates directly for one of its problems. Section 17(1)(f) disapplies Chapter II (except sections 8(1) and 8(5)), Chapter III and section 16 where processing is for ascertaining the financial information, assets and liabilities of a person who has defaulted on payment due on a loan or advance taken from a financial institution - with default and financial institution taking their meanings from the Insolvency and Bankruptcy Code. The illustration is a bank and a borrower who misses an instalment.",
      "That exemption is substantial. Chapter III is the entire rights chapter, so a defaulting borrower's access, correction and erasure rights do not run against recovery-related processing. Section 16 is cross-border transfer restriction. What survives is section 8(1) - the Data Fiduciary remains responsible for compliance - and section 8(5), reasonable security safeguards. The exemption removes process obligations; it does not remove accountability or the duty to keep the data secure.",
      "The Act also uses a bank to illustrate its retention rule. Under section 8(7) illustration (II), X closes her savings account, Y is required by law to maintain client identity records for ten years beyond closure, and because retention is necessary for compliance with law, Y retains the data for that period.",
    ],
    thresholds: [
      {
        value: "10 years",
        label: "client identity records, in the Act's own bank illustration",
        ref: "§ 8(7)"
      },
      {
        value: "§ 17(1)(f)",
        label: "disapplies Chapters II and III for defaulter processing",
        ref: "§ 17(1)(f)"
      },
      {
        value: "₹250 crore",
        label: "maximum penalty for a safeguards failure",
        ref: "Schedule"
      }
    ],
    activities: [
      {
        name: "Onboard a customer",
        purpose: "Open the account and meet identification obligations",
        data: [
          "Identity documents",
          "Address proof",
          "PAN",
          "Photograph",
          "Biometrics where used"
        ],
        flow: [
          {
            actor: "Application",
            does: "Collects the documents",
            ref: "§ 5",
            risk: "Notice presented as a consent form for processing another law already requires"
          },
          {
            actor: "KYC vendor",
            does: "Verifies identity",
            ref: "§ 8(2)",
            risk: "Vendor engaged commercially with no processing contract"
          },
          {
            actor: "Core banking",
            does: "Creates the customer record",
            ref: "§ 38(1)",
            risk: "The Act treated as replacing sectoral obligations rather than adding to them"
          }
        ],
        ground: {
          ref: "§ 38(1)",
          text: "The Act is in addition to and not in derogation of other law. Identification obligations come from those statutes, so consent is the wrong frame for most of onboarding."
        },
        control: "Ground each element in the law that actually requires it, and reserve consent for the processing a customer can decline without being refused the account.",
        phase: "foundation",
        evidence: "A basis map per data element citing the statute, and processing contracts with every verification vendor.",
        retention: {
          ref: "§ 8(7)",
          text: "Retention required by law survives the erasure duty. The Act's own illustration is ten years of client identity records beyond account closure, because a law requires it."
        }
      },
      {
        name: "Service the account",
        purpose: "Operate the account and meet ongoing reporting duties",
        data: [
          "Transactions",
          "Balances",
          "Communications",
          "Device and channel data"
        ],
        flow: [
          {
            actor: "Channels",
            does: "Collect transaction and device data",
            risk: "Digital channel telemetry grouped with regulated transaction data under one vague basis"
          },
          {
            actor: "Core banking",
            does: "Records the transaction",
            ref: "§ 38(1)",
            risk: "Sectoral retention and the Act's erasure duty never reconciled in one register"
          },
          {
            actor: "Reporting",
            does: "Files regulatory returns",
            ref: "§ 7",
            risk: "Regulatory reporting described to customers as something they consented to"
          }
        ],
        ground: {
          ref: "§ 38(1)",
          text: "Most account servicing is required or authorised by other law. Where it is not, section 6 consent applies."
        },
        control: "One retention register covering both regimes, naming per record type the law that requires retention, the period, and what happens after.",
        phase: "operationalise",
        evidence: "The register itself, reviewed on a stated cadence, with the statute cited per row.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase what no law requires you to keep once the purpose is served. The carve-out covers retention that is necessary for compliance, not retention that is merely customary."
        }
      },
      {
        name: "Pursue a defaulter",
        purpose: "Ascertain the financial position of a borrower who has defaulted",
        data: [
          "Loan account",
          "Assets and liabilities",
          "Third-party financial information"
        ],
        flow: [
          {
            actor: "Collections",
            does: "Identifies the default",
            ref: "§ 17(1)(f)",
            risk: "The exemption applied to the customer's whole relationship rather than to recovery"
          },
          {
            actor: "Investigation",
            does: "Ascertains assets and liabilities",
            ref: "§ 17(1)(f)",
            risk: "Default and financial institution read loosely rather than as the Insolvency and Bankruptcy Code defines them"
          },
          {
            actor: "Recovery agents",
            does: "Act on the information",
            ref: "§ 8(2)",
            risk: "Agents outside the exemption's scope handling data as if inside it"
          }
        ],
        ground: {
          ref: "§ 17(1)(f)",
          text: "Chapter II except sections 8(1) and 8(5), Chapter III and section 16 do not apply where processing is for ascertaining the financial information, assets and liabilities of a person who has defaulted on a loan from a financial institution. Default and financial institution take their Insolvency and Bankruptcy Code meanings."
        },
        control: "Scope the exemption to the recovery workflow and keep the rest of that customer's data under the full regime. Section 8(1) responsibility and section 8(5) safeguards survive regardless.",
        phase: "operationalise",
        evidence: "A written scope for the exemption, and access controls that stop recovery data reaching general servicing.",
        retention: {
          ref: "§ 8(5)",
          text: "The exemption removes process duties, not the duty to secure the data. Set a period against the recovery purpose."
        }
      },
      {
        name: "Process across borders",
        purpose: "Use group systems or offshore providers",
        data: [
          "Customer records",
          "Transactions",
          "Support interactions"
        ],
        flow: [
          {
            actor: "Group platform",
            does: "Processes outside India",
            ref: "§ 16",
            risk: "Section 16, rule 12 localisation and RBI directions treated as one rule rather than three"
          },
          {
            actor: "Offshore support",
            does: "Accesses records to resolve tickets",
            ref: "§ 8(2)",
            risk: "Access granted broadly because the contract is intra-group"
          },
          {
            actor: "Analytics",
            does: "Aggregates for group reporting",
            risk: "Payment data leaving India despite a direction that requires it to stay"
          }
        ],
        ground: {
          ref: "§ 16",
          text: "The Central Government may restrict transfer to notified territories. Rule 12 adds localisation of specified personal data for Significant Data Fiduciaries, and RBI directions continue to apply under section 38(1)."
        },
        control: "Confirm which of the three applies to each flow, because they have different scopes and the strictest governs.",
        phase: "governance",
        evidence: "A data flow inventory with the governing rule named per flow.",
        retention: {
          ref: "§ 8(7)",
          text: "Erasure must reach offshore copies, or it has not happened."
        }
      }
    ],
    provisions: [
      {
        ref: "§ 17(1)(f)",
        title: "The defaulter exemption",
        body: "Chapter II (except sections 8(1) and 8(5)), Chapter III and section 16 do not apply where processing is for ascertaining the financial information and assets and liabilities of a person who has defaulted on payment due on a loan or advance taken from a financial institution. \"Default\" and \"financial institution\" carry their Insolvency and Bankruptcy Code meanings, so the scope is defined by another statute and should be read against it.",
      },
      {
        ref: "§ 38(1)",
        title: "RBI and SEBI directions are untouched",
        body: "The Act is in addition to and not in derogation of any other law in force. Storage and localisation directions, KYC record-keeping, PMLA obligations and sectoral audit requirements all continue on their own terms. The compliance question is never \"which one wins\" but \"what does each require\", and the stricter requirement sets the operating standard.",
      },
      {
        ref: "§ 8(7)",
        title: "Ten years, illustrated with a bank",
        body: "Illustration (II) to section 8(7): a customer closes her savings account; the bank is required by law to maintain client identity records for ten years beyond closure; retention is therefore necessary for compliance with law and the bank retains the data. This is the Act confirming that statutory record-keeping defeats the erasure duty - for the records the law names, for the period it names.",
      },
      {
        ref: "§ 10",
        title: "Significant Data Fiduciary is likely",
        body: "Designation under section 10 has regard to the volume and sensitivity of personal data processed, the risk to the rights of Data Principals, the potential impact on the sovereignty and integrity of India, the risk to electoral democracy, security of the State and public order. Large financial institutions sit within that profile, bringing a DPO in India, independent audit, DPIAs and the additional measures in rule 12.",
      },
    ],
    actions: [
      {
        title: "Do not treat section 17(1)(f) as a general exemption",
        body: "It is bounded by purpose - ascertaining financial information, assets and liabilities of a defaulter. Ordinary account servicing, marketing and analytics for the same customer are outside it. Scope the exemption to the recovery workflow and keep the rest of the estate under the full regime.",
      },
      {
        title: "Build one retention register across both regimes",
        body: "Every record type needs the law that requires retention, the period, and what happens after. Section 8(7) erases what no law requires you to keep, and the answer to that question is already implicit in your RBI and PMLA obligations - it just needs writing down in a form that survives an audit.",
      },
      {
        title: "Check localisation against section 16 and the Rules",
        body: "Section 16 lets the Central Government restrict transfer to notified territories, and rule 12 imposes localisation of specified personal data on Significant Data Fiduciaries. Existing RBI payment data directions continue regardless under section 38(1). Confirm which of the three applies to each data flow, because they have different scopes.",
      },
      {
        title: "Give consent a smaller job",
        body: "Much of a bank's processing is required or authorised by other law, or falls within section 7 legitimate uses. Grounding it in consent creates a withdrawal right you cannot honour against a statutory obligation. Map the basis honestly, and reserve consent for processing the customer can genuinely decline.",
      },
    ],
    faq: [
      {
        q: "Does the DPDP Act override RBI data localisation directions?",
        a: "No. Section 38(1) provides that the Act is in addition to and not in derogation of any other law in force. RBI directions continue to apply on their own terms. Section 16 is a separate power for the Central Government to restrict transfers to notified territories, and rule 12 adds localisation duties for Significant Data Fiduciaries. All three can apply to the same institution.",
      },
      {
        q: "Do borrowers lose their rights once they default?",
        a: "For a defined purpose, largely yes. Section 17(1)(f) disapplies Chapter III - the rights chapter - where processing is for ascertaining the financial information, assets and liabilities of a defaulter, with default taking its Insolvency and Bankruptcy Code meaning. The exemption is tied to that purpose. Rights continue to run against the institution's other processing of the same person's data.",
      },
      {
        q: "Can we still delete nothing, given our retention obligations?",
        a: "No. Section 8(7) carves out retention necessary for compliance with law, not retention that is merely convenient or customary. The Act's own bank illustration is precise about this: ten years, because a law requires ten years. Data your statutory obligations do not name still falls under the erasure duty when the purpose is served.",
      },
    ],
    related: [
      {
        href: routes.penalties,
        label: "Penalties",
        note: "Up to ₹250 crore for a security safeguards failure",
      },
      {
        href: routes.sdf,
        label: "Significant Data Fiduciary",
        note: "Rule 12: DPIA, audit and localisation",
      },
      {
        href: routes.obligations,
        label: "The eleven obligations",
        note: "What survives section 17(1)(f)",
      },
    ],
  },

  "edtech": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for EdTech and Educational Institutions",
    metaDescription:
      "EdTech under the DPDP Act: verifiable parental consent under section 9, and the outright ban on behavioural monitoring and ads directed at children.",
    eyebrow: "§ 9 · rule 10",
    heading: "Your Users Are Children.",
    headingAccent: "That Changes Everything.",
    lede: "For most sectors section 9 is an edge case handled by an age gate. For education it is the centre of the compliance problem, because the Act's definition of a child covers most of the student body.",
    covers: ["schools", "colleges", "coaching centres", "test prep", "K-12 platforms", "training institutes"],
    standing: [
      "The Act defines a child as an individual who has not completed eighteen years of age. In a school, a coaching platform or a K-12 product, that is not a minority of users to be screened out - it is the user base. Section 9 therefore stops being a peripheral control and becomes the architecture.",
      "Three duties follow. Section 9(1) requires verifiable parental consent before processing a child's personal data, in the manner prescribed by rule 10. Section 9(2) prohibits processing likely to cause a detrimental effect on a child's well-being. Section 9(3) prohibits tracking, behavioural monitoring of children and targeted advertising directed at children, outright and without a consent override.",
      "Section 9(3) is the one that reaches furthest into an EdTech product, because the line between pedagogy and behavioural monitoring is not obvious. Adaptive learning that adjusts difficulty from a student's answers is doing something a lawyer might characterise as behavioural monitoring, and so is engagement scoring, attention tracking in a proctored exam, and a recommendation engine that surfaces the next course. Some of that is the product working as intended for the learner's benefit; some of it is profiling. The Act does not draw the line for you, which means you have to draw it deliberately and be able to explain it.",
      "There is relief in the framework, and its extent depends on your class. Section 9(4) allows classes of Data Fiduciary and purposes to be prescribed as exempt from sections 9(1) and 9(3), and rule 12 with Part A of the Fourth Schedule does that - beginning with clinical and mental health establishments. Whether and how far it reaches educational providers is a question to answer against the Schedule text for your specific class and purpose, not to assume.",
    ],
    thresholds: [
      {
        value: "18",
        label: "age below which every learner is a child",
        ref: "§ 2(f)"
      },
      {
        value: "rule 10",
        label: "prescribes how parental consent is verified",
        ref: "rule 10"
      },
      {
        value: "0",
        label: "consent that can unlock § 9(3)",
        ref: "§ 9(3)"
      }
    ],
    activities: [
      {
        name: "Enrol a learner",
        purpose: "Create the account and establish who may consent for it",
        data: [
          "Learner name",
          "Class or grade",
          "Date of birth",
          "Parent or guardian contact",
          "School"
        ],
        flow: [
          {
            actor: "Enrolment form",
            does: "Collects learner and guardian details",
            ref: "§ 5",
            risk: "Notice addressed to the learner, who cannot give the consent being relied on"
          },
          {
            actor: "Parent verification",
            does: "Obtains verifiable parental consent",
            ref: "§ 9(1)",
            risk: "A tick box the learner completes claiming to be a parent"
          },
          {
            actor: "School procurement",
            does: "Signs the contract on the institution's behalf",
            ref: "§ 8(2)",
            risk: "The school treated as able to consent in the parent's place, which section 9(1) does not provide for"
          },
          {
            actor: "Learner record",
            does: "Holds the profile",
            risk: "No route to withdraw, so consent is a one-way door"
          }
        ],
        ground: {
          ref: "§ 9(1)",
          text: "Verifiable consent of the parent or lawful guardian before processing a child's personal data, in the manner rule 10 prescribes. A school is generally neither parent nor guardian."
        },
        control: "Build parental consent once, centrally, and settle the roles: usually the institution determines purpose and means as Data Fiduciary while the platform acts as Data Processor under section 8(2), with the school obtaining consent.",
        phase: "foundation",
        evidence: "The consent record with method and timestamp, and the contract that fixes which party is Fiduciary and which is Processor.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase when the learner leaves and the purpose is served, unless an education record obligation applies from another statute."
        }
      },
      {
        name: "Deliver adaptive learning",
        purpose: "Teach this learner by adjusting to their answers",
        data: [
          "Answers",
          "Time on task",
          "Attempts",
          "Progress"
        ],
        flow: [
          {
            actor: "Learning client",
            does: "Records answers and timing",
            risk: "One event stream serving both teaching and profiling with no line drawn between them"
          },
          {
            actor: "Adaptive engine",
            does: "Adjusts difficulty from performance",
            ref: "§ 9(3)",
            risk: "Adjustment indistinguishable from building a persistent behavioural profile"
          },
          {
            actor: "Engagement analytics",
            does: "Scores attention and streaks",
            ref: "§ 9(3)",
            risk: "Engagement optimisation aimed at children, which is behavioural monitoring however it is labelled"
          },
          {
            actor: "Reporting",
            does: "Shows progress to teacher and parent",
            ref: "§ 9(2)",
            risk: "Rankings that affect a child's wellbeing surfaced without thought"
          }
        ],
        ground: {
          ref: "§ 9(3)",
          text: "Tracking, behavioural monitoring and targeted advertising directed at children are prohibited outright, with no consent override. The Act does not draw the line between teaching and profiling, so you must draw it and be able to explain it."
        },
        control: "Classify every feature as pedagogy or profiling before anyone asks. Adjusting difficulty to teach this learner is defensible; a persistent behavioural profile and engagement optimisation are not.",
        phase: "operationalise",
        evidence: "A feature-by-feature classification with the reasoning, plus what is retained, for how long, and what else it feeds.",
        retention: {
          ref: "§ 8(7)",
          text: "Learning data serves the course. Set a period against that, not against the life of the account."
        }
      },
      {
        name: "Report to the institution",
        purpose: "Give the school the data it needs to run the programme",
        data: [
          "Attendance",
          "Scores",
          "Progress",
          "Behavioural flags"
        ],
        flow: [
          {
            actor: "Platform",
            does: "Aggregates learner data",
            ref: "§ 8(1)",
            risk: "Acting on your own initiative on data the school controls"
          },
          {
            actor: "School dashboard",
            does: "Presents it to staff",
            ref: "§ 8(2)",
            risk: "Broad staff access with no role separation"
          },
          {
            actor: "Export",
            does: "Leaves the platform as a file",
            risk: "Spreadsheets of children's data on personal devices, outside every control you built"
          }
        ],
        ground: {
          ref: "§ 8(2)",
          text: "Where the institution determines purpose and means, you are a Data Processor and may act only under a valid contract. The Fiduciary remains responsible under section 8(1) irrespective of any agreement to the contrary."
        },
        control: "Fix the roles in the contract and make them true in the product: role-based access, and exports that are logged rather than silent.",
        phase: "governance",
        evidence: "The processing contract, the access model, and an export log.",
        retention: {
          ref: "§ 8(7)",
          text: "Cease and erase on the Fiduciary's instruction, including copies the school has exported where you control them."
        }
      },
      {
        name: "Market to parents",
        purpose: "Sell the next course or renewal",
        data: [
          "Parent contact",
          "Learner progress",
          "Purchase history"
        ],
        flow: [
          {
            actor: "CRM",
            does: "Segments on learner performance",
            ref: "§ 6",
            risk: "A child's academic performance used as a marketing signal"
          },
          {
            actor: "Campaign tool",
            does: "Sends to the parent",
            ref: "§ 8(2)",
            risk: "Vendor engaged with no processing terms"
          }
        ],
        ground: {
          ref: "§ 6",
          text: "Marketing to a parent is ordinary processing of the parent's data, needing consent specific to that purpose. It does not inherit the basis that supports teaching the child."
        },
        control: "Keep learner performance out of marketing segmentation, and take separate consent from the parent in their own right.",
        phase: "operationalise",
        evidence: "Consent records for the parent, and a segmentation policy excluding learner performance.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase on withdrawal, across every channel."
        }
      }
    ],
    provisions: [
      {
        ref: "§ 9(1)",
        title: "Verifiable parental consent",
        body: "Before processing any personal data of a child, or of a person with a disability who has a lawful guardian, the Data Fiduciary must obtain verifiable consent of the parent or lawful guardian, in the manner prescribed. Rule 10 sets out that manner. \"Verifiable\" is doing real work - a checkbox asserting parenthood is not the standard the word implies.",
      },
      {
        ref: "§ 9(3)",
        title: "No behavioural monitoring, no targeted advertising",
        body: "Tracking, behavioural monitoring of children and targeted advertising directed at children are prohibited. There is no consent gate: a parent cannot authorise it. For adaptive learning, engagement analytics and recommendation systems, the question is whether the feature constitutes monitoring - not whether anyone agreed to it.",
      },
      {
        ref: "§ 9(2)",
        title: "No detrimental effect on well-being",
        body: "A Data Fiduciary shall not undertake processing of personal data that is likely to cause any detrimental effect on the well-being of a child. This is broader and vaguer than the other two, and it is the provision most likely to be cited against engagement-maximising design - streaks, leaderboards and notification pressure aimed at minors.",
      },
      {
        ref: "§ 9(4) · Fourth Schedule",
        title: "The prescribed exemptions",
        body: "Section 9(4) allows sections 9(1) and 9(3) to be disapplied for prescribed classes, purposes and conditions. Rule 12 with Part A of the Fourth Schedule implements this, beginning with clinical establishments, mental health establishments and healthcare professionals. Read the Schedule against your own class and purpose before relying on it.",
      },
    ],
    actions: [
      {
        title: "Classify every feature as pedagogy or profiling",
        body: "Go through the product feature by feature and record which are necessary to deliver learning to that student and which build a behavioural profile. The classification is the compliance artefact - it is what you will be asked to produce, and making the call in advance is far easier than defending an unexamined one.",
      },
      {
        title: "Design verifiable parental consent as a real flow",
        body: "It needs to establish that the consenting adult is the parent or lawful guardian, produce a durable record, and cope with the school-procured case where the institution - not the parent - signs the contract. Rule 10 governs the manner, and it should be built once, centrally, rather than per product surface.",
      },
      {
        title: "Remove advertising from minor-facing surfaces",
        body: "Targeted advertising directed at children is prohibited outright. If any part of the product is ad-supported, the safe position for under-eighteen accounts is contextual-only inventory, verified across every mediation partner rather than assumed from a flag.",
      },
      {
        title: "Separate the institution's role from yours",
        body: "When a school deploys your platform, work out who determines the purpose and means. If the school does and you act on its instructions, you look like a Data Processor and section 8(2) requires a valid contract. If you decide what to do with student data yourself, you are a Data Fiduciary with the full set of duties, including section 9.",
      },
    ],
    faq: [
      {
        q: "Can a school consent on behalf of parents?",
        a: "Section 9(1) requires verifiable consent of the parent or lawful guardian. A school is generally neither. Where an institution procures the platform, the workable structure is usually that the school is the Data Fiduciary determining purpose and means, the provider is a Data Processor under a section 8(2) contract, and the school obtains parental consent. That arrangement has to be real in substance, not just in the paperwork.",
      },
      {
        q: "Is adaptive learning behavioural monitoring under section 9(3)?",
        a: "The Act does not answer this directly, which is the honest position. Adjusting difficulty from a student's answers to teach that student is a different activity from building a persistent behavioural profile, and the distinction is defensible - but it needs to be documented before it is challenged, with a clear account of what is retained, for how long and what else it is used for.",
      },
      {
        q: "Does section 9 apply to university students over 18?",
        a: "No. A child is someone who has not completed eighteen years, so section 9 does not apply to adult learners. Every other obligation does: notice, consent, purpose limitation, erasure, security safeguards and the Chapter III rights all apply to an eighteen-year-old student exactly as to any other Data Principal.",
      },
    ],
    related: [
      {
        href: routes.rights,
        label: "Rights and duties",
        note: "Chapter III, and how a guardian exercises them",
      },
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "Rule 10 and the Fourth Schedule",
      },
      {
        href: routes.roles,
        label: "Key roles explained",
        note: "Fiduciary or Processor - the school question",
      },
    ],
  },

  "saas": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for SaaS and IT Service Providers",
    metaDescription:
      "SaaS and IT services under the DPDP Act: the dual Fiduciary and Processor role, why section 8(2) needs a contract, and the offshore carve-out.",
    eyebrow: "§ 8(1) · § 8(2) · § 17(1)(d)",
    heading: "Two Roles,",
    headingAccent: "One Codebase.",
    lede: "A SaaS company is a Data Processor for its customers' data and a Data Fiduciary for its own users' data - usually in the same system, often in the same table. The Act treats those two positions very differently.",
    covers: ["B2B software", "IT services", "BPO", "cloud platforms", "developer tools"],
    standing: [
      "The Act defines a Data Processor as any person who processes personal data on behalf of a Data Fiduciary. When your customer decides what happens to their end-users' data and you execute it, that is you. But you also run signup, billing, support and your own product analytics, and for those you determine the purpose and means yourself - which makes you a Data Fiduciary. Both are true simultaneously, and the obligations differ sharply, so the first task is knowing which data sits in which role.",
      "The Act's structure of processor liability is worth reading closely, because it is not what a GDPR-trained team expects. Section 8(1) makes the Data Fiduciary responsible for complying with the Act in respect of any processing undertaken by it or on its behalf by a Data Processor - irrespective of any agreement to the contrary. The customer cannot contract that responsibility away to you. Section 8(2) then requires that a Data Fiduciary may involve a Data Processor for any activity related to offering goods or services only under a valid contract.",
      "The Act does not prescribe that contract's contents the way the GDPR's Article 28 does. That sounds like less work and is often more, because there is no statutory template to fall back on: what the contract must achieve is whatever lets your customer discharge their own section 8 duties through you. In practice this makes your Data Processing Addendum a commercial document as much as a legal one, and it becomes a procurement gate for enterprise deals.",
      "One provision is specifically useful to offshore IT services. Section 17(1)(d) disapplies Chapter II (except sections 8(1) and 8(5)), Chapter III and section 16 where personal data of Data Principals outside India is processed under a contract with a person outside India by a person based in India. That is the export services model, and the Act deliberately declines to regulate it beyond accountability and security.",
    ],
    thresholds: [
      {
        value: "2",
        label: "roles you hold at once: Fiduciary and Processor",
        ref: "§ 2"
      },
      {
        value: "§ 8(2)",
        label: "makes a valid contract mandatory, not optional",
        ref: "§ 8(2)"
      },
      {
        value: "§ 17(1)(d)",
        label: "carves out offshore work for non-India Principals",
        ref: "§ 17(1)(d)"
      }
    ],
    activities: [
      {
        name: "Process a customer's data",
        purpose: "Do what your customer instructs, on their end-users' data",
        data: [
          "Whatever the customer stores in your product"
        ],
        flow: [
          {
            actor: "Customer tenant",
            does: "Holds the customer's end-user data",
            ref: "§ 8(1)",
            risk: "Your customer believing liability transferred to you, which section 8(1) prevents"
          },
          {
            actor: "Your services",
            does: "Process on instruction",
            ref: "§ 8(2)",
            risk: "Operating with no processing contract, putting the customer in breach by using you"
          },
          {
            actor: "Sub-processors",
            does: "Hosting, email, search, support tooling",
            ref: "§ 8(2)",
            risk: "Sub-processors added without notice, so the customer cannot discharge their own duty"
          },
          {
            actor: "Backups",
            does: "Retain copies",
            ref: "§ 8(7)",
            risk: "Deletion honoured in the primary store while backups quietly retain everything"
          }
        ],
        ground: {
          ref: "§ 8(2)",
          text: "A Data Fiduciary may involve a Processor only under a valid contract. The Act does not enumerate its clauses the way the GDPR does, so the contract has to be built around what your customer must be able to prove."
        },
        control: "Write the addendum from sections 8(1), 8(2), 6(6) and 8(7) rather than porting an Article 28 template, and keep a current sub-processor list.",
        phase: "foundation",
        evidence: "The executed addendum, the sub-processor register, and the change-notice record.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase on the Fiduciary's instruction, including copies held by sub-processors and in backups."
        }
      },
      {
        name: "Run your own product",
        purpose: "Sign up, bill and improve the service",
        data: [
          "Account holder identity",
          "Billing records",
          "Support tickets",
          "Product analytics"
        ],
        flow: [
          {
            actor: "Signup",
            does: "Collects the account holder's details",
            ref: "§ 5",
            risk: "The same notice used for your users and your customers' end-users, which are different relationships"
          },
          {
            actor: "Billing",
            does: "Holds payment records",
            ref: "§ 8(7)",
            risk: "Retained indefinitely on a tax argument that was never checked"
          },
          {
            actor: "Product analytics",
            does: "Observes how the product is used",
            ref: "§ 6",
            risk: "End-user data from customer tenants flowing into your own analytics, where you are not the Processor any more"
          }
        ],
        ground: {
          ref: "§ 6",
          text: "Here you determine purpose and means, so you are the Data Fiduciary with the full set of obligations, including notice and consent."
        },
        control: "Draw the Fiduciary and Processor line in the schema, not in the policy. Teams that leave it implicit end up applying processor logic to data they are actually Fiduciary for.",
        phase: "foundation",
        evidence: "A data map marking each store with the role you hold for it.",
        retention: {
          ref: "§ 8(7)",
          text: "Billing records may be required by tax law; those periods sit outside this Act and should be confirmed against those statutes."
        }
      },
      {
        name: "Honour a cessation instruction",
        purpose: "Stop processing when your customer's user withdraws consent",
        data: [
          "The affected end-user's records, everywhere"
        ],
        flow: [
          {
            actor: "Customer API call",
            does: "Signals withdrawal or erasure",
            ref: "§ 6(6)",
            risk: "Handled as a support ticket, so it cannot be evidenced at volume"
          },
          {
            actor: "Primary store",
            does: "Deletes the records",
            ref: "§ 8(7)",
            risk: "Soft delete presented as erasure"
          },
          {
            actor: "Queues and caches",
            does: "Still hold in-flight copies",
            risk: "Cessation applied to the database only"
          },
          {
            actor: "Sub-processors",
            does: "Must also cease",
            ref: "§ 8(7)",
            risk: "No mechanism to propagate, so the instruction stops at your boundary"
          }
        ],
        ground: {
          ref: "§ 6(6)",
          text: "On withdrawal the Fiduciary shall cease and cause its Processors to cease within a reasonable time. Reasonable is measured against your architecture, not your intentions."
        },
        control: "Make cessation and erasure real API operations with an audit trail, reaching queues, caches, backups and sub-processors.",
        phase: "operationalise",
        evidence: "Endpoint logs showing the instruction, the systems reached, and the completion time.",
        retention: {
          ref: "§ 8(7)(b)",
          text: "The Fiduciary must cause its Processor to erase data made available to it. That is you."
        }
      },
      {
        name: "Serve offshore clients",
        purpose: "Process for a client outside India, on non-India Data Principals",
        data: [
          "The offshore client's end-user data"
        ],
        flow: [
          {
            actor: "Offshore client",
            does: "Contracts from outside India",
            ref: "§ 17(1)(d)",
            risk: "The exemption assumed to cover the whole business, including India operations"
          },
          {
            actor: "India delivery team",
            does: "Processes the data here",
            ref: "§ 8(5)",
            risk: "Safeguards relaxed because the exemption was read as total"
          }
        ],
        ground: {
          ref: "§ 17(1)(d)",
          text: "Chapter II except sections 8(1) and 8(5), Chapter III and section 16 do not apply where personal data of Data Principals outside India is processed under a contract with a person outside India, by a person based in India."
        },
        control: "Scope the exemption to that engagement. Your own employees, your India customers and their users are outside it entirely.",
        phase: "governance",
        evidence: "Engagement records showing Principal location and contracting party, and safeguards applied regardless.",
        retention: {
          ref: "§ 8(5)",
          text: "Responsibility and reasonable security safeguards survive the exemption."
        }
      }
    ],
    provisions: [
      {
        ref: "§ 8(1)",
        title: "Your customer stays liable, whatever the contract says",
        body: "A Data Fiduciary is responsible for complying with the Act in respect of processing undertaken by it or on its behalf by a Data Processor, irrespective of any agreement to the contrary or a Data Principal's failure to carry out her duties. Liability cannot be contracted onto you. It also means your customer has a direct interest in how you operate, which is why the diligence is intrusive.",
      },
      {
        ref: "§ 8(2)",
        title: "A valid contract is mandatory",
        body: "A Data Fiduciary may engage a Data Processor for any activity related to offering goods or services to Data Principals only under a valid contract. Without one, the customer is in breach by using you. The Act does not enumerate required clauses, so the contract has to be designed around what your customer needs to be able to prove.",
      },
      {
        ref: "§ 6(6)",
        title: "You must be able to stop on command",
        body: "On withdrawal of consent, the Data Fiduciary shall cease and cause its Data Processors to cease processing, within a reasonable time, unless the processing is otherwise required or authorised by law. Your customer needs an interface to make that happen - propagated to backups, queues, caches and any sub-processor - and \"reasonable time\" is measured against your architecture, not your intentions.",
      },
      {
        ref: "§ 17(1)(d)",
        title: "The offshore services carve-out",
        body: "Chapter II (except sections 8(1) and 8(5)), Chapter III and section 16 do not apply to processing of personal data of Data Principals outside India, pursuant to a contract with a person outside India, by a person based in India. This is the IT and BPO export model, and it stays outside most of the regime - while accountability and security safeguards continue to apply.",
      },
    ],
    actions: [
      {
        title: "Draw the fiduciary/processor line in the schema",
        body: "Identify which tables hold customer-controlled data and which hold your own users' data. The distinction determines who owes notice, who answers a rights request and who decides retention. Teams that leave it implicit end up applying processor logic to fiduciary data, which is the direction that creates unmet obligations.",
      },
      {
        title: "Write the DPA around section 8, not around Article 28",
        body: "A GDPR addendum with the names changed will contain obligations the Act does not impose and miss the ones it does. Build it from what your customer must be able to demonstrate under sections 8(1), 8(2), 6(6) and 8(7) - cessation on withdrawal, erasure on instruction, breach notification into their rule 7 timeline, and sub-processor transparency.",
      },
      {
        title: "Make erasure and cessation real API operations",
        body: "Section 8(7)(b) requires the Data Fiduciary to cause its processor to erase data made available to it. If honouring that is a support ticket and a manual script, you cannot evidence it at volume. It should be an endpoint with an audit trail, and it should reach backups and sub-processors.",
      },
      {
        title: "Get your breach obligations onto your customer's clock",
        body: "Rule 7 gives the Data Fiduciary specific breach notification duties with tight timelines. They cannot meet them if they hear from you late. Contract your own detection-to-notification window to sit comfortably inside theirs, and test it.",
      },
    ],
    faq: [
      {
        q: "Are we a Data Fiduciary or a Data Processor?",
        a: "Almost certainly both. You are a Data Processor for the personal data you handle on your customers' instructions, and a Data Fiduciary for the data where you determine the purpose and means yourself - your own account holders, billing records, marketing lists and product analytics. The test is who decides, and it is applied per processing activity rather than per company.",
      },
      {
        q: "Does the DPDP Act require a specific data processing agreement?",
        a: "Section 8(2) requires a valid contract, but unlike the GDPR's Article 28 the Act does not enumerate the clauses it must contain. That gives flexibility and removes the safety of a template. The workable standard is a contract that lets your customer discharge their section 8 obligations through you and prove they did.",
      },
      {
        q: "Do Indian IT services firms working for foreign clients fall under the Act?",
        a: "Largely not, by design. Section 17(1)(d) disapplies Chapter II - except sections 8(1) and 8(5) - Chapter III and section 16 where an India-based person processes the data of Data Principals outside India under a contract with a person outside India. Responsibility for compliance and reasonable security safeguards still apply, and the exemption does not reach your own employee or customer data in India.",
      },
    ],
    related: [
      {
        href: routes.roles,
        label: "Key roles explained",
        note: "Fiduciary, Processor and who decides",
      },
      {
        href: routes.obligations,
        label: "The eleven obligations",
        note: "What your customer needs from you",
      },
      {
        href: routes.checklist,
        label: "Compliance checklist",
        note: "A working sequence, not a shopping list",
      },
    ],
  },

  "startups": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for Startups: What Section 17(3) Does",
    metaDescription:
      "Startups under the DPDP Act: what section 17(3) actually offers, why the exemption is not automatic, and which obligations would still apply.",
    eyebrow: "§ 17(3)",
    heading: "Named In The Act.",
    headingAccent: "Not Yet Exempt.",
    lede: "Section 17(3) singles out startups for potential relief from five obligations. It is an enabling power, not a live exemption - and the difference matters more than any other point on this page.",
    covers: ["DPIIT-recognised startups", "early stage companies", "seed and Series A teams"],
    standing: [
      "Section 17(3) provides that the Central Government may, having regard to the volume and nature of personal data processed, notify certain Data Fiduciaries or classes of Data Fiduciaries - including startups - as Data Fiduciaries to whom section 5, sections 8(3) and 8(7), and sections 10 and 11 shall not apply. An Explanation defines startup as a private limited company, partnership firm or limited liability partnership incorporated in India that is recognised as such under the criteria notified by the department to which startup matters are allocated - in practice, DPIIT recognition.",
      "Read the verb. The Government *may* notify. Until it notifies a class and you are inside it, nothing in your obligations changes. The most common and most expensive misreading of this Act is a founder concluding that DPIIT recognition is itself an exemption. It is a precondition for one that may be granted, and building on the assumption that it has been is a compliance debt that compounds with every user you add.",
      "It is also worth noticing how modest the relief would be. Section 5 is notice. Section 8(3) is data accuracy where the data is used for a decision affecting the Data Principal or is disclosed to another Data Fiduciary. Section 8(7) is erasure. Section 10 is the Significant Data Fiduciary regime, which a startup would rarely be notified under anyway. Section 11 is the right to access information about processing.",
      "What section 17(3) conspicuously does not touch: consent under section 6, purpose limitation, reasonable security safeguards under section 8(5), breach notification under section 8(6), the children's provisions in section 9, the right to correction and erasure under section 12, grievance redressal under section 13, and the entire penalty regime. The obligations most likely to generate a breach and a penalty are precisely the ones that would survive a section 17(3) notification intact.",
    ],
    thresholds: [
      {
        value: "5",
        label: "provisions § 17(3) could disapply",
        ref: "§ 17(3)"
      },
      {
        value: "DPIIT",
        label: "recognition needed to be inside the class",
        ref: "§ 17(3)"
      },
      {
        value: "₹250 crore",
        label: "penalty exposure § 17(3) would not touch",
        ref: "Schedule"
      }
    ],
    activities: [
      {
        name: "Sign up a user",
        purpose: "Create the account and start delivering the product",
        data: [
          "Email",
          "Name",
          "Password hash",
          "Device and referral data"
        ],
        flow: [
          {
            actor: "Signup form",
            does: "Collects the details",
            ref: "§ 5",
            risk: "Notice buried in terms of service, which section 5 is not satisfied by"
          },
          {
            actor: "Auth service",
            does: "Creates the account",
            ref: "§ 6",
            risk: "Marketing consent bundled into signup, so it is neither free nor specific"
          },
          {
            actor: "Analytics",
            does: "Records the funnel",
            risk: "Third-party analytics loaded before any consent exists"
          }
        ],
        ground: {
          ref: "§ 6",
          text: "Consent must be free, specific, informed, unconditional and unambiguous, by clear affirmative action, limited to the data necessary for the stated purpose. Section 17(3) does not list section 6, so this applies whatever happens with the exemption."
        },
        control: "Build per-purpose consent from day one and keep the record. Retrofitting it into a live product with real users is materially harder than starting with it.",
        phase: "foundation",
        evidence: "Consent records showing purpose, timestamp and the wording shown at the time.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase when the account closes or the purpose is served. Section 17(3) could disapply this, but only once a notification exists and you are inside the notified class."
        }
      },
      {
        name: "Secure the data",
        purpose: "Prevent a personal data breach",
        data: [
          "Everything you hold"
        ],
        flow: [
          {
            actor: "Application",
            does: "Handles the data",
            ref: "§ 8(5)",
            risk: "Safeguards deferred as a later-stage concern"
          },
          {
            actor: "Infrastructure",
            does: "Stores it",
            ref: "§ 8(5)",
            risk: "Shared credentials and no access separation while the team is small"
          },
          {
            actor: "Third-party tools",
            does: "Also hold it",
            ref: "§ 8(2)",
            risk: "Tools adopted on a free tier with no processing terms"
          }
        ],
        ground: {
          ref: "§ 8(5)",
          text: "A Data Fiduciary shall protect personal data in its possession or under its control, including data processed on its behalf, by taking reasonable security safeguards. This is not on the section 17(3) list."
        },
        control: "Treat safeguards and breach readiness as founding work. They carry the largest penalty exposure in the Schedule and no notification would relieve them.",
        phase: "foundation",
        evidence: "Access model, key management, and a dated record of what was decided and why.",
        retention: {
          ref: "§ 8(7)",
          text: "Less data held is less to secure. Erasure is a security control as much as a compliance one."
        }
      },
      {
        name: "Report a breach",
        purpose: "Tell the Board and every affected Data Principal",
        data: [
          "What was exposed, and whose"
        ],
        flow: [
          {
            actor: "Detection",
            does: "Notices the incident",
            ref: "§ 8(6)",
            risk: "No detection at all, so the clock starts when someone external tells you"
          },
          {
            actor: "Assessment",
            does: "Determines scope and who is affected",
            ref: "§ 8(6)",
            risk: "Cannot enumerate affected Principals because there is no data map"
          },
          {
            actor: "Notification",
            does: "Informs the Board and each Data Principal",
            ref: "§ 8(6)",
            risk: "Timelines missed because the process was invented during the incident"
          }
        ],
        ground: {
          ref: "§ 8(6)",
          text: "In the event of a personal data breach, the Data Fiduciary shall give the Board and each affected Data Principal intimation in the prescribed form and manner. Also not on the section 17(3) list."
        },
        control: "Write the runbook before you need it, and make sure you can answer whose data was affected from a data map rather than from memory.",
        phase: "governance",
        evidence: "The runbook, a dated tabletop exercise, and a data map good enough to enumerate affected Principals.",
        retention: {
          ref: "§ 8(7)",
          text: "Incident records are their own processing; keep what evidences the response."
        }
      },
      {
        name: "Delete a user completely",
        purpose: "Honour withdrawal and erasure",
        data: [
          "Every copy of that user's data"
        ],
        flow: [
          {
            actor: "Delete request",
            does: "Arrives from the user",
            ref: "§ 12",
            risk: "No route to request it at all"
          },
          {
            actor: "Primary store",
            does: "Removes the records",
            ref: "§ 8(7)",
            risk: "Deletion that is a status flag"
          },
          {
            actor: "Downstream copies",
            does: "Analytics, warehouse, support tooling, backups",
            ref: "§ 8(7)",
            risk: "Copies spread across services faster than the ability to delete them"
          }
        ],
        ground: {
          ref: "§ 12",
          text: "The right to erasure of personal data, alongside correction, completion and updating. Section 12 is not on the section 17(3) list either."
        },
        control: "Build the ability to delete a user completely while the data model is small. It is an architectural property, not a feature you can add later.",
        phase: "operationalise",
        evidence: "A deletion runbook naming every store, and logs proving it ran end to end.",
        retention: {
          ref: "§ 8(7)",
          text: "Erase on withdrawal or when the purpose is served, whichever is earlier, unless a law requires retention."
        }
      }
    ],
    provisions: [
      {
        ref: "§ 17(3)",
        title: "What the power actually covers",
        body: "The Central Government may notify Data Fiduciaries or classes of them, including startups, to whom sections 5, 8(3), 8(7), 10 and 11 shall not apply - having regard to the volume and nature of personal data processed. Five provisions, exercised by notification, at the Government's discretion.",
      },
      {
        ref: "Explanation to § 17(3)",
        title: "Who counts as a startup",
        body: "A private limited company, partnership firm or limited liability partnership incorporated in India, eligible to be and recognised as a startup under the criteria and process notified by the department to which startup matters are allocated in the Central Government. Recognition is the gateway to being inside a class that may be notified - it is not the exemption.",
      },
      {
        ref: "§ 8(5) · § 8(6)",
        title: "Security and breach reporting are not on the list",
        body: "Reasonable security safeguards to prevent a personal data breach, and the duty to notify the Board and each affected Data Principal of a breach, sit outside section 17(3) entirely. These are also the obligations with the largest penalty exposure - up to ₹250 crore for a security safeguards failure. No notification would relieve them.",
      },
      {
        ref: "§ 6",
        title: "Consent applies from day one",
        body: "Section 6 governs consent - free, specific, informed, unconditional and unambiguous, with a clear affirmative action, limited to the personal data necessary for the specified purpose, and withdrawable with comparable ease. It is not within the section 17(3) list, and it is the provision that shapes signup and onboarding, which is what a startup builds first.",
      },
    ],
    actions: [
      {
        title: "Assume no exemption and build accordingly",
        body: "Design for the full regime. If a notification later relieves five obligations, you will have over-built slightly. If you design for an exemption that never arrives, you will retrofit consent and erasure into a live product with real users, which is materially harder and usually happens under deadline pressure.",
      },
      {
        title: "Spend the effort on consent and security",
        body: "Neither is in section 17(3), both are load-bearing, and both are far cheaper to get right before scale. A consent record you can produce per user per purpose, and safeguards you can evidence, are the two artefacts that matter most if anything goes wrong.",
      },
      {
        title: "Instrument erasure early even though it might be relieved",
        body: "Section 8(7) is on the section 17(3) list, so it could be disapplied - but the ability to delete a user completely is an architectural property, not a feature. Systems that cannot delete become systems that cannot comply, and retrofitting it after the data model has spread across services is the expensive path.",
      },
      {
        title: "Watch for notifications rather than assuming them",
        body: "The relief in section 17(3) arrives, if it arrives, as a published notification specifying a class. Track it deliberately, and record the date you checked. \"We believed we were exempt\" is not a defence; \"we monitored and were not yet within a notified class\" is a defensible compliance position.",
      },
    ],
    faq: [
      {
        q: "Are startups exempt from the DPDP Act?",
        a: "No. Section 17(3) gives the Central Government a power to notify classes of Data Fiduciary, including startups, as exempt from sections 5, 8(3), 8(7), 10 and 11. Until such a notification is made and you fall within the notified class, every obligation in the Act applies to you in full. The power existing is not the same as the power having been exercised.",
      },
      {
        q: "Does DPIIT recognition make us exempt?",
        a: "No. DPIIT recognition is how the Explanation to section 17(3) defines who counts as a startup, so it determines whether you could be inside a notified class. The exemption itself would still have to be conferred by a notification from the Central Government. Recognition is a qualification, not a grant.",
      },
      {
        q: "If the exemption arrives, what would still apply?",
        a: "Most of the Act. Consent under section 6, purpose limitation, reasonable security safeguards under section 8(5), breach notification under section 8(6), children's data under section 9, correction and erasure rights under section 12, grievance redressal under section 13, and the whole penalty regime in the Schedule. Section 17(3) removes five provisions, and not the ones that carry the largest exposure.",
      },
    ],
    related: [
      {
        href: routes.applicability,
        label: "Applicability checker",
        note: "Work out what applies to you specifically",
      },
      {
        href: routes.checklist,
        label: "Compliance checklist",
        note: "The sequence to build in",
      },
      {
        href: routes.penalties,
        label: "Penalties",
        note: "What section 17(3) would not protect you from",
      },
    ],
  },

  "government": {
    published: "2026-08-09",
    updated: "2026-08-09",
    metaTitle: "DPDP Act for Government and Public Sector Bodies",
    metaDescription:
      "Government under the DPDP Act: the section 7(b) legitimate use for public services, and the 17(2)(a) exemption for notified State bodies.",
    eyebrow: "§ 7(b) · § 17(2)(a)",
    heading: "The State Processes",
    headingAccent: "On Different Terms.",
    lede: "Section 7(b) lets the State provide subsidies, benefits, services, certificates, licences and permits without consent. Section 17(2)(a) can take a notified instrumentality outside the Act altogether. Neither is a blanket exemption, and the difference between them is the whole point.",
    covers: ["central and state departments", "municipal bodies", "public sector undertakings", "welfare schemes"],
    standing: [
      "Public sector processing sits under two distinct provisions that are frequently conflated, and getting them the wrong way round produces either unnecessary consent flows or unlawful processing.",
      "Section 7 sets out certain legitimate uses - grounds on which personal data may be processed without consent. Clause (b) covers the State and its instrumentalities providing a subsidy, benefit, service, certificate, licence or permit as may be prescribed, subject to the conditions set out in the section. This is a lawful basis, not an exemption. Everything else in the Act still applies: purpose limitation, accuracy, security safeguards, breach notification, erasure and the Chapter III rights all continue to run. A citizen receiving a benefit under section 7(b) retains her right of access under section 11 and correction under section 12.",
      "Section 17(2)(a) is a different instrument entirely. It provides that the Act shall not apply in respect of processing by such instrumentality of the State as the Central Government may notify, in the interests of the sovereignty and integrity of India, security of the State, friendly relations with foreign States, maintenance of public order, and the related grounds. This is disapplication of the whole Act, and it operates by notification of a specific instrumentality. An organisation is either notified or it is not.",
      "The Rules add operational detail. The Second Schedule, through rule 5, sets standards for State processing under section 7(b). The Seventh Schedule, through rules 23(1) and 8(3), pairs each purpose with the authorised person who may act on it - beginning with use by the State in the interest of sovereignty and integrity or security of the State, exercised by an officer designated under section 17(2)(a) - and fixes a one-year floor for retaining processing logs.",
    ],
    thresholds: [
      {
        value: "§ 7(b)",
        label: "processes subsidies and services without consent",
        ref: "§ 7(b)"
      },
      {
        value: "1 year",
        label: "minimum retention for processing logs",
        ref: "rule 8(3)"
      },
      {
        value: "§ 17(2)(a)",
        label: "disapplies the Act for a notified instrumentality",
        ref: "§ 17(2)(a)"
      }
    ],
    activities: [
      {
        name: "Issue a subsidy or benefit",
        purpose: "Deliver the scheme to the citizen entitled to it",
        data: [
          "Identity",
          "Eligibility evidence",
          "Bank details",
          "Household data"
        ],
        flow: [
          {
            actor: "Application",
            does: "Collects the claim",
            ref: "§ 7(b)",
            risk: "Consent forms used where section 7(b) already supplies the basis, promising a withdrawal right that cannot be honoured"
          },
          {
            actor: "Eligibility check",
            does: "Verifies against other databases",
            ref: "Second Schedule",
            risk: "The Second Schedule standards for State processing never consulted"
          },
          {
            actor: "Disbursement",
            does: "Pays the benefit",
            risk: "Payment data shared more widely than the scheme requires"
          }
        ],
        ground: {
          ref: "§ 7(b)",
          text: "The State and its instrumentalities may process without consent to provide a subsidy, benefit, service, certificate, licence or permit as may be prescribed, subject to the conditions in the section. This is a lawful basis, not an exemption."
        },
        control: "Check your scheme against what is actually prescribed, and apply the Second Schedule standards rather than assuming public delivery is self-justifying.",
        phase: "foundation",
        evidence: "The determination that the scheme falls within section 7(b), and a mapping to the Second Schedule standards.",
        retention: {
          ref: "§ 8(7)",
          text: "Public records law generally requires retention; those periods come from those rules, not from this Act."
        }
      },
      {
        name: "Answer a citizen's request",
        purpose: "Discharge Chapter III duties, which section 7(b) does not switch off",
        data: [
          "Whatever the citizen asks about"
        ],
        flow: [
          {
            actor: "Published contact",
            does: "Receives the request",
            ref: "§ 8(9)",
            risk: "No published channel, so requests go to a general grievance queue"
          },
          {
            actor: "Identity check",
            does: "Confirms the requester",
            risk: "Verification so heavy it becomes a barrier to the right"
          },
          {
            actor: "Departmental sweep",
            does: "Finds the data across systems",
            ref: "§ 11",
            risk: "Legacy and state-level systems outside the sweep"
          }
        ],
        ground: {
          ref: "§ 11",
          text: "Processing without consent under section 7 does not disapply Chapter III. Access, correction, erasure, grievance redressal and nomination all continue to run against the department."
        },
        control: "Stand up a citizen-facing request channel that works at the volume public programmes generate, and name every system in the sweep.",
        phase: "governance",
        evidence: "Request log with timestamps and outcomes, and the sweep list under version control.",
        retention: {
          ref: "§ 8(7)",
          text: "Keep what evidences the response."
        }
      },
      {
        name: "Retain processing logs",
        purpose: "Meet the logging floor the Rules set",
        data: [
          "Processing logs",
          "Access records"
        ],
        flow: [
          {
            actor: "Systems",
            does: "Emit access and processing logs",
            ref: "rule 8(3)",
            risk: "Logs rotated at thirty days, below the floor"
          },
          {
            actor: "Log store",
            does: "Retains them",
            ref: "Seventh Schedule",
            risk: "Logs themselves containing personal data and never brought into the data map"
          }
        ],
        ground: {
          ref: "rule 8(3)",
          text: "Rule 8(3) with the Seventh Schedule fixes a one-year minimum for retaining processing logs."
        },
        control: "Set retention to the floor or to your own records rules, whichever is longer, and treat the logs as personal data in their own right.",
        phase: "operationalise",
        evidence: "Log retention configuration, and the logs inside the data map.",
        retention: {
          ref: "rule 8(3)",
          text: "One year minimum. Longer where your own records rules require it."
        }
      },
      {
        name: "Rely on a notified exemption",
        purpose: "Process under section 17(2)(a) where the Government has notified the body",
        data: [
          "Whatever the notified purpose covers"
        ],
        flow: [
          {
            actor: "Notification",
            does: "Names the instrumentality",
            ref: "§ 17(2)(a)",
            risk: "Assumed rather than held, so the department operates as if exempt when it is not"
          },
          {
            actor: "Designated officer",
            does: "Exercises the power",
            ref: "Seventh Schedule",
            risk: "The Seventh Schedule pairing of purpose to authorised person ignored"
          }
        ],
        ground: {
          ref: "§ 17(2)(a)",
          text: "The Act does not apply to processing by such instrumentality of the State as the Central Government may notify, in the interests of sovereignty and integrity of India, security of the State and the related grounds. It operates by notification of a specific body."
        },
        control: "Establish which provision you actually rely on. Section 7(b) is a basis with every other duty intact; section 17(2)(a) is disapplication of the whole Act, by notification. Departments that confuse the two have unmet rights obligations they cannot see.",
        phase: "governance",
        evidence: "The notification itself, and the designation of the officer authorised to act on each purpose.",
        retention: {
          ref: "rule 8(3)",
          text: "Logging obligations still bite where the Seventh Schedule applies."
        }
      }
    ],
    provisions: [
      {
        ref: "§ 7(b)",
        title: "Subsidies, benefits, services, licences",
        body: "Personal data may be processed without consent for the State and its instrumentalities to provide or issue a subsidy, benefit, service, certificate, licence or permit as may be prescribed, subject to the conditions in the section. This is a lawful basis for processing. It does not switch off notice-adjacent duties, security obligations or the Data Principal's rights.",
      },
      {
        ref: "§ 17(2)(a)",
        title: "Notified instrumentalities, outside the Act",
        body: "The Act does not apply to processing by such instrumentality of the State as the Central Government may notify, in the interests of the sovereignty and integrity of India, security of the State, friendly relations with foreign States, maintenance of public order and related grounds. This is disapplication of the entire Act, by notification, to a named body - not a purpose-based exemption any department can claim.",
      },
      {
        ref: "Second Schedule",
        title: "Standards for State processing",
        body: "Rule 5 with the Second Schedule sets the standards that apply where the State processes personal data under section 7(b). If your department relies on that legitimate use, this Schedule is the operational specification for how, and it is the document an audit will measure you against.",
      },
      {
        ref: "Seventh Schedule",
        title: "Who may demand data, and the log floor",
        body: "Rules 23(1) and 8(3) with the Seventh Schedule pair each purpose with the authorised person who may act on it, beginning with use by the State in the interest of sovereignty and integrity or security of the State, exercised by an officer designated under section 17(2)(a). Rule 8(3) points here for the one-year minimum retention of processing logs.",
      },
    ],
    actions: [
      {
        title: "Establish which provision you are actually relying on",
        body: "Section 7(b) is a lawful basis with all other duties intact. Section 17(2)(a) is disapplication of the Act by notification. Departments that assume they hold the second while in fact operating under the first will have unmet rights and security obligations, and the gap is invisible until someone makes a request.",
      },
      {
        title: "Confirm the subsidy or service is prescribed",
        body: "Section 7(b) applies to a subsidy, benefit, service, certificate, licence or permit as may be prescribed, and on the conditions in the section. Check your programme against what is actually prescribed rather than assuming that all public service delivery is covered by the general shape of the clause.",
      },
      {
        title: "Build rights handling even under section 7(b)",
        body: "Processing without consent does not remove Chapter III. Access under section 11, correction and erasure under section 12, grievance redressal under section 13 and nomination under section 14 all continue. A citizen-facing request channel is required, not optional, and it has to work at the volumes public programmes generate.",
      },
      {
        title: "Set log retention to the one-year floor",
        body: "Rule 8(3) with the Seventh Schedule fixes a one-year minimum for retaining processing logs. Treat it as a floor and check it against any longer retention your own records rules impose, then implement whichever is longer.",
      },
    ],
    faq: [
      {
        q: "Is the government exempt from the DPDP Act?",
        a: "Not generally. Section 17(2)(a) allows the Central Government to notify a specific instrumentality of the State as outside the Act, on grounds including sovereignty and integrity, security of the State and public order. That is body-by-body notification. Absent it, a public body is a Data Fiduciary - though section 7(b) usually gives it a basis to process without consent when providing subsidies, benefits, services, certificates, licences or permits.",
      },
      {
        q: "Do citizens have rights against a department relying on section 7(b)?",
        a: "Yes. Section 7 provides a lawful basis for processing without consent; it does not disapply Chapter III. The rights to access information about processing, correction and erasure, grievance redressal and nomination all continue to apply, as do purpose limitation, security safeguards and breach notification.",
      },
      {
        q: "What are the Second and Seventh Schedules for?",
        a: "The Second Schedule, via rule 5, sets the standards for State processing under section 7(b). The Seventh Schedule, via rules 23(1) and 8(3), pairs each purpose with the person authorised to act on it and anchors the one-year minimum retention for processing logs. Between them they are the operational detail the Act left to be prescribed.",
      },
    ],
    related: [
      {
        href: routes.rights,
        label: "Rights and duties",
        note: "Chapter III applies under section 7(b)",
      },
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "Second and Seventh Schedules in context",
      },
      {
        href: routes.overview,
        label: "Act overview",
        note: "Where section 7 sits in the structure",
      },
    ],
  },
};

/** A whole industry: menu identity plus content. What the pages render. */
export type Industry = IndustryMenuEntry &
  IndustryContent & { slug: IndustrySlug };

export function getIndustry(slug: IndustrySlug): Industry {
  return { slug, ...INDUSTRY_MENU[slug], ...INDUSTRY_CONTENT[slug] };
}

/**
 * Every industry in menu order.
 *
 * Server-only: this pulls the full content in, so importing it from a client
 * component would undo the split. The client nav imports `INDUSTRY_MENU`.
 */
export const INDUSTRIES: Industry[] = INDUSTRY_SLUGS.map(getIndustry);

/**
 * The three phases a control can belong to.
 *
 * Borrowed from how compliance programmes are actually sequenced rather than
 * invented: get a lawful footing, make it operate, then keep it honest.
 */
export const CONTROL_PHASES: {
  key: ControlPhase;
  title: string;
  blurb: string;
}[] = [
  {
    key: "foundation",
    title: "Build the foundation",
    blurb: "Get the lawful basis and the roles right. Everything else assumes these are settled.",
  },
  {
    key: "operationalise",
    title: "Operationalise it",
    blurb: "Turn the basis into systems that run without anyone remembering to run them.",
  },
  {
    key: "governance",
    title: "Keep it honest",
    blurb: "Prove it still works, and answer the people whose data it is.",
  },
];

/**
 * The implementation journey, derived from the activities.
 *
 * A view, not a second source. Each activity carries one control and the phase
 * it belongs to, so the journey is a grouping rather than a parallel list that
 * can drift out of step with the diagram above it.
 */
export function industryJourney(industry: Industry) {
  return CONTROL_PHASES.map((phase) => ({
    ...phase,
    steps: industry.activities
      .filter((activity) => activity.phase === phase.key)
      .map((activity) => ({
        activity: activity.name,
        control: activity.control,
        evidence: activity.evidence,
      })),
  })).filter((phase) => phase.steps.length > 0);
}

export {
  INDUSTRY_SLUGS,
  industryPath,
  isIndustrySlug,
  type IndustrySlug,
} from "./industries-menu";
