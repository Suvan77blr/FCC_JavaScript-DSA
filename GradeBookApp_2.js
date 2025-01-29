
function getAverage(scores) {
    let sum = 0;
    for(const val of scores)
    {
      sum += val;
    }
    return sum / scores.length;
}

function getGrade(score) {
    if(score === 100)
        return "A++";
    else if(score >= 90 && score <= 99)
        return "A";
    else if(score >= 80 && score <= 89)
        return "B";
    else if(score >= 70 && score <= 79)
        return "C";
    else if(score >= 60 && score <= 69)
        return "D";
    else
        return "F";
}

// To check if the score is a Passing one or not.
function hasPassingGrade(score) {
    return (score>59);
}
  
function studentMsg(totalScores, studentScore) {
    let classAvg = getAverage(totalScores);
    let studentGrade = getGrade(studentScore);
    let passResult = hasPassingGrade(studentScore) ? "passed" : "failed";
    let finalResult = `Class average: ${classAvg}. Your grade: ${studentGrade}. You ${passResult} the course.`;
    return finalResult;
}
  
// To find average of the marks.
const task1 = () => {
    let arr1 = [92, 88, 12, 77, 57, 100, 67, 38, 97, 89];
    let arr2 = [45, 87, 98, 100, 86, 94, 67, 88, 94, 95];
    console.log(`Average of arr1 : ${getAverage(arr1)}`);
    console.log(`Average of arr2 : ${getAverage(arr2)}`);
}

// To find the grade of the current score.
const task2 = () => {
    console.log(`Grade of '96' : ${getGrade(96)}`);
    console.log(`Grade of '82' : ${getGrade(82)}`);
    console.log(`Grade of '56' : ${getGrade(56)}`);
}

const task3 = () => {
    console.log(`'100' is passing score ? : ${hasPassingGrade(100)}`);
    console.log(`'53' is passing score ? : ${hasPassingGrade(53)}`);
    console.log(`'87' is passing score ? : ${hasPassingGrade(87)}`);
}

const task4 = () => {
    console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
}

console.log("\t\tSTUDENT GRADE-BOOK APP");


console.log("\nTask 1 : Finding the Average :-")
task1();
console.log("\nTask 2 : Getting the Grade :-")
task2();
console.log("\nTask 3 : Checking if passing score or not :-")
task3();
console.log("\nTask 4 : Displaying Student message : ");
task4();