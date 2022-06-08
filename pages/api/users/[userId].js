import { users } from "../../../data/users";

export default function handler(req, res) {
    const { userId } = req.query;
    if (req.method === "GET") {
        const user = users.find((user) => user.userId === parseInt(userId));
        res.status(200).json(user);
    } else if (req.method === "DELETE") {
        const deletedUser = users.find(
            (user) => user.userId === parseInt(userId)
        );
        const index = users.findIndex(
            (user) => user.userId === parseInt(userId)
        );
        users.splice(index, 1);
        res.status(201).json({
            ...deletedUser,
            message: `User ${deletedUser.name} is deleted`,
        });
    }
}
