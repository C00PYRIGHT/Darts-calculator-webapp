const counter = document.getElementById('pointcounter');
const namedisplay = document.getElementById('namedisplay');
const gameTypeInput = document.getElementById('gametype');
const nameInput = document.getElementById('name');
const doubleInput = document.getElementById('doubleout');
const firstElement = document.getElementById("Firstthrow");
const thirdElement = document.getElementById("Thirdthrow");
const secondElement = document.getElementById("Secondthrow");
const firstmultipler = document.getElementById("Firstmultipler");
const secondmultipler = document.getElementById("Secondmultipler");
const thirdmultipler = document.getElementById("Thirdmultipler");
const gameform = document.getElementById("gameform");
const table = document.getElementById("ResultTable").getElementsByTagName('tbody')[0];
const Leaderboardtable = document.getElementById("LeaderboardTable").getElementsByTagName('tbody')[0];


const canout = document.getElementById('canout');
const outnums = document.getElementById('outnums');
let namevar = "Noname";
let maxpoint = 0;
let doubleout = false;
let throwlist = [];


document.addEventListener("DOMContentLoaded", () => {
    refreshLeaderboard()
console.log("loaded");
maxpoint = localStorage.getItem("score");
namevar = localStorage.getItem("name");
if(localStorage.getItem("throws")!= null){
throwlist = JSON.parse(localStorage.getItem("throws")) || [];}
else{
    maxpoint = 0;
    localStorage.setItem("score",maxpoint);
    localStorage.setItem("name",namevar);
    namevar = "Noname";
    throwlist= [];
    localStorage.setItem("throws", JSON.stringify(throwlist));
    uiupdate();
}
console.log(throwlist)
uiupdate();

for (let i = 0; i <= 21; i++) {
    if (i == 21){
        i = 25;
    }
    let option1 = document.createElement("option");
    option1.value = i;
    option1.textContent = i;
    if (i === 0) {
        option1.selected = true;
    }

    let option2 = option1.cloneNode(true); // Másolat létrehozása
    let option3 = option1.cloneNode(true); // Még egy másolat

    firstElement.appendChild(option1);
    secondElement.appendChild(option2);
    thirdElement.appendChild(option3);

}

});
document.getElementById('gameTypeButton').onclick = (evt => {
    evt.preventDefault();
    console.log('click');
    maxpoint = gameTypeInput.value;
    doubleout = doubleInput.value;
    localStorage.setItem("score", maxpoint);
    namevar = nameInput.value;
    localStorage.setItem("name",namevar)
    uiupdate();

    
});
document.getElementById('RoundSubmit').onclick = (event => {
    event.preventDefault();
    if(maxpoint == 0 || namevar === "Noname" || namevar === ""  || namevar == null   ){
        alert("Nincs beállítva pontszám vagy név!")
    }else{
    let first = firstElement.value * firstmultipler.value;
    let second = secondElement.value * secondmultipler.value;
    let third = thirdElement.value * thirdmultipler.value;
    let Roundsum = first+second+third;
    console.log(Roundsum)
    if(Roundsum < maxpoint){
    maxpoint -= Roundsum;
    localStorage.setItem("score", maxpoint);
    let round = [first,second,third];
    throwlist.push(round);
    localStorage.setItem("throws", JSON.stringify(throwlist));
    sendPostWebhook("https://n8n.bencedaniel.hu/webhook/dartsleaderboard",`${namevar}|${maxpoint}`)
    }else{
        alert("Túldobtál!");
    }
    uiupdate();

    gameform.reset();


    }


});
document.getElementById('resetButton').onclick = (event => {
    event.preventDefault();
    maxpoint = 0;
    localStorage.setItem("score",maxpoint);
    throwlist= [];
    localStorage.setItem("throws", JSON.stringify(throwlist));
    uiupdate();
});

function uiupdate(){
    counter.innerHTML = maxpoint;
    namedisplay.innerHTML = namevar;

    if(maxpoint == 0){
        canout.innerHTML = "Nincs folyamatban játék";

    }else if(maxpoint <= 180){
        canout.innerHTML = "Igen";

    }else{
        canout.innerHTML = "Nem";

    }
    let lengthvar = 0;
    if (throwlist.length != null){
        lengthvar = throwlist.length
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild); // Első elemet mindig töröljük, amíg van
    }
    for (let i = 1; i <= lengthvar; i++) { 

    let row = document.createElement("tr"); // Új sor létrehozása
    let firstCell = document.createElement("td");
    firstCell.textContent = table.rows.length + 1; // Sor számozása
    row.appendChild(firstCell);

    for (let j = 1; j <= 3; j++) { 
        let cell = document.createElement("td");
        cell.textContent = `${throwlist[i-1][j-1]}`; // Ide írhatsz értéket
        row.appendChild(cell);
    }

    table.appendChild(row); // Sor hozzáadása a táblázathoz

    }
    
    if(maxpoint <= 180 && maxpoint !=0){
    let outlist = findCheckout(maxpoint,false);
 
    let string = `${outlist[0][0]}x${outlist[0][1]}, ${outlist[1][0]}x${outlist[1][1]}, ${outlist[2][0]}x${outlist[2][1]}` 
    outnums.innerHTML = string }
    else{
        outnums.innerHTML = "Nem kiszálló";
    };

};
function findCheckout(score, requireDoubleOut = true) {
    const doubles = Array.from({ length: 20 }, (_, i) => ({ score: (i + 1) * 2, value: [i + 1, 2] }));
    const triples = Array.from({ length: 20 }, (_, i) => ({ score: (i + 1) * 3, value: [i + 1, 3] }));
    const singles = Array.from({ length: 20 }, (_, i) => ({ score: i + 1, value: [i + 1, 1] }));

    const validLastThrows = requireDoubleOut ? doubles : doubles.concat(singles);

    // 1 dobás kiszálló
    let oneDart = validLastThrows.find(d => d.score === score);
    if (oneDart) return [oneDart.value];

    // 2 dobás kiszálló
    for (let t of triples.concat(singles)) {
        let remaining = score - t.score;
        let lastThrow = validLastThrows.find(d => d.score === remaining);
        if (lastThrow) return [t.value, lastThrow.value];
    }

    // 3 dobás kiszálló
    for (let t1 of triples.concat(singles)) {
        for (let t2 of triples.concat(singles)) {
            let remaining = score - t1.score - t2.score;
            let lastThrow = validLastThrows.find(d => d.score === remaining);
            if (lastThrow) return [t1.value, t2.value, lastThrow.value];
        }
    }

    return [];
}
function checkSelection1(){
    
    if (firstElement.value === '25'){

        firstmultipler.options[2].disabled = true;
        console.log(firstmultipler.options)

    } else {
        firstmultipler.options[2].disabled = false;

    }
};
function checkSelection2(){
    refreshLeaderboard()
    if (secondElement.value === '25'){

        secondmultipler.options[2].disabled = true;
        console.log(firstmultipler.options)

    } else {
        secondmultipler.options[2].disabled = false;

    }
};
function checkSelection3(){
    if (thirdElement.value === '25'){

        thirdmultipler.options[2].disabled = true;
        console.log(firstmultipler.options)

    } else {
        thirdmultipler.options[2].disabled = false;

    }
};
function sendPostWebhook(url,text){
$.ajax({
   data: 'payload=' + JSON.stringify({
    "text": text
   }),
   dataType: 'json',
   processData: false,
   type: 'POST',
   url: url
});
};
function refreshLeaderboard(){
    fetch('leaderboard.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Hiba: ${response.status}`);
        }
        return response.text(); // Szöveges formában olvassuk be
    })
    .then(data => {
        while (Leaderboardtable.firstChild) {
            Leaderboardtable.removeChild(Leaderboardtable.firstChild); // Első elemet mindig töröljük, amíg van
        }
       let records = data.split("\n");
       for (let record of records) {
        let parts = record.split('|'); // Adatokat szétválasztjuk
        
        if (parts.length < 2) continue; // Ha nincs elég adat, kihagyjuk

        let row = document.createElement("tr"); // Új sor létrehozása
        let firstCell = document.createElement("td");
        let secondCell = document.createElement("td");

        firstCell.textContent = parts[0]; // Név
        secondCell.textContent = parts[1]; // Pontszám

        row.appendChild(firstCell);
        row.appendChild(secondCell);
        Leaderboardtable.appendChild(row); // Sor hozzáadása a táblázathoz
       }
    })
    .catch(error => console.error('Hiba történt:', error));
    

};
setInterval(refreshLeaderboard, 2000);


