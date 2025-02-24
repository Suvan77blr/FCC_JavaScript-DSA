const defaultColor = "#110815";

const darkColorsArr = [
    "#2C3E50",
    "#34495E",
    "#2C2C2C",
    "#616A6B",
    "#4A235A",
    "#2F4F4F",
    "#0E4B5A",
    "#36454F",
    "#2C3E50",
    "#800020",
];

let getRandomIndex = () => {
    return Math.floor(Math.random() * darkColorsArr.length);
}

let changeBackgroundColor = () => {
    const color = darkColorsArr[getRandomIndex()];
    console.log(color);
    
    body.style.backgroundColor = color;
    colorDisplayText.innerText = color;    
}

const body = document.querySelector("body");
body.style.backgroundColor = defaultColor;

const colorDisplayText = document.querySelector("#color-display-span");
colorDisplayText.innerText = defaultColor.toUpperCase();

const btn = document.querySelector("#btn");
// btn.onclick = changeBackgroundColor;
btn.addEventListener('click', changeBackgroundColor);