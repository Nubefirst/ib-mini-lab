import { registerUser } from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        // Используем импортированную функцию
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};