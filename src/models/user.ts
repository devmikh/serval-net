import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class User extends Model {
    public id!: number;
    public email!: string;
    public username!: string;
    public full_name!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            min: 1,
            max: 30
        }
    },
    full_name: {
        type: DataTypes.STRING(128),
        allowNull: true,
        validate: {
            max: 30
        }
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'users',
    sequelize,
    timestamps: true,
    underscored: true
});

User.sync();

export default User;