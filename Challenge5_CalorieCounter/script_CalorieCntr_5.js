
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const output = document.getElementById('output');

// Button references.
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');

// Later change-able value. (Step 17)
let isError = false;

// function to handle '+' or '-' sign in input string.
let cleanInputString = (str) => {
    // console.log("Original string: ", str);
    const regex = /[+-\s]/g;
    return str.replace(regex, "");
}
// console.log(cleanInputString("+-99"));

// Function which returns 'null' if it is a valid string.
let isInvalidInput = (str) => {
    const regex = /\d+e\d+/;
    return str.match(regex);
}

let addEntry = () => {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

    const HTMLString = `
        <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
        <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name">

        <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
        <input type="number" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" min="0">
    `;

    // targetInputContainer.innerHTML += HTMLString;
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

let getCaloriesFromInputs = (list) => {
    let calories = 0;
    for(const item of list) {
        const currVal = cleanInputString(item.value);
        let invalidInputMatch = isInvalidInput(currVal);

        if(invalidInputMatch){
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }

        calories += Number(currVal);
    }
    return calories;
};

let calculateCalories = (e) => {
    e.preventDefault();
    isError = false;

    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if(isError) {
        return;
    }

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = (remainingCalories < 0)? "Surplus" : "Deficit";

    output.innerHTML = `
        <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
        <hr>
        <p>${budgetCalories} Calories Budgeted</p>
        <p>${consumedCalories} Calories Consumed</p>
        <p>${exerciseCalories} Calories Burned</p>
    `;
    output.classList.remove('hide');
}

let clearForm = () => {
    const inputContainers = document.querySelectorAll(".input-container");
    for (const container of object) {
        container.innerHTML = ``;
    }
    budgetNumberInput.value = ``;
    output.innerText = ``;
    output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);

// EventListener to calculate the calories when form is submited in the front end.
calorieCounter.addEventListener('submit', calculateCalories);

// EL to clear the form.
clearButton.addEventListener('click', clearForm);