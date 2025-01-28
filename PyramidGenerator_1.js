const character = '#';
const count = 8;
// const rows = [];

const padRow = (rowNumber, rowCount) => {
    return " ".repeat(rowCount - rowNumber) + character.repeat(2*rowNumber - 1);
}


let printWithFor = () => {
    const rows = [];
    for (let i = 0; i < count; i++) {
        rows.push(padRow(i+1, count));
    }

    let result = "";
    for( const row of rows)
    {
        result = result + row + "\n";
    }
    console.log(result);
}

let printWithWhile = () => {
    const rows = [];
    while(rows.length < count)        
    {
        rows.push(padRow(rows.length+1, count));
    }
    let result = "";
    for( const row of rows)
    {
        result = result + row + "\n";
    }
    console.log(result);
}

// printWithFor();
printWithWhile();