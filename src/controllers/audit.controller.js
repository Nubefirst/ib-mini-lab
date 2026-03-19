import db from "../config/db.js"

export async function getAuditLogs(req,res){

    const result = await db.query(
        `SELECT * FROM audit_logs
        ORDER BY created_at DESC`
    );
    res.json(result.rows);
}