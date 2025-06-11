import { Trophy, Target, Calendar, TrendingUp, BookOpen, Star } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useAccessibility } from '../hooks/useAccessibility';

const dailyTips = [
  "Never share your OTP or PIN with anyone, even if they claim to be from your bank.",
  "Always verify the sender before clicking on links in messages.",
  "Use strong passwords and enable two-factor authentication when available.",
  "Keep your apps updated to get the latest security features.",
  "Be cautious when connecting to public WiFi networks.",
  "Regularly backup your important photos and contacts.",
  "Learn one new digital skill each week to stay confident online."
];

const suggestedTutorials = [
  { id: 'online-banking', title: 'Safe Online Banking', category: 'Security' },
  { id: 'social-media', title: 'Social Media Basics', category: 'Communication' },
  { id: 'email-setup', title: 'Setting up Email', category: 'Communication' },
  { id: 'photo-backup', title: 'Backing up Photos', category: 'Storage' }
];

export function LearningDashboard() {
  const { progress, markDailyTipSeen } = useProgress();
  const { speakText } = useAccessibility();

  const today = new Date().toDateString();
  const todaysTip = dailyTips[new Date().getDay()];
  const hasSeenTodaysTip = progress.dailyTips[today];

  const handleTipSeen = () => {
    markDailyTipSeen(today);
    speakText("Tip marked as read");
  };

  const completionRate = Math.round((progress.completedTutorials.length / 10) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Learning Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your progress and discover new skills</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{progress.completedTutorials.length}</p>
            </div>
            <Trophy className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {progress.viewedTutorials.length - progress.completedTutorials.length}
              </p>
            </div>
            <Target className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{completionRate}%</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learning Streak</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">7 days</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Daily Tip */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-yellow-300" size={24} />
            <h3 className="text-xl font-bold">Today's Digital Safety Tip</h3>
          </div>
          <p className="text-primary-100 mb-4 leading-relaxed">{todaysTip}</p>
          {!hasSeenTodaysTip && (
            <button
              onClick={handleTipSeen}
              className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Mark as Read
            </button>
          )}
        </div>

        {/* Suggested Tutorials */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-primary-500" size={24} />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Suggested for You</h3>
          </div>
          <div className="space-y-3">
            {suggestedTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                onClick={() => speakText(`Tutorial: ${tutorial.title}`)}
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{tutorial.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tutorial.category}</p>
                </div>
                <button className="text-primary-500 hover:text-primary-600 font-medium">
                  Start →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Learning Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Overall Progress</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}