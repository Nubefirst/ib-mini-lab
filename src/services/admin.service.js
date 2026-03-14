import db from "../config/db.js"

export async function getAllUsers(){

    const result = await db.query(
        `SELECT id, email, role, created_at
        FROM users
        ORDER BY id`
    );
    return result.rows;
}