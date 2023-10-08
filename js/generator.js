import { teamResultContainerDiv } from "./components";
import { teamColorClasses } from "./constants";

export function generateTeams(players, teamsCount) {
  const selectedPlayers = [];

  for (const player of players) {
    const checkbox = document.getElementById(player.identifier);
    if (checkbox.checked) {
      selectedPlayers.push(player);
    }
  }

  const sortedSelectedPlayers = sortPlayersAccordingToCoefficient(selectedPlayers);
  const teams = [];
  const copyOfSortedSelectedPlayers = [...sortedSelectedPlayers];

  // while there are players in sortedSelectedPlayers shift the first one and push it to the first team, then to the second team and so on
  while (copyOfSortedSelectedPlayers.length) {
    for (let i = 0; i < teamsCount; i++) {
      const candidate = copyOfSortedSelectedPlayers.shift();
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
    teamResultContainerDiv.removeChild(teamResult.firstChild);
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
