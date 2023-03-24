import User from '../models/user';
import { UserInterface }  from '../interfaces/index';
import { hashPassword } from '../utils/password';

const createUser = async (user: UserInterface) => {
    console.log('in create user,', user)
    // Hash password
    const hashedPassword = await hashPassword(user.password);

    // Create new user object
    try {
        const newUser = await User.create({
            email: user.email,
            username: user.username,
            full_name: user.fullName,
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
        } else if (error.errors[0].message === "username must be unique") {
            return {
                newUser: null,
                error: "duplicate_username"
            }
        }
    }
};

const fetchUser = async (userId: number) => {
    try {
        const user = await User.findByPk(userId);
        
        if (user) {
            const result = {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                username: user.username
            };
            return {
                user: result,
                error: null
            }
        } else {
            return {
                user: null,
                error: "user_not_found"
            }
        }
    } catch (error: any) {
        return {
            user: null,
            error: error.message
        }
    }
};

export {
    createUser,
    fetchUser
}