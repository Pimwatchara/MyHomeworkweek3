const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data

// MySQL connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '',  // Replace with your MySQL password
    database: 'student_database',
    port: 3306  // Default MySQL port
});

// Serve the student.html file
app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
});

// Handle POST request to add student
app.post("/students", async (req, res) => {
    const { name, age, phone, email } = req.body;

    try {
        const connection = await dbConn;
        const [rows] = await connection.query(
            "INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)", 
            [name, age, phone, email]
        );
        res.status(201).send(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to add student');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
