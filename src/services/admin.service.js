import db from "../config/db.js"
import { logAction } from "./audit.service.js";

export async function getAllUsers(){

    const result = await db.query(
        `SELECT id, email, role, created_at
        FROM users
        ORDER BY id`
    );
    return result.rows;
}


export async function updateUserRole(adminId, userId, role) {

    const result = await db.query(
        `UPDATE users
         SET role = $1
         WHERE id = $2
         RETURNING id, email, role`,
        [role, userId]
    );

    const user = result.rows[0];

    await logAction(adminId, "CHANGE_ROLE", userId);

    return user;
}

export async function deleteUser(adminId, userId) {

    const result = await db.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING id, email`,
        [userId]
    );

    const deletedUser = result.rows[0];

    if (!deletedUser) {
        throw new Error("User not found");
    }

    await logAction(adminId, "DELETE_USER", userId);

    return deletedUser;
}

export async function countAdmins() {

    const result = await db.query(
        `SELECT COUNT(*) FROM users WHERE role = 'admin'`
    );
    return parseInt(result.rows[0].count);
}