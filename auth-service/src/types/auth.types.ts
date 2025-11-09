// DTOs (Data Transfer Objects)
export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

// Model Attributes
export interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
}