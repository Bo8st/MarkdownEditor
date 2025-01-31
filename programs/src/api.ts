import  express from "express";
import bodyParser from "body-parser";
import { DatabaseSystem, TokenHandler } from "./database";

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const databaseSystem = new DatabaseSystem();
const tokenSystem = new TokenHandler();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Typescript + Node.js + Express!');
})

app.post('/login', async (req, res) => {
    const body = req.body;
    let username:string = body.username;
    let password:string = body.password;
    let email:string = body.email;

    let given:any = await databaseSystem.login({username, email}, password);
    if (given.id) {
        given.token = tokenSystem.generateToken(given.id);
    }
    res.send(given)
})

app.listen(port, () => {
    console.log('Server is running');
})