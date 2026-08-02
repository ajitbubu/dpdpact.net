import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Know the law. Prove it.`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // Paper, so the OS chrome blends into the sticky masthead rather than
    // banding against it.
    background_color: "#F5F5F2",
    theme_color: "#F5F5F2",
    orientation: "any",
    lang: "en-IN",
    dir: "ltr",
    categories: ["education", "reference", "books"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Full text reader",
        short_name: "Read the Act",
        url: "/reader",
        description: "All 44 sections and the Schedule",
      },
      {
        name: "Practice test",
        short_name: "Practice",
        url: "/practice-test",
        description: "Ten questions with explanations",
      },
      {
        name: "Certification exam",
        short_name: "Exam",
        url: "/exam",
        description: "Fifteen questions, twenty minutes",
      },
    ],
  };
}
