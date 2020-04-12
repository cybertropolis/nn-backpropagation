var train = true;

function setup() {
    createCanvas(500, 500);
    background(0);

    nn = new NeuralNetwork(2, 3, 1);

    // XOR Problem
    dataset = {
        inputs: [
            [1, 1],
            [1, 0],
            [0, 1],
            [0, 0]
        ],
        outputs: [
            [0],
            [1],
            [1],
            [0]
        ]
    };
}

function draw() {
    if (train) {
        for (var i = 0; i < 1000; i++) {
            var index = floor(random(4));
            nn.train(dataset.inputs[index], dataset.outputs[index]);
        }
        
        var p1 = nn.predict([0, 0]);
        var p2 = nn.predict([1, 0]);

        if (p1[0] < 0.04 && p2[0] > 0.98) {
            train = false;

            console.log("prediction 1: ", p1[0]);
            console.log("prediction 2: ", p2[0]);
        }
    }
}