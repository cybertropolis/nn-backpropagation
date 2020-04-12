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

        this.learning_rate = 0.1;
    }

    train(array, target) {
        // INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(array);
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);

        hidden.map(sigmoid);

        // HIDDEN -> OUTPUT
        // d(Sigmoid) = Output * (i - Output)
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);

        output.map(sigmoid);

        // BACKPROPAGATION

        // OUTPUT -> HIDDEN
        let expected = Matrix.arrayToMatrix(target);
        let output_error = Matrix.subtract(expected, output);
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_t = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(d_output, output_error);
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);

        // Adjust Bias OUTPUT -> HIDDEN
        this.bias_ho = Matrix.add(this.bias_ho, gradient);

        // Adjust Weights OUTPUT -> HIDDEN
        let weigths_ho_deltas = Matrix.multiply(gradient, hidden_t);
        this.weights_ho = Matrix.add(this.weights_ho, weigths_ho_deltas);

        // HIDDEN -> INPUT
        let weigths_ho_t = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weigths_ho_t, output_error);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_t = Matrix.transpose(input);

        let gradient_h = Matrix.hadamard(d_hidden, hidden_error);
        gradient_h = Matrix.escalar_multiply(gradient_h, this.learning_rate);

        // Adjust Bias OUTPUT -> HIDDEN
        this.bias_ih = Matrix.add(this.bias_ih, gradient_h);

        // Adjust Weights HIDDEN -> INPUT
        let weigths_ih_deltas = Matrix.multiply(gradient_h, input_t);
        this.weigths_ih = Matrix.add(this.weights_ih, weigths_ih_deltas);
    }

    predict() {
        // INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(tensor);

        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        // HIDDEN -> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        output = Matrix.matrixToArray(output);

        return output;
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    // d(Sigmoid) = Output * (1 - Output)
    return x * (1 - x);
}