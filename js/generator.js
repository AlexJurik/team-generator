import { shuffleArray } from "./helpers";

export const generateTeams = (selectedPlayers, teamsCount) => {
  if (selectedPlayers.length < teamsCount) {
    throw new Error("Not enough players to form the desired number of teams");
  }

  const goalkeepers = selectedPlayers.filter((player) => !!player.goalkeeper);
  const fieldPlayers = selectedPlayers.filter((player) => !player.goalkeeper);
  const dividedGoalkeepers = getDividedPlayersByCoefficient(goalkeepers);
  const dividedFieldPlayers = getDividedPlayersByCoefficient(fieldPlayers);
  const concatenatedPlayers = [...dividedFieldPlayers, ...dividedGoalkeepers];

  const teams = [];
  let lastIndex = 0;

  while (concatenatedPlayers.length) {
    const playersByCategory = concatenatedPlayers.shift();
    while (playersByCategory.length) {
      const candidate = playersByCategory.shift();
      if (!candidate) {
        break;
      }

      if (!teams[lastIndex]) {
        teams[lastIndex] = [];
      }

      teams[lastIndex].push(candidate);

      lastIndex = (lastIndex + 1) % teamsCount; // Update lastIndex to cycle through the teams
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
