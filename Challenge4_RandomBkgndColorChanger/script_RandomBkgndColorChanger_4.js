
const defaultColor = "blue";

const colorArray = ["red","green","blue","orange", "yellow","pink","aqua","brown","chartreuse" ];

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
    let randomIndex = getRandomIndex();

    let color = "";
    if(Math.random() >= 0.5) {
        color = colorArray[randomIndex];
    }
    else {
        color = darkColorsArr[randomIndex];
    }

    console.log(color);
    
    body.style.backgroundColor = color;
    colorDisplayText.innerText = color.toUpperCase();    
}

const body = document.querySelector("body");
body.style.backgroundColor = defaultColor;

const colorDisplayText = document.querySelector("#color-display-span");
colorDisplayText.innerText = defaultColor.toUpperCase();

const btn = document.querySelector("#btn");
// btn.onclick = changeBackgroundColor;
btn.addEventListener('click', changeBackgroundColor);