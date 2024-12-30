import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config();

import { neon } from "@neondatabase/serverless"
import e from 'express';
import { error } from 'console';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, JWT_SECRET } = process.env;
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

const insertUser = async (username:string, email:string, password:string) : Promise<any> => {
    let saltRounds: number = 10;
    const encPassword: string = await bcrypt.hash(password, saltRounds);
    const result = await sql('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, encPassword], {fullResults: true})
    console.log(result.rows[0].id);
}

const insertNote = async (userId:number, name:string, content:string) : Promise<any> => {
    try {
        const result = await sql('INSERT INTO notes (name, content) VALUES ($1, $2) RETURNING id', [name, content]);
        const noteId:number = result[0].id;
        console.log(noteId)

        await sql('INSERT INTO user_notes (user_id, note_id) VALUES ($1, $2)', [userId, noteId])
    } catch (error:any) {
        console.error(error);
    }
}


const updateUser = async (id:number, obj: {username?: string, email?: string, password?:string}) : Promise<any> => {

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

const generateToken = (id: number):string => {
    if (JWT_SECRET) {
        const token:string = jwt.sign({userId: id}, JWT_SECRET, {expiresIn: '1h'})
        return token;
    } else {
        console.error("error with jwt secret token");
        return '';
    }
}

const verifyToken = (token: string) => {
    if (JWT_SECRET) {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
    }
}

const viewAllUsers = async() : Promise<any> => {
    const result = await sql('SELECT * FROM users');
    return result;
}

// requestHandler().then((res) => {
//     console.log(res)
// })

insertNote(3,"first note", "this is my first note");

class DatabaseSystem {

    createUser = insertUser;
    loginUser = login;

}

class tokenHandler {
    createToken = generateToken;
    decryptToken = verifyToken;
}

// const databaseSystem = new DatabaseSystem();