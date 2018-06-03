 window.onload = () => {
     //Array where board will be store to determine the winner
     var boardStorage = [];
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
         let boolSwitcher = false;
         let save = [];
         let oPattern = /[O]/g;
         let xPattern = /[X]/g;
         let count = 0;
         document.querySelectorAll("#tictactoe td")
             .forEach(e =>
                 e.addEventListener("click", function () {
                     boolSwitcher = !boolSwitcher;
                     if (this.innerText === '') {
                         boolSwitcher === true ? this.innerText = "O" : this.innerText = "X";
                         boardToArray();
                         winner(boardStorage);
                     }
                     boardStorage = [];
                 }))
     }
     let winner = (arr) => {
         let hztlWinner = true;
         let vtclWinner = true;
         let dgnlWinnfer = true;
         for (let index = 0; index < arr.length; index++) {
             winner = arr[index].every(v => v == arr[index][0] && arr[index][0] != " ");
             winner ? (
                 alert(`The winner is : ${arr[index][0]} | Row ${index + 1}`),
                 document.querySelectorAll("#tictactoe td").forEach(e => e.innerHTML = '')
             ) : "";
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
         console.log(boardStorage);
     }
 }