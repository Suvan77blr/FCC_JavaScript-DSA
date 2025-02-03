let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;

let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


// Function Definitions.
let update = (location) => {
    // Need to define function to update the buttons based on the current location.
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

let goTown = () => {
    update(locations[0]);
    // update(myLocations['town square']);
}

let goStore = function() {
    update(locations[1]);
    // update(myLocations['store']);
}
let goCave = function() {
    update(locations[2]);
    // update(myLocations['cave']);
}
let fightDragon = function() {
    console.log("Fighting Dragon");
}

let buyHealth = () => {
    if(gold >= 10)
    {    console.log("Buying Health...");
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "You do not have enough gold to buy health.";
    }
}
let buyWeapon = () => {
    console.log("Buying Weapon...");
    if(currentWeaponIndex < weapons.length-1)
    {
            if(gold >= 30)
        {
            gold -= 30;
            currentWeaponIndex++;
            goldText.innerText = gold;
            
            let newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = `You now have a ${newWeapon}.`;

            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }
        else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    }
    else{
        text.innerText = "You already have the most powerful weapon!";
    }
}

let fightSlime = () => {
    // Logic yet to be defined.
    console.log("Fighting Slime...");
}

let fightBeast = () => {
    // Logic yet to be defined.
    console.log("Fighting Beast...");
}

// Initializing the buttons.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const weapons = [
    {name: "stick", power: 5},
    {name: "dagger", power: 30},
    {name: "claw hammer", power: 50},
    {name: "sword", power: 100}
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
];

/*
// MyVersion : Object-based access.

const myWeapons = {
  "stick" : {power: 5},
  "dagger" : {power: 30},
  "claw hammer" : {power: 50},
  "sword" : {power: 100}
};

const myLocations = {
    "town square" : {
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    "store" : {
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    "cave" : {
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    }
};
// */