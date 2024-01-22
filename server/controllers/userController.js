import db from "../database/db.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()


const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
        await db.query(sql, [username, password], (err, result) => {
            if(err){
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error', success: false })
            }

            if(result.length === 0) return res.status(200).json({ message: "Invalid username or password.", success: false })

            const user = result[0]
            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' })

            // Return success along with the JWT token
            return res.status(200).json({ message: "Login success",username: username, password: password , token, success: true })
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error', success: false })
    }
}


const addUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const checkEmailSql = `SELECT * FROM users WHERE Email = ? OR username = ?`;
        const existingUser = await new Promise((resolve, reject) => {
            db.query(checkEmailSql, [email,username], (err, results) => {
                (err)? reject(err): resolve(results)
            });
        });

        if (existingUser.length !== 0) {
            return res.status(200).json({ message: "Email or Username already exists", success: false });
        }
        const insertSql = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
        const insertResult = await new Promise((resolve, reject) => {
            db.query(insertSql, [email, username, password], (err, result) => {
                (err)? reject(err):  resolve(result)
            })
        })

        if (!insertResult.insertId) {
            return res.status(500).json({ error: 'Internal Server Error', success: false });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_AUTH,
                pass: process.env.EMAIL_PASS,
            },
        });
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_AUTH,
                to: email, // Replace with the user's email
                subject: 'Email Verification Code',
                text: `Your verification code is: ${verificationCode}`,
            });

            //res.status(200).json({ message: 'Verification code sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
        return res.status(201).json({ message: 'Data successfully created',code: verificationCode, success: true  });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export {
    login,
    addUser
}