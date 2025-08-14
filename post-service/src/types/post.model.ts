export interface PostInterface {
    id?: number;
    userId: number;
    content: string;
    imageUrl?: string;
    likesCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}