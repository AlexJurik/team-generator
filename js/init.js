import { getPlayers } from "./storage";
import { generatePlayerRows } from "./ui-generator";

/*
 * When document is ready get players from localstorage and append them to table
 */
document.addEventListener("DOMContentLoaded", () => {
  const players = getPlayers();
  const playerRows = generatePlayerRows(players);
  playersTableBody.append(...playerRows);
});
