const currentLevel = 0;
const unlockedLevel = 0;

export const setCurrentLevel = (level) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentLevel', level);
  }
}

export const getCurrentLevel = () => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('currentLevel')) {
      localStorage.setItem('currentLevel', currentLevel);
    }
    return parseInt(localStorage.getItem('currentLevel', currentLevel));
  }
}

export const setUnlockedLevel = (level) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('unlockedLevel', level);
  }
}

export const getUnlockedLevel = () => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('unlockedLevel')) {
      localStorage.setItem('unlockedLevel', unlockedLevel);
    }
    return parseInt(localStorage.getItem('unlockedLevel', unlockedLevel));
  }
}