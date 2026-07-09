import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story Angle Finder — Liam Callaghan",
  description:
    "A creative strategy tool that finds human story angles for brand briefs. Built as a portfolio demo for OTW.",
};

export default function StoryAngleFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
