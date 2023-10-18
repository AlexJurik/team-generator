import { shuffleArray } from "./helpers";

export const generateTeams = (selectedPlayers, teamsCount) => {
  const goalkeepers = selectedPlayers.filter((player) => !!player.goalkeeper);
  const fieldPlayers = selectedPlayers.filter((player) => !player.goalkeeper);
  const dividedGoalkeepers = getDividedPlayersByCoefficient(goalkeepers);
  const dividedFieldPlayers = getDividedPlayersByCoefficient(fieldPlayers);
  const concatenatedPlayers = [...dividedFieldPlayers, ...dividedGoalkeepers];

  const teams = [];

  // while there are players in sortedSelectedPlayers shift the first one and push it to the first team, then to the second team and so on
  while (concatenatedPlayers.length) {
    const playersByCategory = concatenatedPlayers.shift();
    while (playersByCategory.length) {
      for (let i = 0; i < teamsCount; i++) {
        const candidate = playersByCategory.shift();
        if (!candidate) {
          break;
        }

        if (!teams[i]) {
          teams[i] = [];
        }
        teams[i].push(candidate);
      }
    }
  }

  return teams;
};

const getDividedPlayersByCoefficient = (players) => {
  const dividedPlayers = {};
  for (const player of players) {
    if (!dividedPlayers[player.coefficient]) {
      dividedPlayers[player.coefficient] = [];
    }
    dividedPlayers[player.coefficient].push(player);
  }

  const concatedArray = [];
  for (const key of Object.keys(dividedPlayers).sort()) {
    concatedArray.push(shuffleArray(dividedPlayers[key]));
  }

  return concatedArray;
};
