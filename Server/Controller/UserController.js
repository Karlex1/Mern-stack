export const user =
    (req, res) => {
        res.json({ user: req.user });
    }