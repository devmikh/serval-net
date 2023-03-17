import User from '../models/user';
import { UserInterface }  from '../interfaces/index';
import { hashPassword } from '../utils/password';

const createUser = async (user: UserInterface) => {

    // Hash password
    const hashedPassword = await hashPassword(user.password);

    // Create new user object
    try {
        const newUser = await User.create({
            email: user.email,
            password: hashedPassword
        });
        return {
            newUser,
            error: null
        };
    } catch (error: any) {
        if (error.errors[0].message === "email must be unique") {
            return {
                newUser: null,
                error: "duplicate_email"
            }
        }
    }
};

const findUser = async (userId: number) => {
    try {
        const user = await User.findByPk(userId);
        return {
            id: user?.id,
            email: user?.email
        };
    } catch (error) {
        console.error('findUser: failure. Error: ', error);
        throw error;
    }
};

export {
    createUser,
    findUser
}