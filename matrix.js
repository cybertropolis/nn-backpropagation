class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for (let i = 0; i < rows; i++) {
            let array = [];
            for (let j = 0; j < cols; j++) {
                array.push(0);
            }
            this.data.push(array);
        }
    }

    static arrayToMatrix(array) {
        let matrix = new Matrix(array.length, 1);

        matrix.map((element, i, j) => {
            return array[i];
        });

        return matrix;
    }

    static matrixToArray(matrix) {
        let array = [];

        matrix.map((element, i, j) => {
            array.push(element);
        });

        return array;
    }

    print() {
        console.table(this.data);
    }

    randomize() {
        this.map((element, i, j) => {
            return Math.random() * 2 - 1;
        });
    }

    static map(a, callback) {
        let matrix = new Matrix(a.rows, a.cols);

        matrix.data = a.data.map((array, i) => {
            return array.map((number, j) => {
                return callback(number, i, j);
            });
        });

        return matrix;
    }

    map(callback) {
        this.data = this.data.map((array, i) => {
            return array.map((number, j) => {
                return callback(number, i, j);
            });
        });

        return this;
    }

    static transpose(a) {
        var matrix = new Matrix(a.cols, a.rows);

        matrix.map((number, i, j) => {
            return a.data[j][i];
        });

        return matrix;
    }

    static escalar_multiply(a, escalar) {
        var matrix = new Matrix(a.rows, a.cols);

        matrix.map((number, i, j) => {
            return a.data[i][j] * escalar;
        });

        return matrix;
    }

    static hadamard(a, b) {
        var matrix = new Matrix(a.rows, a.cols);

        matrix.map((number, i, j) => {
            return a.data[i][j] * b.data[i][j];
        });

        return matrix;
    }

    static add(a, b) {
        var matrix = new Matrix(a.rows, a.cols);

        matrix.map((element, i, j) => {
            return a.data[i][j] + b.data[i][j];
        });

        return matrix;
    }

    static subtract(a, b) {
        var matrix = new Matrix(a.rows, a.cols);

        matrix.map((element, i, j) => {
            return a.data[i][j] - b.data[i][j];
        });

        return matrix;
    }

    static multiply(a, b) {
        var matrix = new Matrix(a.rows, b.cols);

        matrix.map((number, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
                let elm1 = a.data[i][k];
                let elm2 = b.data[k][j];
                sum += elm1 * elm2;
            }
            return sum;
        });

        return matrix;
    }
}