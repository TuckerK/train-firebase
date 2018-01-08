var config = {
  apiKey: "AIzaSyC52_VoRvVA5rEHJoDzCrTFGIzExduIU54",
  authDomain: "train-times-11d36.firebaseapp.com",
  databaseURL: "https://train-times-11d36.firebaseio.com",
  projectId: "train-times-11d36",
  storageBucket: "train-times-11d36.appspot.com",
  messagingSenderId: "401443054063"
};
firebase.initializeApp(config);

var database = firebase.database();


database.ref().on("value",function(snapshot){
    var trains = snapshot.val();
    var keys = Object.keys(trains);
    $("#table-body").empty();

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        var train = trains[key];

        console.log(train.name, train.destination, train.frequency);

        var table = $("#time-data");

        var lastRow = $('<tr>').appendTo(table.find('tbody:last'));

        var tableName = $("<td>").text(train.name);
        var tableDestination = $("<td>").text(train.destination);
        var tableFrequency = $("<td>").text(train.frequency);

        lastRow.append(tableName, tableDestination, tableFrequency);

      }
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

function clearFields(){
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
}

$("#submit").on("click", function() {

    event.preventDefault();

  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

    var ref = database.ref();
    var data = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    ref.push(data);
    clearFields();
  
});

//calculate next train time, push dynamically to database, call value to table
//calculate minutes away based on current time, push to db, call value to table
