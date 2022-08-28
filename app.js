const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');

const port = 3000;

const notasRouter = require('./routes/grades.js')

const { readFile, writeFile } = fs;

global.fileName = "grades.json";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/grades", notasRouter);

app.listen(port, async() => {
    try{
        await readFile(global.fileName);
    }catch (err) {
        const initialJson = {
            nextId: 1,
            grades: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson));
    }
    console.log(`Server listening on port ${port}`)
})