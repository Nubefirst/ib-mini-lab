import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export async function login(req, res) {
    try{
        const { email, password } = req.body;

        const result = await loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}