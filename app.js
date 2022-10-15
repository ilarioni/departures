const tableBody =  document.getElementById('table-body');

let flights = [
    {
        time: "07:09",
        destination: "SINGAPORE",
        flight: "OX 203",
        gate: "A 01",
        remarks: "ON TIME"
    },
    {
        time: "10:21",
        destination: "LONDON",
        flight: "CL 320",
        gate: "C 31",
        remarks: "CANCELLED"
    },
    {
        time: "12:22",
        destination: "DUBAI",
        flight: "DXB 201",
        gate: "A 19",
        remarks: "CANCELLED"
    },
    {
        time: "14:11",
        destination: "FRANKFURT",
        flight: "FR 402",
        gate: "B 02",
        remarks: "ON TIME"
    },
    {
        time: "15:22",
        destination: "TOKYO",
        flight: "TK 211",
        gate: "A 32",
        remarks: "DELAYED"
    }
]

function populateTable() {
    for (const flight of flights) {
        const tableRow = document.createElement("tr");

        for (const flightDetail in flight) {
            const tableCell = document.createElement("td");
            const word = Array.from(flight[flightDetail]);
            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement("div");

                setTimeout(() => {
                    letterElement.classList.add('flip');
                    letterElement.textContent = letter;
                    tableCell.append(letterElement);
                }, 125 * index );
            }
            tableRow.append(tableCell);
        }
        tableBody.append(tableRow);
    }
}

populateTable();

const destinations = ["TOKYO", "FRANKFURT", "DUBAI", "LONDON", "MUNICH", "NUREMBERG", "PARIS", "BRUSSELS", "ZURICH", "VIENNA"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED", "NO DATA", "--------"]
let hour = 15

function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function generateRandomNumber(maxNumber) {
    const numbers = "0123456789"
    if (maxNumber) {
        const newNumbers = numbers.slice(0, maxNumber + 1)
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function generateTime() {
    let displayHour = hour
    if (hour < 24) {
        hour++
    }
    if (hour >= 23) {
        hour = 1
        displayHour = hour
    }
    if (hour < 10) {
        displayHour = "0" + hour 
    }
    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber() 
}

function shuffleUp() {
    flights.shift()
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
    })
    tableBody.textContent = ""
    populateTable()

}

setInterval(shuffleUp, 2000)