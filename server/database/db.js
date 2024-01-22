import mysql from 'mysql'
import dotenv from 'dotenv'
import users from "./users.js"

dotenv.config()

dotenv.config()
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

const db = mysql.createConnection(config);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database!');
    }
});

// Create user Table
db.query(users, (err) => {
    if(err) return console.log(err)
})

export default db