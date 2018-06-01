window.onload = () => {
    //Creating the table
    var bdmsTicTac = [];
    let createBoard = (dimension) => {
        let tr;
        let td;
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
    //Click event to each cell in the table
    let listenerToEachTd = () => {
        let boolSwitcher = false;
        document.querySelectorAll("#tictactoe td")
            .forEach(e =>
                e.addEventListener("click", function () {
                    boolSwitcher = !boolSwitcher;
                    if (this.innerText === '') {
                        boolSwitcher === true ? this.innerText = "O" : this.innerText = "X";
                    }
                    boardToArray();
                    bdmsTicTac = [];
                }))
    };

    //Showing the board based on the user input
    let showBoard = () => {
        document.getElementById('generateButton')
            .addEventListener("click", function () {
                let clicking = document.getElementById("dimension").value;
                createBoard(Number(clicking));
            });
    }
    //Parse board into bidimensional array
    let boardToArray = () => {
        let tds = document.querySelectorAll("#tictactoe td");
        let count = 0;
        var tempTds = '';
        for (let td = 0; td < tds.length; ++td) {
            tds[td].innerHTML == '' ? tempTds += " " : tempTds += tds[td].innerHTML;
            ++count;
            count.toString() == document.getElementById('dimension').value ?
                (bdmsTicTac.push(tempTds.split('')), tempTds = '', count = 0) : count;
        }
        console.log(bdmsTicTac);
    }
    showBoard();
}