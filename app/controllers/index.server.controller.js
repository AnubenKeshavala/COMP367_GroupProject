//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require('@tensorflow/tfjs');
    // require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const iris = require('../../iris.json');
    const irisTesting = require('../../iris-testing.json');
    var lossValue;
    //
    exports.trainAndPredict = function (req, res) {
        console.log(irisTesting);
      
        //
        // convert/setup our data for tensorflow.js
        //
        //tensor of features for training data
        const trainingData = tf.tensor2d(
          iris.map((item) => [
            item.sepal_length,
            item.sepal_width,
            item.petal_length,
            item.petal_width,
          ])
        );
        //tensor of output for training data
        const outputData = tf.tensor2d(
          iris.map((item) => [
            item.species === "setosa" ? 1 : 0,
            item.species === "virginica" ? 1 : 0,
            item.species === "versicolor" ? 1 : 0,
          ])
        );
        //
        //tensor of features for testing data
        const testingData = tf.tensor2d(
          irisTesting.map((item) => [
            item.sepal_length,
            item.sepal_width,
            item.petal_length,
            item.petal_width,
          ])
        );
      
        // build neural network using a sequential model
        const model = tf.sequential();
        //add the first layer
        model.add(
          tf.layers.dense({
            inputShape: [4], // four input neurons
            activation: "sigmoid",
            units: 5, //dimension of output space (first hidden layer)
          })
        );
        //add the hidden layer
        model.add(
          tf.layers.dense({
            inputShape: [5], //dimension of hidden layer
            activation: "sigmoid",
            units: 3, //dimension of final output
          })
        );
      
        //add output layer
        model.add(
          tf.layers.dense({
            activation: "sigmoid",
            units: 3, //dimension of final output
          })
        );
        //compile the model with an MSE loss function and Adam algorithm
        model.compile({
          loss: "meanSquaredError",
          optimizer: tf.train.adam(0.06),
        });
      
        console.log(model.summary());
      
        //train the model and predic
      
        async function run() {
          const startTime = Date.now();
          await model.fit(trainingData, outputData, {
            epochs: 100,
            callbacks: {
              onEpochEnd: async (epoch, log) => {
                //lossValue = log.loss;
                console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                elapsedTime = Date.now() - startTime;
                console.log("elapsed time: " + elapsedTime);
              },
            },
          });
          const results = model.predict(testingData);
      
          results.array().then((array) => {
            console.log(array[0][0]);
            var resultForData1 = array[0];
            var resultForData2 = array[1];
            var resultForData3 = array[2];
            var dataToSend = {
              row1: resultForData1,
              row2: resultForData2,
              row3: resultForData3,
            };
            console.log(resultForData1);
            res.status(200).send(dataToSend);
          });
        } 
        run();
      };
      
      
      exports.trainAndPredictWithParam = function (req, res) {
      
        console.log('req.body : ' + req.body);
      
        console.log('req.body.sepallength in trainAndPredictWithParam : ' + req.body.sepallength);
        console.log('req.body.sepalwidth in trainAndPredictWithParam : ' + req.body.sepalwidth);
        console.log('req.body.petallength in trainAndPredictWithParam : ' + req.body.petallength);
        console.log('req.body.petalwidth in trainAndPredictWithParam : ' + req.body.petalwidth);
        console.log('req.body.epoch in trainAndPredictWithParam : ' + req.body.epoch);
        console.log('req.body.lrRate in trainAndPredictWithParam : ' + req.body.lrRate);
      
        const sepallength = parseFloat(req.body.sepallength);
        const sepalwidth = parseFloat(req.body.sepalwidth);
        const petallength = parseFloat(req.body.petallength);
        const petalwidth = parseFloat(req.body.petalwidth);
        const epoch = parseFloat(req.body.epoch);
        const lrRate = parseFloat(req.body.lrRate);
      
        //
        // convert/setup our data for tensorflow.js
        //
        //tensor of features for training data
        const trainingData = tf.tensor2d(
          iris.map((item) => [
            item.sepal_length,
            item.sepal_width,
            item.petal_length,
            item.petal_width,
          ])
        );
        //tensor of output for training data
        const outputData = tf.tensor2d(
          iris.map((item) => [
            item.species === "setosa" ? 1 : 0,
            item.species === "virginica" ? 1 : 0,
            item.species === "versicolor" ? 1 : 0,
          ])
        );
      
        const testingData = tf.tensor2d([
          [sepallength, sepalwidth, petallength, petalwidth],
          ]);
      
        // build neural network using a sequential model
        const model = tf.sequential();
        //add the first layer
        model.add(
          tf.layers.dense({
            inputShape: [4], // four input neurons
            activation: "sigmoid",
            units: 5, //dimension of output space (first hidden layer)
          })
        );
        //add the hidden layer
        model.add(
          tf.layers.dense({
            inputShape: [5], //dimension of hidden layer
            activation: "sigmoid",
            units: 3, //dimension of final output
          })
        );
      
        //add output layer
        model.add(
          tf.layers.dense({
            activation: "sigmoid",
            units: 3, //dimension of final output
          })
        );
        //compile the model with an MSE loss function and Adam algorithm
        model.compile({
          loss: "meanSquaredError",
          optimizer: tf.train.adam(lrRate),
        });
      
        console.log(model.summary());
      
        //train the model and predic
      
        async function run() {
          const startTime = Date.now();
          await model.fit(trainingData, outputData, {
            epochs: epoch,
            callbacks: {
              onEpochEnd: async (epoch, log) => {
               // lossValue = log.loss;
               console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                elapsedTime = Date.now() - startTime;
                console.log("elapsed time: " + elapsedTime);
              },
            },
          });
          const results = model.predict(testingData);
      
          results.array().then((array) => {
            console.log(array[0][0]);
            var resultForData1 = array[0];
      //      var resultForData2 = array[1];
      //      var resultForData3 = array[2];
            var dataToSend = {
              row1: resultForData1,
      //        row2: resultForData2,
      //        row3: resultForData3,
            };
            console.log(resultForData1);
            res.status(200).send(dataToSend);
          });
        } //end of the function
        run();
      
      
      };
      