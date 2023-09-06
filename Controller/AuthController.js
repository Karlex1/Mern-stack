import User from '../component/User.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const categories = [
    { label: 'Travel',icon:'user' },
    { label: 'Shopping',icon:'user' },
    { label: 'Study',icon:'user' },
    { label: 'Given',icon:'user' },
]

    const { email, password, firstName, lastName } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(406).json({ message: 'User already exists' })
        return
    }
    //hasing
    const saltRounds = 10;
    const key = await bcrypt.genSaltSync(saltRounds)
    const hashedPassword = await bcrypt.hashSync(password, key)
    // updating user password with hashed password
    const user = await User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        categories,
    });
    await user.save();
    res.status(201).json({ "message": 'user is created' });
}




export const login = async (req, res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (!userExists) {
        res.status(406).json({ message: 'User not exists' })
        return;
    }
    const matched = await bcrypt.compare(password, userExists.password);
    if (!matched) {
        res.status(406).json({ message: 'User not found' });
        return;
    }
    // tommorow jwt connection
    const payload = {
        username: email,
        _id: userExists._id,
    }
    const token = jwt.sign(payload , process.env.JWT_KEY);
    res.json({ message: 'sucessfully logged in.', token, userExists })
}