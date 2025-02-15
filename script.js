const counter = document.getElementById('pointcounter');
const gameTypeInput = document.getElementById('gametype');
const firstElement = document.getElementById("Firstthrow");
const thirdElement = document.getElementById("Thirdthrow");
const secondElement = document.getElementById("Secondthrow");
const firstmultipler = document.getElementById("Firstmultipler");
const secondmultipler = document.getElementById("Secondmultipler");
const thirdmultipler = document.getElementById("Thirdmultipler");
const gameform = document.getElementById("gameform");
const table = document.getElementById("ResultTable").getElementsByTagName('tbody')[0];

const canout = document.getElementById('canout');
let maxpoint = 0;

let throwlist = [];


document.addEventListener("DOMContentLoaded", () => {
console.log("loaded");
maxpoint = localStorage.getItem("score");
throwlist = JSON.parse(localStorage.getItem("throws")) || [];
console.log(throwlist)
uiupdate();

for (let i = 0; i <= 20; i++) {
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
    localStorage.setItem("score", maxpoint);
    uiupdate();

    
});
document.getElementById('RoundSubmit').onclick = (event => {
    event.preventDefault();
    if(maxpoint === 0){
        alert("Nincs beállítva pontszám!")
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
    if(maxpoint <= 180){
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
};


