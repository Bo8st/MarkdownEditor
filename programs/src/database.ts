import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();

import { neon } from "@neondatabase/serverless"

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const url: string = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

const sql: any = neon(url);

const requestHandler = async (): Promise<any> => {
    try {
        const result = await sql`SELECT version()`;
        const {version} = result[0];
        return version;
    } catch (error) {
        console.error('an error occured');
    }
}

const createUser = async (username:string, email:string, password:string) : Promise<any> => {
    let saltRounds: number = 10;
    const encPassword: string = await bcrypt.hash(password, saltRounds);
    const result = await sql('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, encPassword], {fullResults: true})
    console.log(result.rows);
}

const login = async (obj: {username?: string, email?: string}, password:string) : Promise<any> => {
    let result: any;
    if (obj.username) {
        result = await sql('SELECT id, password FROM users WHERE username = $1', [obj.username]);
    } else if (obj.email) {
        result = await sql('SELECT id, password FROM users WHERE email = $1', [obj.email]);
    } else {
        console.error("does not exist")
    }
    
    if (!result[0].password) {
        console.error("no user of username/email has been found");
    } else {
        let pswd: string = result[0].password;
        if (await bcrypt.compare(password,pswd)) {
            console.log("user has logged in");
        } else {
            console.log("invalid password given");
        }
    }
}

const viewAllUsers = async() : Promise<any> => {
    const result = await sql('SELECT * FROM users');
    return result;
}


// requestHandler().then((res) => {
//     console.log(res)
// })

login({email:"test5@email.com"}, "test5password")
