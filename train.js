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
    var drequency = 0;
    var firstTrainTime = "";

    // Capture Button Click
    $("#addTrain").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      trainName = $('#train-name-input').val().trim();
      destination = $('#train-destination-input').val().trim();
      frequency = $('#train-frequency-input').val().trim();
      firstTrainTime = $('#first-train-time-input').val().trim();

      // Code for handling the push
      database.ref().push({
        trainname: trainName,
        destination: destination,
        frequency: frequency,
        firsttraintime: firstTrainTime,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      // Console.loging the last user's data
      console.log(sv.trainname);
      console.log(sv.destination);
      console.log(sv.frequency);
      console.log(sv.firsttraintime);
      addToTable(sv);
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    function addToTable(sv) {
     var dt = moment(sv.firsttraintime, "hmm").format("HH:mm");
     var fr = moment(sv.frequency, "mm").format('mm');
     var a = moment(dt).add(fr, 'minutes').minutes();
     console.log(a);
       // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(sv.trainname),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency ),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
}

    

    



