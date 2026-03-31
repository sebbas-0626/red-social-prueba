// DTOs (Data Transfer Objects)
export interface UpdateProfileData {
    bio?: string;
    avatar?: string;
}

export interface CreateUserData {
    userId: number;
    username: string;
    email: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

// Model Attributes
export interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password?: string;
    bio?: string;
    avatar?: string;
    followersCount?: number;
    followingCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
