import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';

export interface PostAttributes {
  id?: number;
  userId: number;
  content: string;
  imageUrl?: string;
  likesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: number;
  public userId!: number;
  public content!: string;
  public imageUrl?: string;
  public likesCount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
  }
);