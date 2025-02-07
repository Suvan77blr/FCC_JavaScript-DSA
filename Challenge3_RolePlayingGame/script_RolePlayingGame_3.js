let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;

let monsterHealth;
let inventory = ["stick"];

// Element references.
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
// Function to update the buttons' text and action based on the current location.
let update = (location) => {
    monsterStats.style.display = 'none';
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
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
    if(currentWeaponIndex < weapons.length-1)
    {
        if(gold >= 30)
        {
            console.log("Buying Weapon...");
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
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

let sellWeapon = () => {
    console.log("Selling weapon...");
    // Player shld not be able to sell their 'only' weapon. So .. 
    if(inventory.length > 1)
    {
        gold += 15;
        goldText.innerText = gold;

        let currentWeapon = inventory.shift();
        text.innerText = `You sold a ${currentWeapon}.`;
        text.innerText += ` In your inventory you have: ${inventory}`;
    }
    else {
        text.innerText = "Don't sell your only weapon!";
    }
}

// Common Fighting logic.
let goFight = () => {
    update(locations[3]);
    // update(myLocations["fight"]);
    
    monsterHealth = monsters[fighting].health;
    // monsterHealth = myMonsters[fighting].health;

    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

let attack = () => {
    text.innerText = `The ${monsters[fighting].name} attacks!.`;
    text.innerText += "\nYou attack it with your " + weapons[currentWeaponIndex].name + ".";

    // Modify the Healths.
    // health -= monsters[fighting].level;
    health -= getMonsterAttackValue(monsters[fighting].level);

    if(isMonsterHit()) {
        monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;    // Adding a factor of Player's XP to the damage done.
    }
    else {
        text.innerText += " You miss.";
    }

    // Writing the healths.
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    // Checking for next action based on healths.
    if( health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        if(fighting === 2){ winGame(); }
        else { defeatMonster(); }
    }

    // Chance of breakage of the weapon. && Also ensure that the player's only weapon does not break.
    if(Math.random <= .1  && inventory.length !== 1) {
        text.innerText += ` Your ${inventory.pop()} breaks.`;
        currentWeaponIndex--;
    }
}

let isMonsterHit = () => {
    // Player will hit 80% of the time & if his health is less than 20.
    return Math.random() > .2 || health<20;
}

// Function to get a dynamic value for Monster's attack.
let getMonsterAttackValue = (level) => {
    // Setting monster's attack to 5x of its level and subtracting it by a random number between 0 - xp
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return (hit>0) ? hit : 0;
}

let dodge = () => {
    text.innerHTML = `You dodge the attack from the ${monsters[fighting].name}!`;
}

let fightSlime = () => {
    console.log("Fighting Slime...");
    fighting = 0;
    // fighting = "slime";
    goFight();
}

let fightBeast = () => {
    console.log("Fighting Beast...");
    fighting = 1;
    // fighting = "fanged beast";
    goFight();
}

let fightDragon = function() {
    console.log("Fighting Dragon...");
    fighting = 2;
    // fighting = "dragon";
    goFight();
}

let defeatMonster = () => {
    console.log("'defeatMonster' Function ...");
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;

    goldText.innerText = gold;
    xpText.innerText = xp;

    update(locations[4]);
    // update(myLocations["kill monster"]);
};

let winGame = () => {
    console.log("'winGame' Function ...");
    update(locations[6]);
    // update(myLocations["win"]);
};

let lose = () => {
    // Logic to be defined yet ...
    console.log("'Lose' Function ...");

    update(locations[5]);
    // update(myLocations["lose"]);
};

let restart = () => {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];
  
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
  
    goTown();
}

// Hidden Feature!
// 158.

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

const monsters = [
    {name: "slime", level: 2 , health: 15},
    {name: "fanged beast", level: 8, health: 60},
    {name: "dragon", level: 20, health: 300}
];

const locations = [
    {
        "name": "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        "name": "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "You enter the store."
    },
    {
        "name": "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "You enter the cave. You see some monsters."
    },
    {
        "name": "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "You are fighting a monster."
    },
    {
        "name": "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        "text": 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        "name": "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": "You die. &#x2620;"
    }, 
    {
        "name": "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    }
];

/*
// MyVersion : Object-based access.

const myWeapons = {
  "stick" : {name: "stick", power: 5},
  "dagger" : {name: "dagger", power: 30},
  "claw hammer" : {name: "claw hammer", power: 50},
  "sword" : {name: "sword", power: 100}
};

const myMonsters = {
    "slime" : {name: "slime", level: 2 , health: 15},
    "fanged beast" : {name: "fanged beast", level: 8, health: 60},
    "dragon" : {name: "dragon", level: 20, health: 300}
};

const myLocations = {
    "town square" : {
        "name": "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    "store" : {
        "name": "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    "cave" : {
        "name": "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    "fight" : {
        "name": "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "You are fighting a monster."
    },
    "kill monster" : {
        "name": "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        "text": 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    "lose" : {
        "name": "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": "You die. &#x2620;"
    },
    "win" : {
        "name": "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": "You defeated the dragon! YOU WIN THE GAME! &#x1F389;"
    }, 

};
// */