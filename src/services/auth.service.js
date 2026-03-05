import db from '../config/db.js';
import { hashPassword } from '../utils/hash.js';

export const registerUser = async (data) => {

    const { email, password } = data;

    if (!email || !password) {
        throw new Error('Email and password required');
    }

    const existingUser = await db.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }

    const passwordHash = await hashPassword(password);

    const result = await db.query(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
         RETURNING id, email, created_at`,
        [email, passwordHash]
    );

    return result.rows[0];
};