'use strict';

const settings = {
    rowLength: 10, // 1-8
    colLength: 10, // A-H
    whiteCell: 'white',
    blackCell: '#000000a6',
};

const figure = {
    row: null,
    col: null,
    pos: null,
    color: null,
    code: null,
    name: null,

    move(newPos) {
        this.pos = newPos;
        this.row = newPos[0];
        this.col = +newPos[1];
    }
};

const figure_codes = {
    'white_pawn': '&#9817;',//пешка
    'white_horse': '&#9816;',//конь
    'white_elephant': '&#9815;',//слон
    'white_rook': '&#9814;',//ладья
    'white_queen': '&#9813;',//ферзь
    'white_king': '&#9812;',//король

    'black_pawn': '&#9817;',//пешка
    'black_horse': '&#9822;',//конь
    'black_elephant': '&#9821;',//слон
    'black_rook': '&#9820;',//ладья
    'black_queen': '&#9819;',//ферзь
    'black_king': '&#9818;',//король
};

const chessBoard = {
    settings,
    cells: [], //будем хранить ячейки
    rows: {}, //объект для позиции по горизонтали
    cols: {}, //объект для позиции по вертикали
    figures: [
        {'row': 7, 'col': 'A', 'pos': 'A7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'B', 'pos': 'B7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'C', 'pos': 'C7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'D', 'pos': 'D7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'E', 'pos': 'E7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'F', 'pos': 'F7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'G', 'pos': 'G7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},
        {'row': 7, 'col': 'H', 'pos': 'H7', 'color': 'w', 'code': '&#9817;', 'name': 'pw'},

        {'row': 8, 'col': 'A', 'pos': 'A8', 'color': 'w', 'code': '&#9814;', 'name': 'Rw'},
        {'row': 8, 'col': 'H', 'pos': 'H8', 'color': 'w', 'code': '&#9814;', 'name': 'Rw'},

        {'row': 8, 'col': 'B', 'pos': 'B8', 'color': 'w', 'code': '&#9815;', 'name': 'Hw'},
        {'row': 8, 'col': 'G', 'pos': 'G8', 'color': 'w', 'code': '&#9815;', 'name': 'Hw'},

        {'row': 8, 'col': 'C', 'pos': 'C8', 'color': 'w', 'code': '&#9815;', 'name': 'Ew'},
        {'row': 8, 'col': 'F', 'pos': 'F8', 'color': 'w', 'code': '&#9815;', 'name': 'Ew'},

        {'row': 8, 'col': 'D', 'pos': 'D8', 'color': 'w', 'code': '&#9812;', 'name': 'Kw'},
        {'row': 8, 'col': 'E', 'pos': 'E8', 'color': 'w', 'code': '&#9813;', 'name': 'Qw'},

        {'row': 2, 'col': 'A', 'pos': 'A2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'B', 'pos': 'B2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'C', 'pos': 'C2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'D', 'pos': 'D2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'E', 'pos': 'E2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'F', 'pos': 'F2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'G', 'pos': 'G2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},
        {'row': 2, 'col': 'H', 'pos': 'H2', 'color': 'w', 'code': '&#9823;', 'name': 'pb'},

        {'row': 1, 'col': 'A', 'pos': 'A1', 'color': 'w', 'code': '&#9820;', 'name': 'Rb'},
        {'row': 1, 'col': 'H', 'pos': 'H1', 'color': 'w', 'code': '&#9820;', 'name': 'Rb'},

        {'row': 1, 'col': 'B', 'pos': 'B1', 'color': 'w', 'code': '&#9822;', 'name': 'Hb'},
        {'row': 1, 'col': 'G', 'pos': 'G1', 'color': 'w', 'code': '&#9822;', 'name': 'Hb'},

        {'row': 1, 'col': 'C', 'pos': 'C1', 'color': 'w', 'code': '&#9821;', 'name': 'Eb'},
        {'row': 1, 'col': 'F', 'pos': 'F1', 'color': 'w', 'code': '&#9821;', 'name': 'Eb'},

        {'row': 1, 'col': 'D', 'pos': 'D1', 'color': 'w', 'code': '&#9818;', 'name': 'Kb'},
        {'row': 1, 'col': 'E', 'pos': 'E1', 'color': 'w', 'code': '&#9819;', 'name': 'Qb'},
    ],


    /**
     * определяет цвет ячейки
     * @param {Integer} row текущий ряд
     * @param {Integer} col текущая колонка
     * @return {boolean}
     */
    isBlack(row, col) {
        return row % 2 !== 0 && col % 2 === 0 || row % 2 === 0 && col % 2 !== 0
    },

    /**
     * большой метод, рисует доску полностью и сохраняет ячейки в this.cells
     */
    draw() {
        let chessBoard_ = document.getElementById('chess-board');
        console.log('board 1 >', chessBoard);
        chessBoard_.innerHTML = '';

        for (let row = 0; row < this.settings.rowLength; row++) {
            const tableRow = document.createElement('tr');
            chessBoard_.appendChild(tableRow);
            for (let col = 0; col < this.settings.colLength; col++) {
                const cell = document.createElement('td');
                if (row === 0 || row === 9) {
                    switch (col) {
                        case 1:
                            cell.innerText = 'A';
                            this.cols[col] = 'A';
                            break;
                        case 2:
                            cell.innerText = 'B';
                            this.cols[col] = 'B';
                            break;
                        case 3:
                            cell.innerText = 'C';
                            this.cols[col] = 'C';
                            break;
                        case 4:
                            cell.innerText = 'D';
                            this.cols[col] = 'D';
                            break;
                        case 5:
                            cell.innerText = 'E';
                            this.cols[col] = 'E';
                            break;
                        case 6:
                            cell.innerText = 'F';
                            this.cols[col] = 'F';
                            break;
                        case 7:
                            cell.innerText = 'G';
                            this.cols[col] = 'G';
                            break;
                        case 8:
                            cell.innerText = 'H';
                            this.cols[col] = 'H';
                            break;
                    }
                } else if (col === 0 || col === 9) {
                    switch (row) {
                        case 1:
                            cell.innerText = '8';
                            this.rows[row] = 8;
                            break;
                        case 2:
                            cell.innerText = '7';
                            this.rows[row] = 7;
                            break;
                        case 3:
                            cell.innerText = '6';
                            this.rows[row] = 6;
                            break;
                        case 4:
                            cell.innerText = '5';
                            this.rows[row] = 5;
                            break;
                        case 5:
                            cell.innerText = '4';
                            this.rows[row] = 4;
                            break;
                        case 6:
                            cell.innerText = '3';
                            this.rows[row] = 3;
                            break;
                        case 7:
                            cell.innerText = '2';
                            this.rows[row] = 2;
                            break;
                        case 8:
                            cell.innerText = '1';
                            this.rows[row] = 1;
                            break;
                    }
                } else {
                    cell.setAttribute('id', this.cols[col] + this.rows[row]);
                    if (this.isBlack(row, col)) {
                        cell.style.backgroundColor = settings.blackCell;
                    }
                    const newCell = {
                        elem: cell,
                        row: this.rows[row],
                        col: this.cols[col],
                    };
                    this.cells.push(newCell);
                }
                tableRow.appendChild(cell);
            }
        }
    },

    renderFigures() {
        console.log('in render before draw');
        this.draw();
        for (let fig of this.figures) {
            for (let cell of this.cells) {
                if (fig.row === cell.row && fig.col === cell.col) {
                    cell.elem.innerHTML = fig.code
                }
            }
        }
    },

    takeMove() {

        this.renderFigures();
        console.log('here');

        setTimeout(
            function () {
            },
            1000);

        let nextMove = prompt('Введите ход (напр. E2 E4), выход Q');

        let currPosition = {col: nextMove[0], row: +nextMove[1], pos: nextMove.split(' ')[0]};
        let nextPosition = {col: nextMove[3], row: +nextMove[4], pos: nextMove.split(' ')[1]};
        console.log(currPosition.pos);
        console.log(this.figures[6].pos);


        for (let fig of this.figures) {
            let figPos = fig.pos;
            if (figPos === currPosition.pos) {
                console.log('eq', fig);
                fig.pos = nextPosition.pos;
                fig.row = nextPosition.row;
                fig.col = nextPosition.col;
            }
        }
    }

};

window.onload = () => chessBoard.takeMove();