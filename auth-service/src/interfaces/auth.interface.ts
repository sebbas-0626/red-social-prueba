// DTOs (Data Transfer Objects)
export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

export interface RefreshTokenData {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LogoutData {
    refreshToken: string;
}

// Internal DTOs (comunicación con user-service)
export interface UserCredentials {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
}
