import User from '../models/user';
import sequelize from '../config/sequelize';
import { UserInterface }  from '../interfaces/index';
import { hashPassword } from '../utils/password';
import { selectUserQuery } from '../config/sequelize/queries';

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
        const [ user ] = await sequelize.query(selectUserQuery, { replacements: [userId]});
        
        if (user[0]) {
            return {
                user: user[0],
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