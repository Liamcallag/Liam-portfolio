import type { Metadata } from "next";
import CaseStudy from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "AI Booking Assistant — Liam Callaghan",
  description: "AI booking assistant for local service businesses — voice to SMS, built on Claude, 46elks, Vapi, and ElevenLabs.",
};

export default function AIBookingAssistant() {
  return (
    <CaseStudy
      category="AI Development & Product Design"
      title="AI Booking Assistant"
      subtitle="For Local Service Businesses"
      intro="Small local service businesses lose real customers every time a call goes unanswered. Most have no way to capture that interest before it goes to a competitor."
      sections={[
        {
          heading: "What I Built, and Why It Changed",
          body: [
            "I started with voice. When a business missed a call, an AI agent would answer, understand what the caller wanted, and collect booking details — service type, date, time — before handing off to staff for confirmation.",
            "The voice assistant was tuned after extensive testing: Deepgram Nova-3 for Swedish transcription, GPT-4o Mini for reasoning, ElevenLabs' multilingual model chosen specifically for pronunciation accuracy over raw speed. I tested it deliberately — ambiguous requests, mid-conversation corrections, background noise, unusual phrasing.",
          ],
        },
        {
          heading: "Where Voice Failed",
          body: [
            "The AI itself worked reasonably well. The surrounding infrastructure didn't. Carrier limitations made Swedish numbers with reliable voice capability difficult to source. Keypad input was inconsistent. End-to-end latency sat around 1,670ms — enough to make conversations feel unnatural.",
            "Rather than keep tuning a system fighting its own foundation, I rebuilt the same core value as an SMS flow.",
          ],
        },
        {
          heading: "The SMS Version",
          body: [
            "The conversation logic — understanding what a customer wants and extracting the right details — carried over almost directly. What changed was the delivery mechanism.",
            "A missed call triggers an SMS to the customer. Claude reads the reply, asks natural follow-up questions, and extracts service type, date, and time. Once complete, it confirms and hands off a structured booking request to staff. Built on a real Swedish number via 46elks, tested end-to-end.",
          ],
          mobileImages: [
            { src: "/work/ai-booking-assistant/sms-conversation.png", alt: "Real SMS conversation on a Swedish number — full booking flow from first message to confirmation" },
          ],
        },
        {
          heading: "What This Actually Demonstrates",
          body: [
            "Building the right thing usually means being willing to abandon the first version once the evidence says so. This project is as much about that decision as the AI itself — recognising that a well-built assistant on the wrong infrastructure isn't a small tuning problem. It's the wrong foundation, and rebuilding is sometimes faster and better than fixing.",
          ],
        },
      ]}
    />
  );
}
