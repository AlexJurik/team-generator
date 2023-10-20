import * as XLSX from "xlsx";
import { Player } from "./player";
import { generateTeams } from "./generator";
import { appendTeamsResult, generateCheckboxes } from "./ui-generator";
import {
  amountOfTeamsInput,
  amountOfTeamsStep,
  clearExcelBtn,
  excelFileInput,
  nextStepBtn,
  playersSelectStep,
  randomizeBtn,
  selectAllPlayersCheckbox,
} from "./components";
import { beforeUnloadHandler, getSelectedPlayers } from "./helpers";

let players = [];

const handleFileInput = () => {
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
};

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
  runGenerator();
  randomizeBtn.style.display = "block";
});

clearExcelBtn.addEventListener("click", () => {
  excelFileInput.value = "";
  resetPlayers();
});

selectAllPlayersCheckbox.addEventListener("change", (event) => {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
});

randomizeBtn.addEventListener("click", () => runGenerator());

const runGenerator = () => {
  try {
    const teams = generateTeams(getSelectedPlayers(players), +amountOfTeamsInput.value);
    appendTeamsResult(teams);
  } catch (error) {
    alert(error.message);
  }
};

const resetPlayers = () => {
  players = [];
  playersTableBody.innerHTML = "";
  teamResultContainerDiv.innerHTML = "";
  randomizeBtn.style.display = "none";
};
