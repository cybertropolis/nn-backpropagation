class NeuralNetwork {
    constructor(i_neurons, h_neurons, o_neurons) {
        this.i_neurons = i_neurons;
        this.h_neurons = h_neurons;
        this.o_neurons = o_neurons;

        this.bias_ih = new Matrix(h_neurons, 1);
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(o_neurons, 1);
        this.bias_ho.randomize();

        this.weights_ih = new Matrix(h_neurons, i_neurons);
        this.weights_ih.randomize();
        this.weights_ho = new Matrix(o_neurons, h_neurons);
        this.weights_ho.randomize();

    }

    feedforward(arr) {
        let input = Matrix.arrayToMatrix(arr);
        
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        output.print();        
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}