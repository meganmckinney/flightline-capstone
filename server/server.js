"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");

let app = express();
app.use(bodyParser.json());

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// enable CORS
// Since we're not serving pages from Node, you'll get the following error if CORS isn't "enabled"
// Error:  Failed to load http://localhost:3000/login/:
// No 'Access-Control-Allow-Origin' header is present on the requested resource. 
// Origin 'null' is therefore not allowed access.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// ------ Debugging support ------------------

function logArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

// ------ Get next ID helper ------------------

function getNextId(counterType)  // use 'group'(flight) or 'member'(passenger) or 'user' as counterType
{
    // read the counter file
    let data = fs.readFileSync(__dirname + "/data/counters.json", "utf8");
    data = JSON.parse(data);

    // find the next id from the counters file and then increment the
    // counter in the file to indicate that id was used
    let id = -1;
    switch (counterType.toLowerCase()) {
        case "flight":
            id = data.nextFlight;
            data.nextFlight++;
            break;
        case "passenger":
            id = data.nextPassenger;
            data.nextPassenger++;
            break;
        case "user":
            id = data.nextUser;
            data.nextUser++;
            break;
    }

    // save the updated counter
    fs.writeFileSync(__dirname + "/data/counters.json", JSON.stringify(data));

    return id;
}

// ------ Validation helpers ------------------

function isValidFlight(flight) {
    if (flight.cabinClass == undefined || flight.cabinClass.trim() == "")
        return 1;
    if (flight.airlineName == undefined || flight.airlineName.trim() == "")
        return 2;
    if (flight.flyTo == undefined || flight.flyTo.trim() == "")
        return 3;
    if (flight.flyFrom == undefined || flight.flyFrom.trim() == "")
        return 4;
    if (flight.ticketPrice == undefined || flight.ticketPrice.trim() == "")
        return 5;
    if (flight.maxFlightSize == undefined || isNaN(flight.maxFlightSize))
        return 6;

    return -1;
}

function isValidpassenger(passenger) {
    if (passenger.passengerEmail == undefined || passenger.passengerEmail.trim() == "")
        return 1;
    if (passenger.passengerName == undefined || passenger.passengerName.trim() == "")
        return 2;
    if (passenger.passengerPhone == undefined || passenger.passengerPhone.trim() == "")
        return 3;

    return -1;
}

// ------------------------------------------------------------------------------

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});

app.get("/index.html", function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});


// ------------------------------------------------------------------------------
// THIS CODE ALLOWS REQUESTS FOR THE API THROUGH 

/* ************************************************************************* */
// NOTE:  To make debugging easy, these methods echo their processing through
//        to the terminal window.  This means there may be some unnecessary
//        parsing and stringifying.  But it is worth it as you debug your code.
/* ************************************************************************* */

// GET ORGANIZATION -> GET AIRLINE
app.get("/api/airlines", function (req, res) {
    console.log("Received a GET request for all airlines");

    let data = fs.readFileSync(__dirname + "/data/airlines.json", "utf8");
    data = JSON.parse(data);

    console.log("Returned data is: ");
    console.log(data);
    res.end(JSON.stringify(data));
});

// GET ALL GROUPS -> GET ALL FLIGHTS
app.get("/api/flights", function (req, res) {
    console.log("Received a GET request for all flights");

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    console.log("Returned data is: ");
    console.log(data);
    res.end(JSON.stringify(data));
});

// GET ONE GROUP BY ID - > GET ONE FLIGHT BY ID
app.get("/api/flights/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for flight " + id);

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    let match = data.find(element => element.flightId == id);
    if (match == null) {
        res.status(404).send("Flight Not Found");
        console.log("Flight not found");
        return;
    }

    console.log("Returned data is: ");
    console.log(match);
    res.end(JSON.stringify(match));
});

// GET MANY GROUPS BY ORGANIZATION -> GET MANY GROUPS BY AIRLINE -> GET MANY FLIGHTS BY AIRLINE
app.get("/api/flights/byairline/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a GET request for flights in airline " + id);

    let airlineData = fs.readFileSync(__dirname + "/data/airlines.json", "utf8");
    airlineData = JSON.parse(airlineData);

    let airline = airlineData.find(element => element.airlineId.toLowerCase() == id.toLowerCase());
    if (airline == null) {
        res.status(404).send("Airline Not Found");
        console.log("Airline Not Found");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // find the matching flights for a specific organization -> airline
    let matches = data.filter(element => element.airlineName == airline.airlineName);

    console.log("Returned data is: ");
    console.log(matches);
    res.end(JSON.stringify(matches));
});

// GET A SPECIFIC passenger IN A SPECIFIC FLIGHT
app.get("/api/flights/:flightId/passengers/:passengerid", function (req, res) {
    let flightId = req.params.flightId;
    let passengerId = req.params.passengerid;
    console.log("Received a GET request for passenger " + passengerId + " in flight " + flightId);

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // find the flight
    let matchingFlight = data.find(element => element.flightId == flightId);
    if (matchingFlight == null) {
        res.status(404).send("Flight Not Found");
        console.log("Flight Not Found");
        return;
    }

    // find the passenger 
    let match = matchingFlight.passengers.find(m => m.passengerId == passengerId);
    if (match == null) {
        res.status(404).send("passenger Not Found");
        console.log("passenger Not Found");
        return;
    }

    console.log("Returned data is: ");
    console.log(match);
    res.end(JSON.stringify(match));
});

// ADD A GROUP -> ADD A FLIGHT 
app.post("/api/flights", urlencodedParser, function (req, res) {
    console.log("Received a POST request to add a flight");
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble flight information so we can validate it
    let flight = {
        flightId: getNextId("flight"),  // assign id to flight
        cabinClass: req.body.cabinClass,
        airlineName: req.body.airlineName,
        flyTo: req.body.flyTo,
        flyFrom: req.body.flyFrom,
        ticketPrice: req.body.ticketPrice,
        maxFlightSize: Number(req.body.maxFlightSize),
        passengers: []
    };

    console.log("Performing validation...");
    let errorCode = isValidFlight(flight);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // add the flight
    data.push(flight);

    fs.writeFileSync(__dirname + "/data/flights.json", JSON.stringify(data));

    console.log("Flight added: ");
    console.log(flight);

    //res.status(201).send(JSON.stringify(flight));
    res.end(JSON.stringify(flight));  // return the new flight w it's flightId
});

// EDIT A GROUP -> EDIT A FLIGHT
app.put("/api/flights", urlencodedParser, function (req, res) {
    console.log("Received a PUT request to flight a team");
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble flight information so we can validate it
    let flight = {
        flightId: req.body.flightId,  // req.params.id if you use id in URL instead of req.body.flightId
        cabinClass: req.body.cabinClass,
        airlineName: req.body.airlineName,
        flyTo: req.body.flyTo,
        flyFrom: req.body.flyFrom,
        ticketPrice: req.body.ticketPrice,
        maxFlightSize: Number(req.body.maxFlightSize),
    };

    console.log("Performing validation...");
    let errorCode = isValidFlight(flight);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // find the flight
    let match = data.find(element => element.flightId == flight.flightId);
    if (match == null) {
        res.status(404).send("Flight Not Found");
        console.log("Flight Not Found");
        return;
    }

    // update the flight
    match.cabinClass = flight.cabinClass;
    match.airlineName = flight.airlineName;
    match.flyTo = flight.flyTo;
    match.flyFrom = flightt.flyFrom;
    match.ticketPrice = flight.ticketPrice;

    // make sure new values for maxFlightSize doesn't invalidate grooup
    if (Number(flight.maxFlightSize) < match.passengers.length) {
        res.status(409).send("New flight size too small based on current number of passengers");
        console.log("New flight size too small based on current number of passengers");
        return;
    }
    match.maxFlightSize = Number(flight.maxFlighttSize);

    fs.writeFileSync(__dirname + "/data/flights.json", JSON.stringify(data));

    console.log("Update successful!  New values: ");
    console.log(match);
    res.status(200).send();
});

// DELETE A GROUP -> DELETE A FLIGHT
app.delete("/api/flights/:id", function (req, res) {
    let id = req.params.id;
    console.log("Received a DELETE request for flight " + id);

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // find the index number of the group in the array
    let foundAt = data.findIndex(element => element.flightId == id);

    // delete the group if found
    if (foundAt != -1) {
        data.splice(foundAt, 1);
    }

    fs.writeFileSync(__dirname + "/data/flights.json", JSON.stringify(data));

    console.log("Delete request processed");
    // Note:  even if we didn't find the group, send a 200 because they are gone
    res.status(200).send();
});

// ADD A passenger TO A GROUP
app.post("/api/flights/:id/passengers", urlencodedParser, function (req, res) {
    let id = req.params.id;
    console.log("Received a POST request to add a passenger to flight " + id);
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble passenger information so we can validate it
    let passenger = {
        passengerId: getNextId("passenger"),   // assign new id
        passengerEmail: req.body.passengerEmail,
        passengerName: req.body.passengerName,
        passengerPhone: req.body.passengerPhone
    };

    console.log("Performing passenger validation...");
    let errorCode = isValidpassenger(passenger);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // find the flight
    let match = data.find(element => element.flightId == id);
    if (match == null) {
        res.status(404).send("Flight Not Found");
        console.log("Flight Not Found");
        return;
    }

    if (match.passengers.length == match.maxFlightSize) {
        res.status(409).send("passenger not added - flight at capacity");
        console.log("passenger not added - flight at capacity");
        return;
    }

    // add the passenger
    match.passengers.push(passenger);

    fs.writeFileSync(__dirname + "/data/flights.json", JSON.stringify(data));

    console.log("New passenger added!");
    console.log(passenger);

    //res.status(201).send(JSON.stringify(passenger));
    res.end(JSON.stringify(passenger));  // return the new passenger with passenger id
});

// EDIT A member IN A GROUP -> EDIT A PASSENGER IN A GROUP -> EDIT A passenger IN A FLIGHT
app.put("/api/flights/:id/passengers", urlencodedParser, function (req, res) {
    let id = req.params.id;
    console.log("Received a PUT request to edit a passenger in flight " + id);
    console.log("BODY -------->" + JSON.stringify(req.body));

    // assemble passenger information so we can validate it
    let passenger = {
        passengerId: req.body.passengerId,
        passengerEmail: req.body.passengerEmail,
        passengerName: req.body.passengerName,
        passengerPhone: req.body.passengerPhone
    };

    console.log("Performing passenger validation...");
    let errorCode = isValidpassenger(passenger);
    if (errorCode != -1) {
        console.log("Invalid data found! Reason: " + errorCode);
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    // find the flight
    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    // find the flight
    let matchingFlight = data.find(element => element.flightId == id);
    if (matchingFlight == null) {
        res.status(404).send("Flight Not Found");
        return;
    }

    // find the passenger
    let match = matchingFlight.passengers.find(m => m.passengerId == req.body.passengerId);
    if (match == null) {
        res.status(404).send("passenger Not Found");
        return;
    }

    // update the passenger
    match.passengerEmail = req.body.passengerEmail;
    match.passengerName = req.body.passengerName;
    match.passengerPhone = req.body.passengerPhone;

    fs.writeFileSync(__dirname + "/data/flights.json", JSON.stringify(data));

    console.log("passenger updated!");
    res.status(200).send();
});

// DELETE A passenger IN A FLIGHT
app.delete("/api/flights/:flightId/passengers/:passengerid", urlencodedParser, function (req, res) {
    let flightId = req.params.flightId;
    let passengerId = req.params.passengerid;
    console.log("Received a DELETE request for passenger " + passengerId + " in flight " + flightId);

    // find the flight
    let data = fs.readFileSync(__dirname + "/data/flights.json", "utf8");
    data = JSON.parse(data);

    let matchingFlight = data.find(element => element.flightId == flightId);
    if (matchingFlight == null) {
        res.status(404).send("Flight Not Found");
        console.log("Flight Not Found");
        return;
    }

    // find the passenger
    let foundAt = matchingFlight.passengers.findIndex(m => m.passengerId == passengerId);

    // delete the passenger if found
    if (foundAt != -1) {
        matchingFlight.passengers.splice(foundAt, 1);
    }

    fs.writeFileSync(__dirname + "/data/flights.json", JSON.stringify(data));

    console.log("Delete request processed");
    // Note:  even if we didn't find them, send a 200 back because they are gone
    res.status(200).send();
});

// ----------------------------------------------------------------------------
// USER MANAGEMENT

// GET request to check if user name is available
app.get("/api/username_available/:username", function (req, res) {
    let username = req.params.username;
    console.log("Checking to see if this username " + username + " is available");

    let data = fs.readFileSync(__dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    let matchingUser = data.find(user => user.username.toLowerCase() == username.toLowerCase());

    let message;
    if (matchingUser == null) {
        message = "YES";
    }
    else {
        message = "NO";
    }

    console.log("Is user name available? " + message);
    res.end(message);
});

// POST request to add a user
app.post("/api/users", urlencodedParser, function (req, res) {
    console.log("Got a POST request to add a user");
    console.log("BODY -------->" + JSON.stringify(req.body));

    let data = fs.readFileSync(__dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    // check for duplicate username
    let matchingUser = data.find(user => user.username.toLowerCase() == req.body.username.toLowerCase());
    if (matchingUser != null) {
        // username already exists
        console.log("ERROR: username already exists!");
        res.status(403).send();   // forbidden - 403 has no message; programmers should
                                  // have used GET /api/username_available/:username to see if
                                  // if user registration would have worked
        return;
    }

    let user = {
        id: getNextId("user"),   // assign new id      
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    data.push(user);

    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(data));

    console.log("New user added!");
    console.log(user);
    res.status(200).send();
});

// POST request to login -- sent username and password in request body 
app.post("/api/login", urlencodedParser, function (req, res) {
    console.log("Got a POST request for a user to login");
    console.log("BODY -------->" + JSON.stringify(req.body));

    let data = fs.readFileSync(__dirname + "/data/users.json", 'utf8');
    data = JSON.parse(data);

    // check to see if credentials match a user
    let match = data.find(user => user.username.toLowerCase() == req.body.username.toLowerCase() &&
        user.password == req.body.password);

    if (match == null) {
        // credentials don't match any user
        console.log("Error:  credentials don't match known user");
        res.status(403).send();   // forbidden
        return;
    }

    let user = {
        id: match.id,
        name: match.name,
        username: match.username
    };

    // login successful - return user w/o password
    console.log("Login successful for: ");
    console.log(user);
    res.end(JSON.stringify(user));
});

// ------------------------------------------------------------------------------
// SITE SET-UP

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

let server = app.listen(8082, function () {
    let port = server.address().port;

    console.log("App listening at port %s", port);
});
