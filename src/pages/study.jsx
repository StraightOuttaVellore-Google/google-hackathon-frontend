export default function StudyPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-white mb-6 shadow-lg">
                        <span className="text-3xl">📚</span>
                    </div>
                    <h1 className="text-5xl font-bold text-sky-800 dark:text-sky-200 mb-4">
                        Study Mode
                    </h1>
                    <p className="text-xl text-sky-600 dark:text-sky-300 max-w-2xl mx-auto">
                        Focus on your learning goals and boost your productivity with our study tools
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-4">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-200 mb-2">
                            Goal Setting
                        </h3>
                        <p className="text-sky-600 dark:text-sky-300">
                            Set and track your learning objectives
                        </p>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-4">
                            <span className="text-2xl">⏰</span>
                        </div>
                        <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-200 mb-2">
                            Time Management
                        </h3>
                        <p className="text-sky-600 dark:text-sky-300">
                            Organize your study schedule effectively
                        </p>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-sky-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900 flex items-center justify-center mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-xl font-semibold text-sky-800 dark:text-sky-200 mb-2">
                            Progress Tracking
                        </h3>
                        <p className="text-sky-600 dark:text-sky-300">
                            Monitor your learning achievements
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}