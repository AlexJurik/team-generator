import { generateTeams } from "./generator";
import { getSelectedPlayers } from "./helpers";
import { getPlayers } from "./storage";
import { appendTeamsResult } from "./ui-generator";

const generateTeamsBtn = document.getElementById("generateTeamsBtn");
const randomizeBtn = document.getElementById("randomizeBtn");
const teamResultContainerDiv = document.getElementById("teamResultContainerDiv");
const teamResultTitle = document.getElementById("teamResultTitle");
const amountOfTeamsInput = document.getElementById("amountOfTeamsInput");

generateTeamsBtn.addEventListener("click", () => {
  runGenerator();

  if (teamResultTitle.classList.contains("d-none")) {
    teamResultTitle.classList.remove("d-none");
  }
});

randomizeBtn.addEventListener("click", () => runGenerator());

const runGenerator = () => {
  try {
    const players = getPlayers();
    const teams = generateTeams(getSelectedPlayers(players), +amountOfTeamsInput.value);
    appendTeamsResult(teams);
    teamResultContainerDiv.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    alert(error.message);
  }
};
