import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Idea Inbox — Liam Callaghan",
  description: "Internal tool for tracking and prioritising AI automation opportunities across a healthcare-tech team.",
};

export default function IdeaInbox() {
  return (
    <CaseStudy
      category="Product Design & AI Development"
      title="Idea Inbox"
      subtitle="AI Opportunity Tracker"
      url="liam-callaghan.com/work/idea-inbox/index.html"
      intro="Most teams have plenty of ideas about where AI could save them time. What they lack is a shared, structured way to capture those ideas, decide which ones are worth acting on, and track whether the results matched the expectation."
      sections={[
        {
          heading: "The Problem",
          body: [
            "When AI tools become widely available, teams generate a flood of automation ideas. But without a system, those ideas live in Slack messages, one-off conversations, and forgotten notes. There's no way to compare them, no visibility into what's being built, and no feedback loop to confirm whether a solution actually delivered the expected value.",
            "Idea Inbox is a lightweight internal tool that solves this across three stages: report an idea, decide which ones to prioritise, and track the real-world results.",
          ],
        },
        {
          heading: "Report",
          body: [
            "Anyone on the team can submit an idea in under a minute. The form captures team, task frequency, time per session, and how many people are involved — from these, it auto-calculates estimated hours saved per month. This creates a consistent, comparable baseline across every idea in the system.",
            "Each idea also gets an AI suggestion generated automatically: an implementation type (automation, AI assistant, AI agent, or not a good fit), a one-sentence approach sketch, and a risk rating with the reasoning behind it.",
          ],
        },
        {
          heading: "Decide",
          body: [
            "Ideas are plotted on a scatter chart: estimated hours saved on the Y-axis, implementation effort on the X-axis. The quick-wins zone — high impact, low effort — is shaded so it's immediately visible which ideas deserve attention first.",
            "An AI engineer sets the effort estimate for each idea, which moves its dot accordingly. The chart updates in real time. No spreadsheet formulas, no manual sorting.",
          ],
        },
        {
          heading: "Results",
          body: [
            "When a solution goes live, the team logs actual hours saved alongside the original estimate. The results page renders a comparison bar for each live solution — full bar width represents the time before, filled proportion represents time saved — making it easy to see whether the AI actually delivered.",
            "The design is intentionally healthcare-appropriate: warm off-white, no dark patterns, clear risk indicators on any idea that involves patient data.",
          ],
        },
      ]}
    />
  );
}
