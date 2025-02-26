
// 260525 (Completed -> w/ Documentation)
/*

    Variables List :
        - xp, health, gold.
        - currentWeaponIndex, inventory.
        - fighting(monster_fighting - index/key), monsterHealth.
        - rndmNum1, rndmNum2 = for the special feature.
        
    List of Functions :
        - update(location)
        - goTown()
        - goStore() : buyHealth(), buyWeapon(), sellWeapon().
        - goCave() : fightSlime(), fightBeast(), fightDragon().
        - goFight() : attack(), isMonsterHit(), getMonsterAttackValue(), dodge(), defeatMonster(), winGame(), lose(), restart().
        - easterEgg() : pick(), pickTwo(), pickEight().


    Array of Objects :-
        - weapons : {name, power}
        - monsters : {name, level, health}
        - locations : {name, 'button text', 'button functions', text}

    Object of Objects :- 
        Same struct as Array of Objects, except the 'name' is used as the key to id the each object's value.
*/

let xp = 0, health = 100, gold = 50;
let currentWeaponIndex = 0;
let fighting;

let monsterHealth;
let inventory = ["stick"];

let rndmNum1=-1, rndmNum2=-1;
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
    {   
        // console.log("Buying Health...");
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "Health replenished by 10!";
    }
    else{
        text.innerText = "Not have enough gold to buy health. :(";
    }
}

let buyWeapon = () => {
    if(currentWeaponIndex < weapons.length-1)
    {
        if(gold >= 30)
        {
            // console.log("Buying Weapon...");
            gold -= 30;
            currentWeaponIndex++;
            goldText.innerText = gold;
            
            let newWeapon = weapons[currentWeaponIndex].name;
            text.innerText = `You now have a ${newWeapon}!`;

            inventory.push(newWeapon);
            text.innerText += " <br>In your inventory you have : " + inventory;
        }
        else {
            text.innerText = "Not enough gold to buy a new weapon. :(";
        }
    }
    else{
        text.innerText = "You already wield the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

let sellWeapon = () => {
    // console.log("Selling weapon...");
    
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
    text.innerText += "<br>You attack it with your " + weapons[currentWeaponIndex].name + ".";

    // Modify the Healths.
    // health -= monsters[fighting].level;
    health -= getMonsterAttackValue(monsters[fighting].level);

    if(isMonsterHit()) {        // Hits 80% of the time & for sure if Health is less than 20.
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
    // console.log(hit);
    return (hit>0) ? hit : 0;
}

let dodge = () => {
    text.innerHTML = `You dodge the attack from the ${monsters[fighting].name}!`;
}

let fightSlime = () => {
    // console.log("Fighting Slime...");
    fighting = 0;
    // fighting = "slime";
    goFight();
}

let fightBeast = () => {
    // console.log("Fighting Beast...");
    fighting = 1;
    // fighting = "fanged beast";
    goFight();
}

let fightDragon = function() {
    // console.log("Fighting Dragon...");
    fighting = 2;
    // fighting = "dragon";
    goFight();
}

let defeatMonster = () => {
    // console.log("'defeatMonster' Function ...");
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;

    goldText.innerText = gold;
    xpText.innerText = xp;

    update(locations[4]);
    // update(myLocations["kill monster"]);
};

let winGame = () => {
    // console.log("'winGame' Function ...");
    update(locations[6]);
    // update(myLocations["win"]);
};

let lose = () => {
    // console.log("'Lose' Function ...");

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
let easterEgg = () => {
    update(locations[7]);
    pickRandomNums();
    // update(myLocations[""]);
}

let pick = (guess) => {
    const numbers = [];

    while( numbers.length < 10) {
        // Choosing a random number b/n 0 and 10.
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = `You picked ${guess}. Here are the random numbers:\n`;

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    // If the guessed number exists in the random arrays.
    if (numbers.includes(guess)) {
        text.innerText += "Right guess! You win 20 gold! :D";
        gold += 20;
        goldText.innerText = gold;
    }
    else {
        text.innerText += "Wrong guess! You lose 10 health! :(";
        health -= 10;
        healthText.innerText = health;

        if(health <= 0) {
            lose();
        }
    }
    pickRandomNums();
}

// Function to pick 2 Random numbers for the hidden feature.
let pickRandomNums = () => {
    rndmNum1 = Math.floor(Math.random() * 11);
    
    // Loop to ensure two numbers are not of the same value.
    do {
        rndmNum2 = Math.floor(Math.random() * 11);
    } while (rndmNum1 == rndmNum2);

    button1.innerText = rndmNum1;
    button2.innerText = rndmNum2;
}

// Arrow functions .. to be called upon button click.
let pickRndmNum1 = () => pick(rndmNum1);
let pickRndmNum2 = () => pick(rndmNum2);


// Initializing the buttons.
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Array of Objects definitions.
const weapons = [
    {name: "Stick", power: 5},
    {name: "Dagger", power: 30},
    {name: "Claw Hammer", power: 50},
    {name: "Sword", power: 100}
];

const monsters = [
    {name: "Slime", level: 2 , health: 15},
    {name: "Fanged Beast", level: 8, health: 60},
    {name: "Dragon", level: 20, health: 300}
];

const locations = [
    {
        "name": "Town Square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "You are in the Town Square. You see a sign that says \"Store\"."
    },
    {
        "name": "Store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "You enter the Store."
    },
    {
        "name": "Cave",
        "button text": ["Fight Slime", "Fight fanged Beast", "Go to Town Square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "Entering the Cave.... You see some gruesome monsters!"
    },
    {
        "name": "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "Draw your weapon! .. You are fighting a monster!!"
    },
    {
        "name": "kill monster",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions": [goTown, goTown, easterEgg],
        "text": 'The monster screams "Arg!" as its breath fades, leaving a deafening silence behind.. as victory approaches you! <br>You gain experience points and find gold... Splendid!'
    },
    {
        "name": "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": "Oh no... you die. &#x2620;"
    }, 
    {
        "name": "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": `You defeat the Dragon!<br><br>"Victory Forged in Battle, Legends Etched in Eternity." <br><br>May your greatness echo the entire land .. O great warrior!<br><br>YOU WIN THE GAME .. Hurray!! &#x1F389;`
    },
    {
        "name" : "easter egg",
        "button text" : ["rndmNum1", "rndmNum2", "Go to Town Square?"],
        "button functions" : [pickRndmNum1, pickRndmNum2, goTown],
        "text" : "Knock knock... <br>You found a secret game! .. enjoy this until you are ready to continue on your mission!<br><br>Pick a number above. <br>Ten numbers will be randomly chosen between 0 and 10. <br>If the number you choose matches one of the choosen numbers, you win!"
    }
];

/* 
// MyVersion : Object-based access => Object of Objects.
// Needs proper testing if this method is employed.

const myWeapons = {
  "stick" : {name: "Stick", power: 5},
  "dagger" : {name: "Dagger", power: 30},
  "claw hammer" : {name: "Claw Hammer", power: 50},
  "sword" : {name: "Sword", power: 100}
};

const myMonsters = {
    "slime" : {name: "Slime", level: 2 , health: 15},
    "fanged beast" : {name: "Fanged Beast", level: 8, health: 60},
    "dragon" : {name: "Dragon", level: 20, health: 300}
};

const myLocations = {
    "town square" : {
        "name": "Town Square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "You are in the Town Square. You see a sign that says \"Store\"."
    },
    "store" : {
        "name": "Store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "You enter the Store."
    },
    "cave" : {
        "name": "Cave",
        "button text": ["Fight Slime", "Fight fanged Beast", "Go to Town Square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "Entering the Cave.... You see some gruesome monsters!"
    },
    "fight" : {
        "name": "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "Draw your weapon! .. You are fighting a monster!!"
    },
    "kill monster" : {
        "name": "kill monster",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions": [goTown, goTown, easterEgg],
        "text": 'The monster screams "Arg!" as its breath fades, leaving a deafening silence behind.. as victory approaches you! <br>You gain experience points and find gold... Splendid!'
    },
    "lose" : {
        "name": "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": "Oh no... you die. &#x2620;"
    },
    "win" : {
        "name": "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?",],
        "button functions": [restart, restart, restart],
        "text": `You defeat the Dragon!<br><br>"Victory Forged in Battle, Legends Etched in Eternity." <br><br>May your greatness echo the entire land .. O great warrior!<br><br>YOU WIN THE GAME .. Hurray!! &#x1F389;`
    }, 
    "easter egg" : {
        "name" : "easter egg",
        "button text" : ["rndmNum1", "rndmNum2", "Go to Town Square?"],
        "button functions" : [pickRndmNum1, pickRndmNum2, goTown],
        "text" : "Knock knock... <br>You found a secret game! .. enjoy this until you are ready to continue on your mission!<br><br>Pick a number above. <br>Ten numbers will be randomly chosen between 0 and 10. <br>If the number you choose matches one of the choosen numbers, you win!"
    }
};
// */