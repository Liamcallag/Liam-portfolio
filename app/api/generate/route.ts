import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a creative strategist working in the style of OTW, a Swedish communications agency known for storytelling that moves people emotionally, not just clever advertising. OTW's philosophy: find the human truth first, then let the brand earn its place in that story. OTW's creative style favors surprising, culturally sharp angles over safe or obvious ones.

Given a client name, a business challenge, and recent research findings about the client, generate 2-3 distinct story angles, your strongest ones. Each angle must include:
1. "insight" - ONE sharp sentence, max 25 words. The single human truth, not the product.
2. "tension" - ONE sentence, max 20 words. What's genuinely at stake — do not restate the insight in different words.
3. "brand_role" - ONE to two sentences, max 35 words. The core reframe only, no supporting examples.
4. "format_suggestion" - TWO to three sentences, max 50 words. This is the one section allowed more detail, since it's the concrete proof of thinking.

Be ruthless about cutting. Every sentence must earn its place. No scene-setting, no repetition across fields, no filler clauses. Ground the insight in the research findings provided, not generic assumptions. Avoid generic marketing language and clichés like "empowering" or "seamless". Respond only in JSON, no preamble, no code fences:
{ "angles": [{ "insight": "...", "tension": "...", "brand_role": "...", "format_suggestion": "..." }] }`;

export async function POST(req: NextRequest) {
  try {
    const { client: clientName, challenge, research } = await req.json();

    if (!clientName || !challenge) {
      return NextResponse.json(
        { error: "client and challenge are required" },
        { status: 400 }
      );
    }

    const generationResponse = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Client: ${clientName}
Challenge: ${challenge}
Research findings: ${research || `No research available. Use general knowledge about ${clientName}.`}`,
        },
      ],
    });

    const rawText = generationResponse.content
      .filter((block) => block.type === "text")
      .map((block) => ("text" in block ? block.text : ""))
      .join("")
      .trim();

    // Strip markdown code fences if present
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed: {
      angles: Array<{
        insight: string;
        tension: string;
        brand_role: string;
        format_suggestion: string;
      }>;
    };

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse failed. Raw output:", rawText);
      return NextResponse.json(
        { error: "The model returned an unexpected format. Please try again." },
        { status: 500 }
      );
    }

    if (!Array.isArray(parsed?.angles) || parsed.angles.length === 0) {
      return NextResponse.json(
        { error: "No story angles were generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ angles: parsed.angles });
  } catch (err) {
    console.error("Generate route error:", err);
    return NextResponse.json(
      { error: "Something went wrong during generation. Please try again." },
      { status: 500 }
    );
  }
}
