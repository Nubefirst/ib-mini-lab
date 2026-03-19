import db from "../config/db.js";

export async function getCurrentUser(userId) {

    const result = await db.query(
        `SELECT id, email, role, created_at
         FROM users
         WHERE id = $1`,
        [userId]
    );

    return result.rows[0];
}