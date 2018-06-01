let tttBody = (dimension) => {
    let _tr;
    let _td;
    let _table = document.getElementById('tictactoe');
    while (_table.firstChild) {
        _table.removeChild(_table.firstChild)
    }
    for (let tr = 1; tr <= dimension; ++tr) {
        _tr = document.createElement("tr");
        _tr.id = tr;
        for (let td = 1; td <= dimension; ++td) {
            _td = document.createElement("td");
            _td.id = `${tr}-${td}`;
            _td.className = `${tr}-td-${td}`;
            _tr.appendChild(_td)
        }
        _table.appendChild(_tr);
    }
}

let loopingThrough = () => {
    let allTds = document.querySelectorAll(".ttt td");
    for (let index = 0; index < allTds.length; index++) {
        allTds[index].addEventListener("click", function () {
            alert("works?");
        });
    }
};

let generateTTT = () => {
    window.onload = () => {
        document.getElementById('generateButton')
            .addEventListener("click", function () {
                let clicking = document.getElementById("dimension").value;
                (clicking % 2 !== 1) ? alert("only odd numbers"): tttBody(Number(clicking));
            });
        loopingThrough();
    }
}
generateTTT();