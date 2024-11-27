import dotenv from 'dotenv'
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
    const result = await sql('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', [username, email, password], {fullResults: true})
    console.log(result.rows);
}


// requestHandler().then((res) => {
//     console.log(res)
// })

createUser("test4", "test4@email.com", "test4password");