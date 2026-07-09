import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Florida Driving Ranges — Liam Callaghan",
  description: "Niche Directory — design and build case study.",
};

export default function FloridaDrivingRanges() {
  return (
    <CaseStudy
      category="Product Design & SEO"
      title="Florida Driving Ranges"
      subtitle="Niche Directory"
      url="floridadrivingranges.com"
      intro="Directory websites can generate passive income through display advertising — but most niches are saturated. The research question was: what are people actively searching for where the existing content is thin?"
      heroImage={{ src: "/work/florida-driving-ranges/fdr-homepage.png", alt: "Florida Driving Ranges homepage" }}
      sections={[
        {
          heading: "The Opportunity",
          body: "Golf in Florida checked every box. High search volume, a warm climate that makes it a year-round activity, a strong tourist market, and ad revenue rates that outperform European traffic significantly. Existing driving range directories existed but were surface-level — no information about grass tees versus mats, no technology filters, no amenities. That gap was the opportunity.",
        },
        {
          heading: "Building the Dataset",
          body: [
            "257 listings were scraped using Outscraper and refined in Google Sheets. But the data that mattered — grass tees or mats, restaurant on site, TrackMan or TopTracer technology, dress code — couldn't be scraped. That required going through each listing manually, checking websites and Google Maps images one by one.",
            "It was inefficient. If building this again, the data enrichment process would be automated using an AI agent — something that became possible later in the project.",
          ],
          image: { src: "/work/florida-driving-ranges/fdr-map.png", alt: "Map view with filters" },
        },
        {
          heading: "UX Decisions",
          body: [
            "The map view was prioritised over a list for one specific reason: the site has limited photography due to copyright constraints. An interactive map with filterable pins compensates for that — it gives users a spatial, visual way to browse without needing images.",
            "The filter set came from research before a single line of code was written. Reddit threads about driving ranges revealed that golfers care strongly about two things beyond location: whether the range uses grass tees or mats, and whether it has TrackMan or TopTracer technology. Both were built into the filter system from the start.",
          ],
          image: { src: "/work/florida-driving-ranges/fdr-listing.png", alt: "Individual listing page" },
        },
        {
          heading: "An Unexpected User Insight",
          body: "After launching, feedback from Florida golf Facebook groups surfaced an insight that reframed the target user. One commenter noted that locals already have their regular spots — but tourists visiting Florida and looking for a range that matches their preferences have no easy resource. That shifted the positioning: the site is most valuable as a tourist planning tool, not a local discovery tool.",
        },
        {
          heading: "Outcome",
          body: "130+ clicks per month and growing through organic search.",
          mobileImages: [
            { src: "/work/florida-driving-ranges/fdr-phone-homepage.png", alt: "Mobile homepage" },
            { src: "/work/florida-driving-ranges/fdr-phone-map.png", alt: "Mobile map" },
            { src: "/work/florida-driving-ranges/fdr-phone-listing.png", alt: "Mobile listing" },
          ],
        },
      ]}
    />
  );
}
