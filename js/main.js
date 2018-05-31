let tttBody = (dimension) => {
    var _tr;
    var _td;
    var _table = document.getElementById('tictactoe');
    while (_table.firstChild) {
        _table.removeChild(_table.firstChild)
    }
    for (let tr = 1; tr <= dimension; ++tr) {
        _tr = document.createElement("tr");
        _tr.id = tr;
        for (let td = 1; td <= dimension; td++) {
            _td = document.createElement("td");
            _td.id = td;
            _td.className = `td-${td}`;
            _tr.appendChild(_td)
        }
        _table.appendChild(_tr);
    }
}
let loopingThrough = () => {
    document.querySelectorAll('.ttt td').forEach((tds) => {
        tds.on("click", () => {
            console.log("test");
        });
    });
    // document.querySelector(".td-1").addEventListener("click", function () {

    // })
};
let generateTTT = () => {
    window.onload = () => {
        document.getElementById('generateButton')
            .addEventListener("click", function () {
                let clicking = document.getElementById("dimension").value;
                (clicking % 2 != 1) ? alert("only odd numbers"): tttBody(Number(clicking));
            });
        loopingThrough();
    }
}

generateTTT();



hello();