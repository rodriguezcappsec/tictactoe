window.onload = () => {
    //Array where board will be store to determine the winner
    var boardStorage = [];
    let boolSwitcher = false;
    //Creating the table
    let createBoard = (dimension) => {
        if (dimension > 15) {
            alert(`Board is larger than 15 don't do that...`);
        } else
        if (/[A - Za - z]/g.exec(dimension)) {
            alert("Only numerical values are accepted");
        } else {
            let tr, td;
            let table = document.getElementById('tictactoe');
            while (table.firstChild) {
                table.removeChild(table.firstChild)
            }
            for (let trIndex = 1; trIndex <= dimension; ++trIndex) {
                tr = document.createElement("tr");
                tr.id = trIndex;
                for (let tdIndex = 1; tdIndex <= dimension; ++tdIndex) {
                    td = document.createElement("td");
                    td.id = `${trIndex}-${tdIndex}`;
                    td.className = `${trIndex}-td-${tdIndex}`;
                    tr.appendChild(td)
                }
                table.appendChild(tr);
            }
            listenerToEachTd();
        }
    }

    //Showing the board based on the user input
    let showBoard = () => {
        document.getElementById('generateButton')
            .addEventListener("click", function () {
                let dimension = document.getElementById("dimension").value;
                createBoard(Number(dimension));
            });
    }

    showBoard();

    //Click event to each cell in the table
    let listenerToEachTd = () => {
        let save = [];
        let oPattern = /[O]/g;
        let xPattern = /[X]/g;
        let count = 0;
        document.querySelectorAll("#tictactoe td")
            .forEach(e =>
                e.addEventListener("click", function () {
                    if (this.innerText === '') {
                        boolSwitcher = !boolSwitcher;
                        boolSwitcher === true ? this.innerText = "O" : this.innerText = "X";
                        boardToArray();
                        winner(boardStorage);
                    }
                    boardStorage = [];
                }))
    }
    let winner = (arr) => {
        var hztlWinner = true;
        let dgnlWinner = true;
        let vtclWinner = true;
        for (var index = 0; index < arr.length; index++) {
            hztlWinner = arr[index].every(v => v == arr[index][0] && arr[index][0] != " ");
            hztlWinner ? (
                alert(`The winner is : ${arr[index][0]} | Row ${index + 1}`),
                boolSwitcher = false,
                document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
            ) : "";
        }
        if (hztlWinner === false) {
            let vtclChecker = [];
            for (let y = 0; y < arr.length; y++) {
                for (let x = 0; x < arr.length; x++) {
                    vtclChecker.push(arr[x][y]);
                    (vtclChecker.length === arr.length) ? (
                        vtclWinner = vtclChecker.every(v => v == vtclChecker[0] && vtclChecker[0] !== " "),
                        vtclWinner ? (
                            alert(`The winner is : ${vtclChecker[0]} | Column ${y+1}`),
                            boolSwitcher = false,
                            document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
                        ) : "",
                        console.log(vtclChecker)
                    ) : ""
                }
                vtclChecker = [];
            }
        }
    }

    //Parsing the board into multidimensional array
    let boardToArray = () => {
        let tds = document.querySelectorAll("#tictactoe td");
        let count = 0;
        var tempTds = '';
        for (let td = 0; td < tds.length; ++td) {
            //Ternary conditions, making sure that the array will be able to have empty values(non-clicked cells in the board)
            tds[td].innerHTML == '' ? tempTds += ' ' : tempTds += tds[td].innerHTML;

            //Counter to check everytime the loop increments to the given dimension
            ++count;

            //Ternary condition, if the counter is equal the dimension
            count.toString() === document.getElementById('dimension').value ?
                (boardStorage.push(tempTds.split('')),
                    tempTds = '',
                    count = 0) : count;
        }
        //  console.log(boardStorage);
    }
}