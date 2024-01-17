import express from 'express'


const app = express()

app.use(express.json())



app.listen(8000, () => console.log("Application lisening on http://127.0.0.1:8000"))