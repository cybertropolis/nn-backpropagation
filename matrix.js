class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = [];

        for (let i = 0; i < rows; i++) {
            let arr = [];
            for (let j = 0; j < cols; j++) {
                arr.push(Math.floor(Math.random() * 10));
            }
            this.data.push(arr);
        }
    }

    // Funções Diversas

    static arrayToMatrix(arr) {
        let matrix = new Matrix(arr.length, 1);

        matrix.map((element, i, j) => {
            return arr[i];
        });

        return matrix;
    }

    print() {
        console.table(this.data);
    }

    randomize() {
        this.map((element, i, j) => {
            // return Math.random() * 2 - 1;
            return Math.floor(Math.random() * 10);
        });
    }

    map(callback) {
        this.data = this.data.map((element, i) => {
            return element.map((number, j) => {
                return callback(number, i, j);
            });
        });

        return this;
    }

    static map(a, callback) {
        let matrix = new Matrix(a.rows, b.cols);

        matrix.data = matrix.data.map((element, i) => {
            return element.map((number, j) => {
                return callback(number, i, j);
            });
        });

        return matrix;
    }

    static transpose(a) {
        var matrix = new Matrix(a.cols, a.rows);

        matrix.map((number, i, j) => {
            return a.data[j][i];
        });

        return matrix;
    }
    
    // Operações Estáticas Matriz x Escalar

    static escalar_multiply(a, escalar) {
        var matrix = new Matrix(a.rows, a.cols);

        matrix.map((number, i, j) => {
            return a.data[i][j] * escalar;
        });

        return matrix;
    }

    // Operações Estáticas Matriz x Matriz

    static hadamard(A, B) {
        var matrix = new Matrix(A.rows, A.cols);

        matrix.map((number, i, j) => {
            return A.data[i][j] * B.data[i][j];
        });

        return matrix;
    }

    static add(a, b) {
        var matrix = new Matrix(a.rows, b.cols);

        matrix.map((element, i, j) => {
            return a.data[i][j] + b.data[i][j];
        });

        return matrix;
    }

    static add(a, b) {
        var matrix = new Matrix(a.rows, b.cols);

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