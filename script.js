const counter = document.getElementById('pointcounter');
const gameTypeInput = document.getElementById('gametype');
const firstElement = document.getElementById("Firstthrow");
const thirdElement = document.getElementById("Thirdthrow");
const secondElement = document.getElementById("Secondthrow");



document.addEventListener("DOMContentLoaded", () => {
console.log("loaded");

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
    let maxpoint = gameTypeInput.value;
    counter.innerHTML = maxpoint;
    
});
