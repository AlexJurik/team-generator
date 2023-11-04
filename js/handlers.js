import { getPlayers } from "./storage";

export const beforeUnloadHandler = (event) => {
  event.preventDefault();
  event.returnValue = "";
  return "Are you sure you want to leave this page? You will lose your progress.";
};

window.addEventListener("playersChanged", (event) => {
  const players = getPlayers();
  const playersCount = players.length;
  if (playersCount > 0) {
    window.addEventListener("beforeunload", beforeUnloadHandler);
  } else {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  }
});
