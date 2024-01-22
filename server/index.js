import express from 'express'
import cors from 'cors'
import userRoute from "./routes/userRoute.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRoute)

app.get('/' ,(req,res) => {
    res.status(200).send("Hello world")
})

app.listen(8000, () => console.log("Application listening on http://127.0.0.1:8000/"))