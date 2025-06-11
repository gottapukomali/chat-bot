import { useState, useEffect } from 'react';

export interface UserProgress {
  completedTutorials: string[];
  viewedTutorials: string[];
  dailyTips: { [date: string]: boolean };
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('user-progress');
    return saved ? JSON.parse(saved) : {
      completedTutorials: [],
      viewedTutorials: [],
      dailyTips: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('user-progress', JSON.stringify(progress));
  }, [progress]);

  const markTutorialViewed = (tutorialId: string) => {
    setProgress(prev => ({
      ...prev,
      viewedTutorials: [...new Set([...prev.viewedTutorials, tutorialId])]
    }));
  };

  const markTutorialCompleted = (tutorialId: string) => {
    setProgress(prev => ({
      ...prev,
      completedTutorials: [...new Set([...prev.completedTutorials, tutorialId])],
      viewedTutorials: [...new Set([...prev.viewedTutorials, tutorialId])]
    }));
  };

  const markDailyTipSeen = (date: string) => {
    setProgress(prev => ({
      ...prev,
      dailyTips: { ...prev.dailyTips, [date]: true }
    }));
  };

  return {
    progress,
    markTutorialViewed,
    markTutorialCompleted,
    markDailyTipSeen
  };
}