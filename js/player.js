import * as XLSX from 'xlsx';

class Player {
    constructor(identifier, name, coefficient) {
        this.identifier = identifier;
        this.name = name;
        this.coefficient = coefficient;
    }
}


function handleFileInput() {
    const fileInput = document.getElementById('excelFile');
    const outputDiv = document.getElementById('output');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});

            // Assuming there's only one sheet in the Excel file
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Convert the sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet, {
                blankrows: false,
                defval: undefined,
                header: 0,
            });

            const players = jsonData.map(function (row) {
                return new Player(row['Identifier'], row['Name'], row['Player coefficient']);
            });

            console.log(jsonData);
            console.log(players);
        };

        reader.readAsArrayBuffer(file);
    } else {
        outputDiv.innerHTML = 'No file selected.';
    }
}

// Add event listener to the file input element
document.getElementById('excelFile').addEventListener('change', handleFileInput);
