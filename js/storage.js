import { Player } from "./player";

export const savePlayers = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
  window.dispatchEvent(playersChangedEvent);
};

export const getPlayers = () => {
  const players = localStorage.getItem("players");

  if (players) {
    return JSON.parse(players).map((p) => new Player(p.identifier, p.name, p.coefficient, p.goalkeeper));
  }

  return [];
};

export const savePlayer = (player) => {
  const players = getPlayers();
  players.push(player);
  savePlayers(players);
  return players.length;
};

export const deletePlayer = (identifier) => {
  const players = getPlayers();
  const index = players.findIndex((p) => p.identifier === identifier);
  players.splice(index, 1);
  savePlayers(players);
  return players.length;
};

export const deletePlayers = () => {
  localStorage.removeItem("players");
  window.dispatchEvent(playersChangedEvent);
};

const playersChangedEvent = new CustomEvent("playersChanged");
