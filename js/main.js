window.onload = () => {
    //Array where board will be store to determine the winner
    var boardStorage = [];
    //Variable to switch everytime the user clicks (O= True, X=False)
    let boolSwitcher = false;

    //Creating the table
    let createBoard = (dimension) => {
        if (dimension > 15) {
            alert(`Board is larger than 15 don't do that...`);
        } else
        if (/[A - Za - z]/g.exec(dimension)) {
            alert("Only numerical values are accepted!");
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
            //Add click event to each TD, right after the table is created.
            listenerToEachTd();
        }
    }

    //Showing the board based on the user input
    let showBoard = () => {
        document.getElementById('showBoard')
            .addEventListener("click", function () {
                let dimension = document.getElementById("dimension").value;
                createBoard(Number(dimension));
            });
    }
    showBoard();

    //Click event to each cell in the table
    let listenerToEachTd = () => {
        let save = [];
        let count = 0;
        document.querySelectorAll("#tictactoe td")
            .forEach(e =>
                e.addEventListener("click", function () {
                    (this.innerText === '') ? (
                        //Boolean Switcher, TD text (O= True, X=False)
                        boolSwitcher = !boolSwitcher,
                        boolSwitcher === true ? this.innerText = "O" : this.innerText = "X",
                        //Every time the user clicks, the board parses into a multidimensional array
                        boardToArray(),
                        //Alerting the winner
                        winner(boardStorage)
                    ) : "";
                    //Clearing the board after user clicks, and the winner is determined
                    boardStorage = [];
                }))
    }

    //Parsing the board into a multidimensional array
    let boardToArray = () => {
        let tds = document.querySelectorAll("#tictactoe td");
        let count = 0;
        var tempTds = '';
        for (let td = 0; td < tds.length; ++td) {
            //Ternary conditions, making sure that the array will be able to have empty values(non-clicked cells in the board)
            tds[td].innerHTML == '' ? tempTds += ' ' : tempTds += tds[td].innerHTML;

            //Counting to check everytime the loop increments to the given dimension
            ++count;

            //Ternary condition, if the counter is equal the dimension
            count.toString() === document.getElementById('dimension').value ?
                (boardStorage.push(tempTds.split('')),
                    tempTds = '',
                    count = 0) : count;
        }
        // console.log(boardStorage);

    }

    //Determine the winner
    let winner = (arr) => {
        var hztlWinner = true;
        let dgnlWinner = true;
        let secondDgnlWinner = true;
        let vtclWinner = true;
        //Horizontal Checking
        for (var index = 0; index < arr.length; index++) {
            hztlWinner = arr[index].every(v => v == arr[index][0] && arr[index][0] != " ");
            hztlWinner ? (
                alert(`The winner is : ${arr[index][0]} | Row ${index + 1}`),
                boolSwitcher = false,
                setTimeout(() => {
                    document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
                }, 1000)
            ) : "";
        }
        //Vertical Checking
        if (hztlWinner === false) {
            let vtclChecker = [];
            for (let y = 0; y < arr.length; y++) {
                for (let x = 0; x < arr.length; x++) {
                    vtclChecker.push(arr[x][y]);
                    vtclChecker.length === arr.length ? (
                        vtclWinner = vtclChecker.every(v => v == vtclChecker[0] && vtclChecker[0] !== " "),
                        vtclWinner ? (
                            alert(`The winner is : ${vtclChecker[0]} | Column ${y + 1}`),
                            boolSwitcher = false,
                            setTimeout(() => {
                                document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
                            }, 1000)
                        ) : ""
                    ) : ""
                }
                vtclChecker = [];
            }
        }
        //Diagonal Checking
        if (vtclWinner === false) {
            let dgnlChecker = [];
            for (let index = 0; index < arr.length; index++) {
                dgnlChecker.push(arr[index][index]);
                dgnlChecker.length === arr.length ? (
                    dgnlWinner = dgnlChecker.every(v => v == dgnlChecker[0] && dgnlChecker[0] !== " "),
                    dgnlWinner ? (
                        alert(`The winner is : ${dgnlChecker[0]} | Diagonal ${1}`),
                        boolSwitcher = false,
                        setTimeout(() => {
                            document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
                        }, 1000)
                    ) : ""
                ) : ""
            }
        }
        if (dgnlWinner === false) {
            let secondDgnlChecker = [];
            let y = arr.length - 1;
            for (let x = 0; x < arr.length; ++x) {
                secondDgnlChecker.push(arr[x][y]);
                --y;
                console.log(secondDgnlChecker);
                secondDgnlChecker.length === arr.length ? (
                    y = arr.length - 1,
                    secondDgnlWinner = secondDgnlChecker.every(v => v == secondDgnlChecker[0] && secondDgnlChecker[0] !== " "),
                    secondDgnlWinner ? (
                        alert(`The winner is : ${secondDgnlChecker[0]} | Diagonal ${2}`),
                        boolSwitcher = false,
                        setTimeout(() => {
                            document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
                        }, 1000)
                    ) : ""
                ) : ""
            }
        }
    }
}