import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './user';

class Post extends Model {
    public id!: number;
    public user_id!: string;
    public date!: number;
    public text!: string;
}

Post.init({
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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'posts',
    sequelize,
    timestamps: true,
    underscored: true
});

Post.sync();

export default Post;