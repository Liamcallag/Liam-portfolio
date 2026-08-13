import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "AI Outreach Agent — Liam Callaghan",
  description: "AI Outreach Pipeline for Body Burden Lab — case study.",
};

export default function BacklinkAgent() {
  return (
    <CaseStudy
      category="Product Design & AI Development"
      title="AI Outreach Agent"
      subtitle="AI Outreach Pipeline"
      intro="Backlinks are the single biggest factor in search ranking. Body Burden Lab was struggling to reach the first page of search results, and manual outreach — finding relevant sites, locating contact details, writing personalised emails — is slow and doesn't scale."
      heroImage={{ src: "/work/backlink-agent/agent-dashboard-v2.png", alt: "Backlink Agent dashboard" }}
      sections={[
        {
          heading: "The Solution",
          body: [
            "An AI agent that automates the entire outreach pipeline. It finds relevant websites that could credibly link to Body Burden, explains why each is a good candidate, locates contact emails, and drafts personalised outreach messages.",
            "A Next.js dashboard tracks every target through each stage — found, email located, draft ready, sent, replied, linked.",
          ],
        },
        {
          heading: "Why I Built This",
          body: "Many AI-adjacent design roles list knowledge of AI agents as a requirement. Rather than study this in isolation, I found a real problem my own product had and built the solution. The agent runs on the Anthropic API, stores data in Supabase, and is deployed on Vercel.",
        },
        {
          heading: "Dashboard Design Decisions",
          body: [
            "The interface needed to communicate pipeline state at a glance. Six metrics across the top — targets found, emails found, drafts ready, sent, replied, linked — give an immediate status overview.",
            "Each target seen in the image above was selected based on relevance to microplastics and environmental health. The table surfaces why each site was chosen, its contact status, and outreach status. The goal was making a complex multi-step process scannable without hiding the reasoning behind it.",
          ],
          image: { src: "/work/backlink-agent/pipeline-stats.png", alt: "Pipeline stats — targets, emails, drafts, sent, replied, linked" },
        },
        {
          heading: "No Templates",
          body: "The agent doesn't send templates — it reads each target site and writes a contextually specific pitch. This is a real draft generated for The ESG Institute, a small-team blog actively publishing content on microplastic health impacts.",
          image: { src: "/work/backlink-agent/email-draft-v2.png", alt: "AI-generated email draft for The ESG Institute" },
        },
        {
          heading: "What This Shows",
          body: "This project started from a real problem in a product I'd already shipped — not a hypothetical brief. The agent handles the parts that don't scale manually: finding relevant sites, understanding why each is a credible fit, and drafting a genuinely specific pitch instead of a template. The architecture isn't tied to Body Burden specifically — it could run outreach for any content-based site with the same target-and-context logic.",
        },
      ]}
    />
  );
}
