import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';

export interface TokenBlacklistAttributes {
    id?: number;
    token: string;
    userId: number;
    reason?: string;
    expiresAt: Date;
    createdAt?: Date;
}

export class TokenBlacklist extends Model<TokenBlacklistAttributes> implements TokenBlacklistAttributes {
    public id!: number;
    public token!: string;
    public userId!: number;
    public reason?: string;
    public expiresAt!: Date;
    public readonly createdAt!: Date;
}

TokenBlacklist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expires_at',
        },
    },
    {
        sequelize,
        tableName: 'token_blacklist',
        timestamps: true,
        updatedAt: false,
        underscored: true,
    }
);
