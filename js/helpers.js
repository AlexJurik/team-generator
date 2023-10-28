export const beforeUnloadHandler = (event) => {
  event.preventDefault();
  event.returnValue = "";
  return "Are you sure you want to leave this page? You will lose your progress.";
};

export const getSelectedPlayers = (players) => {
  const selectedPlayers = [];

  for (const player of players) {
    const checkbox = document.getElementById(player.identifier);
    if (checkbox.checked) {
      selectedPlayers.push(player);
    }
  }

  return selectedPlayers;
};

export const shuffleArray = (arr) => {
  if (!arr.length) {
    return [];
  }

  if (arr.length === 1) {
    return arr;
  }

  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }

  return copy;
};

export const getTeamTotalCoefficient = (team) => {
  return team.reduce((accumulator, player) => accumulator + player.coefficient, 0);
};
