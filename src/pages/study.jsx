import MoodBoardWidget from "./moodboard";
import PomodoroTimer from "./study_page_components/pomodoroTimer";
import SoundPlayer from "./study_page_components/SoundPlayer";
import EisenhowerMatrix from "../components/EisenhowerMatrix";

export default function StudyPage() {
  return (
    <div>
      <MoodBoardWidget />
      <div className="px-6 py-3 flex gap-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-1/5 h-96">
          <PomodoroTimer />
        </div>
        <div className="rounded-2xl shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-1/5 h-96">
          <SoundPlayer />
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 w-3/5 h-96 ">
          <EisenhowerMatrix />
        </div>
      </div>
    </div>
  );
}
