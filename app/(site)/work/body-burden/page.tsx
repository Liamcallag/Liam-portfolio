import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Body Burden — Liam Callaghan",
  description: "Microplastics Exposure Calculator — design case study.",
};

export default function BodyBurden() {
  return (
    <CaseStudy
      category="Product Design & Development"
      title="Body Burden"
      subtitle="Microplastics Exposure Calculator"
      url="bodyburdenlab.com"
      intro="Microplastics research is everywhere, but scattered across dozens of academic papers with no accessible way for regular people to understand their personal exposure. I wanted to build a tool that gathered this science in one place — not for researchers, but for anyone curious about their own habits."
      heroImage={{ src: "/work/body-burden/bb-homepage.png", alt: "Body Burden homepage" }}
      heroCrop
      secondaryImage={{ src: "/work/body-burden/bb-result.png", alt: "Results page with pie chart" }}
      sections={[
        {
          heading: "The Design Challenge",
          body: "The core challenge wasn't visual — it was scientific. My original concept was a single cumulative exposure score: input your habits, get a total number. Clean, simple, satisfying. It also turned out to be wrong.",
          image: { src: "/work/body-burden/bb-calculator.png", alt: "Calculator question screen" },
        },
        {
          heading: "The Pivot",
          body: [
            "I reached out to a microplastics researcher to validate the methodology. Her response was direct.",
            "She pushed back with two questions: what problem does the tool solve, and what problem does it create? The issue was real — studies measuring exposure from different sources use fundamentally different methodologies, so adding them into one score would look scientific without being scientific.",
            "I restructured the calculator around independent exposure categories — Kitchen & Cooking, Food & Diet, Drinking Water, Air & Environment — each scored using methodology-appropriate studies, instead of one misleading total.",
          ],
          pullQuote: {
            text: "It is a cute tool but it carries the illusion of a scientific accuracy which it doesn't (and cannot) offer.",
            attribution: "— microplastics researcher",
          },
        },
        {
          heading: "The Detail That Shows the Thinking",
          body: "Every exposure card displays a different unit — per use, per cup, per year, per session. This isn't inconsistency, it's the scientific constraint made visible. The studies measure exposure differently by definition, so combining them into a single number would be meaningless. The design makes that honest without ever explaining it to the user.",
        },
        {
          heading: "Outcome",
          body: "Launched April 2026. Referenced by youthclimateleader.org as a student resource, validating the scientific credibility of the approach.",
          mobileImages: [
            { src: "/work/body-burden/bb-phone-result-1.png", alt: "Mobile — score" },
            { src: "/work/body-burden/bb-phone-result-2.png", alt: "Mobile — category detail" },
            { src: "/work/body-burden/bb-phone-calculalator.png", alt: "Mobile — calculator" },
          ],
        },
      ]}
    />
  );
}
