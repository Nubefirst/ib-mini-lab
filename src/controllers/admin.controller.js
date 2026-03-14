import { getAllUsers } from '../services/admin.service.js';

export async function getUsers (req, res) {

    try{
        const users = await getAllUsers();

        res.json(users);
    } catch (err) {
        res.status(500).send({
            message: "Server Error",
        })
    }
}