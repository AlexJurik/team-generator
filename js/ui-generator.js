import { playersTableBody } from "./components";
import { teamColorClasses } from "./constants";

export const generateCheckboxes = (players) => {
  for (const player of players) {
    // Create cell elements
    const row = document.createElement("tr");
    const checkboxCell = document.createElement("td");
    const identifierCell = document.createElement("th");
    identifierCell.attributes.scope = "row";
    const nameCell = document.createElement("td");
    const coefficientCell = document.createElement("td");
    const goalKeeperCell = document.createElement("td");

    // Create and append text nodes to cell elements
    identifierCell.appendChild(document.createTextNode(player.identifier));
    nameCell.appendChild(document.createTextNode(player.name));
    if (player.goalkeeper) {
      goalKeeperCell.appendChild(document.createTextNode(player.goalkeeper));
    }
    const coefficientBadge = createCoefficientBadgeElement(player);
    coefficientCell.appendChild(coefficientBadge);
    const playerCheckbox = createCheckboxElement(player);
    checkboxCell.appendChild(playerCheckbox);

    // Append cell elements to row
    row.appendChild(checkboxCell);
    row.appendChild(identifierCell);
    row.appendChild(nameCell);
    row.appendChild(coefficientCell);
    row.appendChild(goalKeeperCell);

    // Append row to table body
    playersTableBody.appendChild(row);
  }
};

const createCheckboxElement = (player) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("form-check");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = player.identifier;
  checkbox.classList.add("form-check-input");
  checkboxContainer.appendChild(checkbox);

  return checkboxContainer;
};

const createCoefficientBadgeElement = (player) => {
  const coefficientBadge = document.createElement("span");
  coefficientBadge.classList.add("badge", "rounded-pill");

  switch (player.coefficient) {
    case 1:
      coefficientBadge.classList.add("bg-success");
      break;
    case 2:
      coefficientBadge.classList.add("bg-secondary");
      break;
    case 3:
      coefficientBadge.classList.add("bg-warning");
      break;
    default:
      coefficientBadge.classList.add("bg-danger");
      break;
  }

  coefficientBadge.appendChild(document.createTextNode(player.coefficient));

  return coefficientBadge;
};

export const appendTeamsResult = (teams) => {
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
};
