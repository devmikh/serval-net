import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class User extends Model {
    public id!: number;
    public email!: string;
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

export default User;