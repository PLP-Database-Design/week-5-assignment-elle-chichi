// import our dependancies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

//configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//test the db connection
db.connect((err) => {
    //connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection is successful
    console.log("Successfully connected to MySQL:", db.threadId)
})



//GET, POST, PUT, DELETE
//Question 1 Create a ```GET``` endpoint that retrieves all patients and displays their: patient_id, first_name, last_name, date_of_birth.
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})

// Question 2 Create a ```GET``` endpoint that displays all providers with their first_name, last_name, provider_specialty
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).send(data)
    })
})

// Question 3 - Create a ```GET``` endpoint that retrieves all patients by their first name
app.get('/patients_firstName', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    })
})

// Question 4 Retrieve all providers by their specialty
app.get('/providers_specialty', (req, res) => {
    const getProviders = "SELECT provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get providers specialty", err)
        }

        res.status(200).send(data)
    })
})


// basic endpoint to say Hello World
//app.get('',(req, res) =>{
//    res.send("Hello Michelle here!!")
//})



// start and listen to the server
app.listen(3300,() => {
    console.log("server is running on port 3300 ....")
})