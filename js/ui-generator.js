import { playersCheckboxesContainer } from "./components";
import { sortPlayersAccordingToAttendance } from "./sorter";

export function generateCheckboxes(players) {
  const sortedPlayers = sortPlayersAccordingToAttendance(players);
  for (const player of sortedPlayers) {
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("form-check");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = player.identifier;
    checkbox.classList.add("form-check-input");
    checkboxContainer.appendChild(checkbox);

    const label = document.createElement("label");
    label.htmlFor = player.identifier;
    label.classList.add("form-check-label");
    label.appendChild(document.createTextNode(player.name));
    checkboxContainer.appendChild(label);

    playersCheckboxesContainer.appendChild(checkboxContainer);
  }
}
