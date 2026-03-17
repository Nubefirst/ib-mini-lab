import db from "../config/db.js";

export async function logAction(userId, action, targetUserId = null) {

    await db.query(
        `INSERT INTO audit_logs (user_id, action, target_user_id)
         VALUES ($1, $2, $3)`,
        [userId, action, targetUserId]
    );

}