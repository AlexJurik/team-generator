import * as XLSX from "xlsx";
import { Player } from "./player";
import { generateTeams } from "./generator";
import { generateCheckboxes } from "./ui-generator";
import {
  amountOfTeamsInput,
  amountOfTeamsStep,
  clearExcelBtn,
  excelFileInput,
  nextStepBtn,
  playersSelectStep,
  playersTableBody,
} from "./components";

let players = [];

function handleFileInput() {
  const file = excelFileInput.files[0];
  new bootstrap.Collapse(playersSelectStep).show();

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        defval: undefined,
        header: ["identifier", "name", "coefficient", "goalkeeper"],
      });

      if (!jsonData.length) {
        return;
      }

      jsonData.splice(0, 1);

      players = jsonData.map(
        (row) => new Player(row["identifier"], row["name"], row["coefficient"], row["goalkeeper"]),
      );

      generateCheckboxes(players);
    };

    reader.readAsArrayBuffer(file);
  }
}

excelFileInput.addEventListener("change", () => {
  handleFileInput();
  resetPlayers();
  if (excelFileInput.files.length) {
    window.addEventListener("beforeunload", beforeUnloadHandler);
  } else {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
  }
});
nextStepBtn.addEventListener("click", () => new bootstrap.Collapse(amountOfTeamsStep).show());
generateTeamsBtn.addEventListener("click", () => {
  generateTeams(players, +amountOfTeamsInput.value);
  new bootstrap.Collapse(generatedTeamsStep).show();
});
clearExcelBtn.addEventListener("click", () => {
  excelFileInput.value = "";
  resetPlayers();
});

function resetPlayers() {
  players = [];
  playersTableBody.innerHTML = "";
}

function beforeUnloadHandler(event) {
  event.preventDefault();
  event.returnValue = "";
  const confirmationMessage = "Are you sure you want to leave this page? You will lose your progress.";
  return confirmationMessage;
}
