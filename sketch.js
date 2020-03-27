var train = true;

function setup() {
    createCanvas(500, 500);
    background(0);

    let A = new Matrix(2, 1);
    let B = new Matrix(2, 1);

    A.randomize();
    B.randomize();

    A.print();
    B.print();

    let C = Matrix.hadamard(A, B);

    C.print();

    // var nn = new NeuralNetwork(1, 3, 5);
    // var arr = [1, 2];
    // nn.feedforward(arr);
}

function draw() {

}