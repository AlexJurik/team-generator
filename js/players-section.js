import { generatePlayerRows } from "./ui-generator";
import * as XLSX from "xlsx";
import { Player } from "./player";
import { deletePlayer, deletePlayers, getPlayers, savePlayer, savePlayers } from "./storage";

const addPlayerForm = document.getElementById("addPlayerForm");
const showExampleBtn = document.getElementById("showExampleBtn");
const showExampleBtnTitle = document.getElementById("showExampleBtnTitle");
const excelSample = document.getElementById("excelSample");
const playersTableBody = document.getElementById("playersTableBody");
const importExcelTriggerBtn = document.getElementById("importExcelTriggerBtn");
const excelFileInput = document.getElementById("excelFileInput");
const resetBtn = document.getElementById("resetBtn");
const nextStepBtn = document.getElementById("nextStepBtn");
const amountOfTeamsStep = document.getElementById("amountOfTeamsStep");
const selectAllPlayersCheckbox = document.getElementById("selectAllPlayersCheckbox");

showExampleBtn.addEventListener("click", () => {
  if (excelSample.style.display === "block") {
    showExampleBtnTitle.innerText = "Show sample";
    excelSample.style.display = "none";
  } else {
    showExampleBtnTitle.innerText = "Hide sample";
    excelSample.style.display = "block";
  }
});

importExcelTriggerBtn.addEventListener("click", () => {
  excelFileInput.click();
});

const handleFileInput = () => {
  const file = excelFileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        defval: undefined,
        header: ["name", "coefficient", "goalkeeper"],
      });

      if (!jsonData.length) {
        return;
      }

      jsonData.splice(0, 1);

      const players = jsonData.map(
        (row) => new Player(crypto.randomUUID(), row["name"], row["coefficient"], row["goalkeeper"]),
      );

      const playerRows = generatePlayerRows(players);
      savePlayers(players);
      playersTableBody.append(...playerRows);
    };

    reader.readAsArrayBuffer(file);
  }
};

excelFileInput.addEventListener("change", () => {
  handleFileInput();
});

/*
 * Delete button event listener.
 */
playersTableBody.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target.classList.contains("delete-player-button") ||
    target.parentElement.classList.contains("delete-player-button")
  ) {
    const row = target.closest("tr");
    const identifier = row.dataset.identifier;
    deletePlayer(identifier);
    playersTableBody.removeChild(row);
  }
});

// listen to addPlayerForm and add new player to players array
addPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const coefficient = +formData.get("coefficient");
  const goalkeeper = +formData.get("goalkeeper");
  const player = new Player(crypto.randomUUID(), name, coefficient, goalkeeper);
  savePlayer(player);
  const rows = generatePlayerRows([player]);
  playersTableBody.append(...rows);
  addPlayerForm.reset();
});

resetBtn.addEventListener("click", () => {
  deletePlayers();
  deletePlayersRows();
  excelFileInput.value = "";
});

const deletePlayersRows = () => {
  const players = document.querySelectorAll("[data-identifier]");
  players.forEach((player) => {
    playersTableBody.removeChild(player);
  });
};

selectAllPlayersCheckbox.addEventListener("change", (event) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
});

nextStepBtn.addEventListener("click", () => {
  if (getPlayers().length) {
    new bootstrap.Collapse(amountOfTeamsStep).show();
  } else {
    alert("Please add players first.");
  }
});
