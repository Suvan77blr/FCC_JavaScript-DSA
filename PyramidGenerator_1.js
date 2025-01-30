
// 280125
// Challenge 1 : Pyramid Generator.

const character = '#';
const count = 8;
// const rows = [];

const padRow = (rowNumber, rowCount) => {
    return " ".repeat(rowCount - rowNumber) + character.repeat(2*rowNumber - 1);
}


const arrayToString = (rowsArr) => {
    let result = "";
    for( const row of rowsArr)
    {
        result = result + row + "\n";
    }
    return result;
}

let normalPrintWithFor = () => {
    const rows = [];
    for (let i = 0; i < count; i++) {
        rows.push(padRow(i+1, count));
    }

    let result = arrayToString(rows);
    console.log(result);
}

let printWithWhile = () => {
    const rows = [];
    while(rows.length < count)        
    {
        rows.push(padRow(rows.length+1, count));
    }
    let result = arrayToString(rows);
    console.log(result);
}

const revPrintWithFor = () => {
    const rows = [];
    for(let i=1; i<=count; i++)
    {
        rows.unshift(padRow(i, count));
    }
    let result = arrayToString(rows);
    console.log(result);
}

const printWithFor = () => {
    let inverted = false;
    if(inverted)
    {
        revPrintWithFor();
    }
    else
    {
        normalPrintWithFor();
    }
}

// printWithWhile();
// revPrintWithFor();
// normalPrintWithFor();

printWithFor();