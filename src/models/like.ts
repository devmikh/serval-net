import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './user';
import Post from './post';

class Like extends Model {
    public id!: number;
    public user_id!: number;
    public post_id!: number;
}

Like.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        }
    }
}, {
    tableName: 'likes',
    sequelize,
    timestamps: true,
    underscored: true
});

Like.sync();

export default Like;