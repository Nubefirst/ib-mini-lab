import db from '../config/db.js';
import { hashPassword } from '../utils/hash.js';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import bcrypt from "bcrypt";

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

export async function loginUser(email, password) {

    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = result.rows[0];

    const isValid = user
        ? await bcrypt.compare(password, user.password_hash)
        : false;

    if (!user || !isValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token };
}