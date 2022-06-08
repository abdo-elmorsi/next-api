import { users } from "../../../data/users.json";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(users);
    } else if (req.method === "POST") {
        const { name } = req.body;
        const repeatUser = users.find(
            (ele) => ele.name.toString() === name.toString()
        );
        if (repeatUser) {
            res.status(404).json(name + " already added");
        } else {
            const newUser = req.body;
            users.push(newUser);
            res.status(201).json({
                ...newUser,
                message: `User ${newUser.name} is added`,
            });
        }
    }
}
