import { Hero } from "../components/Hero";
import { Analytics } from "../components/Analytics";
import { AIIntelligence } from "../components/AIIntelligence";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <Analytics />
      <AIIntelligence />
    </div>
  );
}
