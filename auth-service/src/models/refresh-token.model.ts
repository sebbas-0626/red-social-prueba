import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/connection';

export interface RefreshTokenAttributes {
    id?: number;
    userId: number;
    token: string;
    expiresAt: Date;
    revoked: boolean;
    device?: string;
    ipAddress?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
    public id!: number;
    public userId!: number;
    public token!: string;
    public expiresAt!: Date;
    public revoked!: boolean;
    public device?: string;
    public ipAddress?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        token: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expires_at',
        },
        revoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        device: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ipAddress: {
            type: DataTypes.STRING(45),
            allowNull: true,
            field: 'ip_address',
        },
    },
    {
        sequelize,
        tableName: 'refresh_tokens',
        timestamps: true,
        underscored: true,
    }
);
