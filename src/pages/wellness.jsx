import WellnessMoodBoardWidget from "./wellness_moodboard";
import Community from "../components/Community";
import World from "../components/World";
import Pathways from "../components/Pathways";

export default function WellnessPage() {
  return (
    <div>
      <WellnessMoodBoardWidget />
      <div className="px-6 py-3 flex gap-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-1/5 h-96">
          <Community />
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-1/5 h-96">
          <World />
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-3/5 h-96">
          <Pathways />
        </div>
      </div>
    </div>
  );
}