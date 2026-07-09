import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { client: clientName, challenge } = await req.json();

    if (!clientName || !challenge) {
      return NextResponse.json(
        { error: "client and challenge are required" },
        { status: 400 }
      );
    }

    try {
      const researchResponse = await client.beta.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        betas: ["web-search-2025-03-05"],
        tools: [
          {
            type: "web_search_20250305" as const,
            name: "web_search",
            max_uses: 3,
          },
        ],
        messages: [
          {
            role: "user",
            content: `Search for 2-3 current, concrete facts about ${clientName} relevant to this business challenge: "${challenge}".

Focus on: recent campaigns, market positioning shifts, public sentiment, competitor moves, or relevant cultural moments from the past 12-18 months. Report only verified findings — no opinions or speculation. Keep it tight: 3-5 sentences total.`,
          },
        ],
      });

      // Parse content blocks by type — never assume array position
      const research = researchResponse.content
        .filter((block) => block.type === "text")
        .map((block) => ("text" in block ? block.text : ""))
        .join(" ")
        .trim();

      return NextResponse.json({ research });
    } catch (searchError) {
      console.warn("Web search failed, returning fallback:", searchError);
      return NextResponse.json({
        research: `No live search results available. Use general knowledge about ${clientName}'s positioning and the challenge: "${challenge}".`,
      });
    }
  } catch (err) {
    console.error("Research route error:", err);
    return NextResponse.json(
      { error: "Something went wrong during research. Please try again." },
      { status: 500 }
    );
  }
}
