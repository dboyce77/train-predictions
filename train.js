$(document).ready(function () {

  // intialize firebase
  var config = {
    apiKey: "AIzaSyBekKLHVsfXfB_M-iIIPCYfPAxlxXOkMRU",
    authDomain: "train-schedule-566ef.firebaseapp.com",
    databaseURL: "https://train-schedule-566ef.firebaseio.com",
    projectId: "train-schedule-566ef",
    storageBucket: "train-schedule-566ef.appspot.com",
    messagingSenderId: "355523368413"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var frequency = 0;
  var startTime = "";
  var startTimeConverted

  // Capture Button Click
  $("#addTrain").on("click", function (ev, ent) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $('#train-name-input').val().trim();
    destination = $('#train-destination-input').val().trim();
    frequency = $('#train-frequency-input').val().trim();
    startTime = $('#first-train-time-input').val().trim();

    console.log(startTime);

    // Code for handling the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        startTime: startTime,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // console.log(sv);
    // //Console.loging the last user's data
    console.log(sv.trainTame);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.startTime);
    nextArrival()
    // Handle the errors
    }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  function nextArrival() {
    startTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    console.log("startTimeConverted:" + startTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment(currentTime).diff(moment(startTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

     // Minute Until Train
     var tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    // var nextTrain = moment(startTimeConverted).add(tMinutesTillTrain, "minutes");
    var nextTrain = moment(startTimeConverted).add(frequency, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainArrival = moment(nextTrain).format("hh:mm");


    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $('<td>').text(nextTrainArrival),
      $('<td>').text(tMinutesTillTrain),


    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  }

  // function getData() {
  //   // Code for handling the push
  //   database.ref().pull({
  //     trainname: trainName,
  //     destination: destination,
  //     frequency: frequency,
  //     firsttraintime: firstTrainTime,

  //   })
  // }



});







