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
  var firstTrainTime = "";

  // Capture Button Click
  $("#addTrain").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $('#train-name-input').val().trim();
    destination = $('#train-destination-input').val().trim();
    frequency = $('#train-frequency-input').val().trim();
    startTime = $('#first-train-time-input').val().trim();

    // Code for handling the push
    database.ref().push({
      trainname: trainName,
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
    //Console.loging the last user's data
    console.log(sv.trainname);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.startTime);
    addToTable(sv);
    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  function addToTable(sv) {
    var min = moment(sv.firsttraintime).add(sv.frequency, 'minutes');
    var mn = moment(min).format("HH:mm");
    console.log(mn);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(sv.trainname),
      $("<td>").text(sv.destination),
      $("<td>").text(sv.frequency),
      $('<td>').text(mn),
      // $('<td>').text(moment(sv.firsttraintime).format("HH:mm")),

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







