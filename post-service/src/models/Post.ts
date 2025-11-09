import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';
import { PostAttributes } from '../types/post.model';

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - content
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del post
 *         content:
 *           type: string
 *           description: Contenido del post
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen (opcional)
 *         userId:
 *           type: integer
 *           description: ID del usuario que creó el post
 *         likesCount:
 *           type: integer
 *           description: Número de likes del post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

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