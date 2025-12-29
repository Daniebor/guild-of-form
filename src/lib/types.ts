export type Mission = {
  id: string;
  title: string;
  xp: number;
  intel: string;
  task: string;
};

export type BossFight = {
  title: string;
  xp: number;
  test: string;
  winCondition: string;
};

export type TrainingMontage = {
  title: string;
  xp: number;
  drill: string;
};

export type Chapter = {
  id: string;
  title: string;
  goal: string;
  missions: Mission[];
  trainingMontage?: TrainingMontage;
  boss: BossFight;
};

export type Path = {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
};

export type DailyQuest = {
  id: string;
  text: string;
  category: 'foundation' | 'organic' | 'hardsurface' | 'stylized' | 'maker' | 'mastery';
  xp: number;
};
