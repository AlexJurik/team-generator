import { getPlayers } from "./storage";
import { generatePlayerRows } from "./ui-generator";

/*
 * When document is ready get players from localstorage and append them to table
 */
document.addEventListener("DOMContentLoaded", () => {
  const playersTableBody = document.getElementById("playersTableBody");
  const totalPlayersSpan = document.getElementById("totalPlayers");
  const coefficientInput = document.getElementById("coefficientInput");
  coefficientInput.value = 1;
  const players = getPlayers();
  const playerRows = generatePlayerRows(players);
  totalPlayersSpan.innerText = players.length;
  playersTableBody.append(...playerRows);
});
