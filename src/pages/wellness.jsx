export default function WellnessPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white mb-6 shadow-lg">
                        <span className="text-3xl">🌿</span>
                    </div>
                    <h1 className="text-5xl font-bold text-teal-800 dark:text-teal-200 mb-4">
                        Wellness Mode
                    </h1>
                    <p className="text-xl text-teal-600 dark:text-teal-300 max-w-2xl mx-auto">
                        Take care of your mind and body with our wellness and mindfulness tools
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                            <span className="text-2xl">🧘</span>
                        </div>
                        <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-2">
                            Meditation
                        </h3>
                        <p className="text-teal-600 dark:text-teal-300">
                            Practice mindfulness and relaxation
                        </p>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                            <span className="text-2xl">💪</span>
                        </div>
                        <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-2">
                            Exercise
                        </h3>
                        <p className="text-teal-600 dark:text-teal-300">
                            Stay active with guided workouts
                        </p>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                            <span className="text-2xl">😌</span>
                        </div>
                        <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-2">
                            Mental Health
                        </h3>
                        <p className="text-teal-600 dark:text-teal-300">
                            Support your emotional wellbeing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}