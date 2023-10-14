import { playersTableBody } from "./components";

export function generateCheckboxes(players) {
  for (const player of players) {
    const row = document.createElement("tr");
    const checkboxCell = document.createElement("td");
    const identifierCell = document.createElement("th");
    identifierCell.attributes.scope = "row";
    const nameCell = document.createElement("td");
    const coefficientCell = document.createElement("td");
    const goalKeeperCell = document.createElement("td");
    identifierCell.appendChild(document.createTextNode(player.identifier));
    nameCell.appendChild(document.createTextNode(player.name));
    if (player.goalkeeper) {
      goalKeeperCell.appendChild(document.createTextNode(player.goalkeeper));
    }
    const coefficientBadge = createCoefficientBadge(player);
    coefficientCell.appendChild(coefficientBadge);
    const playerCheckbox = createCheckbox(player);
    checkboxCell.appendChild(playerCheckbox);

    row.appendChild(checkboxCell);
    row.appendChild(identifierCell);
    row.appendChild(nameCell);
    row.appendChild(coefficientCell);
    row.appendChild(goalKeeperCell);

    playersTableBody.appendChild(row);
  }
}

function createCheckbox(player) {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("form-check");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = player.identifier;
  checkbox.classList.add("form-check-input");
  checkboxContainer.appendChild(checkbox);

  return checkboxContainer;
}

function createCoefficientBadge(player) {
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
}
