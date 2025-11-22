import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { LikeAttributes } from '../interfaces/post.interface';

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - userId
 *         - postId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del like
 *         userId:
 *           type: integer
 *           description: ID del usuario que dio like
 *         postId:
 *           type: integer
 *           description: ID del post que recibió like
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del like
 */

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