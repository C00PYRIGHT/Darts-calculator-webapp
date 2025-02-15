const counter = document.getElementById('pointcounter');
const gameTypeInput = document.getElementById('gametype');
const firstElement = document.getElementById("Firstthrow");
const thirdElement = document.getElementById("Thirdthrow");
const secondElement = document.getElementById("Secondthrow");
const firstmultipler = document.getElementById("Firstmultipler");
const secondmultipler = document.getElementById("Secondmultipler");
const thirdmultipler = document.getElementById("Thirdmultipler");
const gameform = document.getElementById("gameform");

const canout = document.getElementById('canout');
let maxpoint = 0;

let throwlist = [];


document.addEventListener("DOMContentLoaded", () => {
console.log("loaded");
maxpoint = localStorage.getItem("score");

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
    uiupdate();
});

function uiupdate(){
    counter.innerHTML = maxpoint;
    if(maxpoint <= 180){
        canout.innerHTML = "Igen";
    }else{
        canout.innerHTML = "Nem";

    }

}
