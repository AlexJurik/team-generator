import * as XLSX from "xlsx";
import { Player } from "./player";
import { generateTeams } from "./generator";
import { generateCheckboxes } from "./ui-generator";
import { amountOfTeamsInput, amountOfTeamsStep, excelFileInput, nextStepBtn, playersSelectStep } from "./components";

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
        blankrows: false,
        defval: undefined,
        header: ["identifier", "name", "coefficient", "attendance"],
      });

      if (!jsonData.length) {
        return;
      }

      jsonData.splice(0, 1);

      players = jsonData.map(
        (row) => new Player(row["identifier"], row["name"], row["coefficient"], row["attendance"]),
      );

      generateCheckboxes(players);
    };

    reader.readAsArrayBuffer(file);
  }
}

excelFileInput.addEventListener("change", handleFileInput);
nextStepBtn.addEventListener("click", () => new bootstrap.Collapse(amountOfTeamsStep).show());
generateTeamsBtn.addEventListener("click", () => {
  generateTeams(players, amountOfTeamsInput.value);
  new bootstrap.Collapse(generatedTeamsStep).show();
});
