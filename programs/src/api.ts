import  express from "express";
import { DatabaseSystem } from "./database";

const app = express();
const databaseSystem = new DatabaseSystem();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Typescript + Node.js + Express!');
})


app.listen(port, () => {
    console.log('Server is running');
})