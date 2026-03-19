import { getCurrentUser} from "../services/user.service.js";

export async function me(req, res) {

    try {

        const userId = req.user.id;

        const user = await getCurrentUser(userId);

        res.json(user);
    } catch (err) {
        res.status(500).send({
            message: "Failed to fetch user",
        })
    }
}