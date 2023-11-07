import { teamColorClasses } from "./constants";
import { getTeamTotalCoefficient } from "./helpers";

export const generatePlayerRows = (players) => {
  const playerRows = [];
  for (const player of players) {
    // Create cell elements
    const row = document.createElement("tr");
    const checkboxCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const coefficientCell = document.createElement("td");
    const goalKeeperCell = document.createElement("td");
    const actionCell = document.createElement("td");

    // Create and append text nodes to cell elements
    nameCell.appendChild(document.createTextNode(player.name));
    if (player.goalkeeper) {
      const goalkeeperBadge = createCoefficientBadgeElement(player.goalkeeper);
      goalKeeperCell.appendChild(goalkeeperBadge);
    }
    const coefficientBadge = createCoefficientBadgeElement(player.coefficient);
    coefficientCell.appendChild(coefficientBadge);
    const playerCheckbox = createCheckboxElement(player);
    checkboxCell.appendChild(playerCheckbox);
    const deleteBtn = createDeleteButtonElement(player);
    actionCell.appendChild(deleteBtn);

    // Append cell elements to row
    row.appendChild(checkboxCell);
    row.appendChild(nameCell);
    row.appendChild(coefficientCell);
    row.appendChild(goalKeeperCell);
    row.appendChild(actionCell);
    row.dataset.identifier = player.identifier;

    // Append row to table body
    playerRows.push(row);
  }

  return playerRows;
};

const createDeleteButtonElement = (player) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger", "delete-player-button");
  deleteBtn.ariaLabel = "Delete row";
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("bi", "bi-trash");
  deleteBtn.appendChild(trashIcon);

  return deleteBtn;
};

const createCheckboxElement = (player) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("form-check");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = player.identifier;
  checkbox.checked = true;
  checkbox.classList.add("form-check-input");
  checkboxContainer.appendChild(checkbox);

  return checkboxContainer;
};

const createCoefficientBadgeElement = (coefficient) => {
  const coefficientBadge = document.createElement("span");
  coefficientBadge.classList.add("badge", "rounded-pill");

  switch (coefficient) {
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

  coefficientBadge.appendChild(document.createTextNode(coefficient));

  return coefficientBadge;
};

export const appendTeamsResult = (teams) => {
  const teamResultContainerDiv = document.getElementById("teamResultContainerDiv");
  // Reset teams result container
  teamResultContainerDiv.innerHTML = "";

  const copyOfTeamColors = [...teamColorClasses];

  let row = document.createElement("div");
  row.classList.add("row", "mt-3");

  let teamIndex = 0;

  for (const team of teams) {
    const teamColor = copyOfTeamColors.shift();
    const teamCard = generateTeamCard(team, teamColor, teamIndex);
    row.appendChild(teamCard);
    teamIndex++;

    if (teamIndex % 3 === 0) {
      teamResultContainerDiv.appendChild(row);
      row = document.createElement("div");
      row.classList.add("row", "mt-3");
    }
  }

  if (teamIndex % 3 !== 0) {
    teamResultContainerDiv.appendChild(row);
  }
};

const generateTeamCard = (team, teamColor, teamIndex) => {
  const col = document.createElement("div");
  col.classList.add("col-4");

  const teamCard = document.createElement("div");
  teamCard.classList.add("card");

  // Header
  const teamCardHeader = document.createElement("div");
  teamCardHeader.classList.add("card-header", teamColor);

  const teamCardHeaderContainer = document.createElement("div");
  teamCardHeaderContainer.classList.add("d-flex", "justify-content-between", "align-items-center");

  const teamCardTitle = document.createElement("span");
  teamCardTitle.innerText = `Team ${teamIndex + 1}`;

  const teamCardBadge = document.createElement("span");
  teamCardBadge.classList.add("badge", "bg-secondary", "rounded-pill");
  teamCardBadge.innerText = getTeamTotalCoefficient(team);

  teamCardHeaderContainer.appendChild(teamCardTitle);
  teamCardHeaderContainer.appendChild(teamCardBadge);
  teamCardHeader.appendChild(teamCardHeaderContainer);

  // Body
  const teamCardBody = document.createElement("ul");
  teamCardBody.classList.add("list-group", "list-group-flush");

  for (const player of team) {
    const teamCardItem = document.createElement("li");
    teamCardItem.classList.add("list-group-item");
    teamCardItem.innerText = `${player.name} (${player.coefficient})`;
    teamCardBody.appendChild(teamCardItem);
  }

  teamCard.appendChild(teamCardHeader);
  teamCard.appendChild(teamCardBody);
  col.appendChild(teamCard);

  return col;
};
