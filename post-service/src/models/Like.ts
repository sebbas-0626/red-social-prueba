import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';

export interface LikeAttributes {
  id?: number;
  userId: number;
  postId: number;
  createdAt?: Date;
}

export class Like extends Model<LikeAttributes> implements LikeAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
}

Like.init(
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: true,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId']
      }
    ]
  }
);