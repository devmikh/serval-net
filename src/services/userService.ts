import bcrypt from 'bcryptjs';
import User from '../models/userModel';

const createUser = async (user: { email: string, password: string} ) => {

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Create new user object
    const newUser = await User.create({
        email: user.email,
        password: hashedPassword
    });

    console.log('user.create', newUser);
}

export {
    createUser
}