import { getAllUsers } from '../services/admin.service.js';
import { updateUserRole } from "../services/admin.service.js";
import { deleteUser, countAdmins } from "../services/admin.service.js";

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

export async function changeUserRole(req, res) {

    const adminId = req.user.id;
    const userId = req.params.id;
    const { role } = req.body;

    console.log("adminId:", adminId);
    console.log("userId:", userId);
    console.log("role:", role);

    const user = await updateUserRole(adminId, userId, role);

    res.json(user);
}

export async function removeUser(req, res) {

    try {

        const { id } = req.params;

        // нельзя удалить самого себя
        if (req.user.id == id) {
            return res.status(400).json({
                message: "You cannot delete yourself"
            });
        }


        const admins = await countAdmins();

        if (admins <= 1) {
            return res.status(400).json({
                message: "Cannot delete the last admin"
            });
        }

        const user = await deleteUser(req.user.id, id);

        res.json({
            message: "User deleted",
            user
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server error"
        });

    }

}



