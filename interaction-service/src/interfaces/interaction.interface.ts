import { Request } from 'express';

// DTOs (Data Transfer Objects)
export interface LikeInterface {
    id?: number;
    userId: number;
    postId: number;
    createdAt?: Date;
}

export interface AuthRequest extends Request {
    userId?: number;
}

// Model Attributes
export interface LikeAttributes {
    id?: number;
    userId: number;
    postId: number;
    createdAt?: Date;
}
