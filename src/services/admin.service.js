import db from "../config/db.js"

export async function getAllUsers(){

    const result = await db.query(
        `SELECT id, email, role, created_at
        FROM users
        ORDER BY id`
    );
    return result.rows;
}


export async function updateUserRole(userID, role) {

    const result = await db.query(
        `UPDATE users 
        SET role = $1 
        WHERE id = $2
        RETURNING id,email, role`,
        [role, userID]
    )

    return result.rows[0];
}

export async function deleteUser(userID) {

    const result = await db.query(
        `DELETE FROM users
        WHERE id = $1
        RETURNING id,email`,
        [userID]
    );
    return result.rows[0];
}

export async function countAdmins() {

    const result = await db.query(
        `SELECT COUNT(*) FROM users WHERE role = 'admin'`
    );
    return parseInt(result.rows[0].count);
}