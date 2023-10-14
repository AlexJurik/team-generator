import { teamResultContainerDiv } from "./components";
import { teamColorClasses } from "./constants";
import { sortPlayersAccordingToCoefficient } from "./sorter";

export function generateTeams(players, teamsCount) {
  const selectedPlayers = [];

  for (const player of players) {
    const checkbox = document.getElementById(player.identifier);
    if (checkbox.checked) {
      selectedPlayers.push(player);
    }
  }

  const goalkeepers = selectedPlayers.filter((player) => !!player.goalkeeper);
  const fieldPlayers = selectedPlayers.filter((player) => !player.goalkeeper);
  const sortedGoalkeepers = sortPlayersAccordingToCoefficient(goalkeepers);
  const sortedPlayers = sortPlayersAccordingToCoefficient(fieldPlayers);
  const teams = [];
  const copyOfSortedGoalkeepers = [...sortedGoalkeepers];
  const copyOfSortedPlayers = [...sortedPlayers];

  let lastIndex = 0;
  // while there are players in sortedSelectedPlayers shift the first one and push it to the first team, then to the second team and so on
  while (copyOfSortedPlayers.length) {
    for (let i = 0; i < teamsCount; i++) {
      const candidate = copyOfSortedPlayers.shift();
      if (!candidate) {
        break;
      }

      if (!teams[i]) {
        teams[i] = [];
      }
      teams[i].push(candidate);

      lastIndex = i;
    }
  }

  while (copyOfSortedGoalkeepers.length) {
    for (let i = lastIndex + 1; i < teamsCount; i++) {
      const candidate = copyOfSortedGoalkeepers.shift();
      if (!candidate) {
        break;
      }

      if (!teams[i]) {
        teams[i] = [];
      }
      teams[i].push(candidate);
    }
  }

  if (teamResultContainerDiv.firstChild) {
    teamResultContainerDiv.removeChild(teamResultContainerDiv.firstChild);
  }

  const listGroup = document.createElement("ul");
  listGroup.classList.add("list-group");

  const copyOfTeamColors = [...teamColorClasses];

  for (const team of teams) {
    const teamColor = copyOfTeamColors.shift();
    for (const player of team) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.classList.add(teamColor);
      listItem.innerText = player.name;
      listGroup.appendChild(listItem);
    }
  }

  teamResultContainerDiv.appendChild(listGroup);
}
