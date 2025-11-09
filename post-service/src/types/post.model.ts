import { Request } from 'express';

// DTOs (Data Transfer Objects)
export interface PostInterface {
    id?: number;
    userId: number;
    content: string;
    imageUrl?: string;
    likesCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthRequest extends Request {
    userId?: number;
}

// Model Attributes
export interface PostAttributes {
    id?: number;
    userId: number;
    content: string;
    imageUrl?: string;
    likesCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LikeAttributes {
    id?: number;
    userId: number;
    postId: number;
    createdAt?: Date;
}