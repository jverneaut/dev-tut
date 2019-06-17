const currentLevel = 0;
const unlockedLevel = 0;

export const setCurrentLevel = (level) => {
  localStorage.setItem('currentLevel', level);
}

export const getCurrentLevel = () => {
  if (!localStorage.getItem('currentLevel')) {
    localStorage.setItem('currentLevel', currentLevel);
  }
  return parseInt(localStorage.getItem('currentLevel', currentLevel));
}

export const setUnlockedLevel = (level) => {
  localStorage.setItem('unlockedLevel', level);
}

export const getUnlockedLevel = () => {
  if (!localStorage.getItem('unlockedLevel')) {
    localStorage.setItem('unlockedLevel', unlockedLevel);
  }
  return parseInt(localStorage.getItem('unlockedLevel', unlockedLevel));
}