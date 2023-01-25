let count = 0;
function increase() {
    count++;
    // console.log("clicked");
    document.getElementById("count-el").textContent = count;
}

function save() {
    let countStr = count + " - ";
    let saveEl = document.getElementById("save-el");
    // using the textContent since the innertext does not support the "non human readable" things as " ".
    saveEl.textContent += countStr;
    document.getElementById("count-el").textContent = 0;
    count = 0;
}

console.log("This website is used to count the no of people in the subway.");