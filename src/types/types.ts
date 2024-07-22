import { Category, Product, Review as Review } from "@prisma/client";

// export type Product = {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     brand: string;
//     category: string;
//     inStock: boolean;
//     colors: Color[];
//     reviews: Review[];
// };

export type Color = {
    color: string;
    colorCode: string;
    images: string[];
};

// export type Review = {
//     id: string;
//     userId: string;
//     productId: string;
//     rating: number;
//     comment: string;
//     createdDate: string;
//     user: User;
// };

// type User = {
//     id: string;
//     name: string;
//     email: string;
//     emailVerified: null | string;
//     image: string;
//     hashedPassword: null | string;
//     createdAt: string;
//     updatedAt: string;
//     role: string;
// };


export type ProductWithCategory = Product & { category: Category } & { reviews?: Review[] }
// export type ProductWithCategoryWithoutReview = Product & { category: Category }


// export type Image = {
//     color: string;
//     colorCode: string;
//     image: string;
// };

// export type User = {
//     id: string;
//     name: string;
//     email: string;
//     emailVerified: string | null;
//     image: string;
//     hashedPassword: string | null;
//     createdAt: string;
//     updatedAt: string;
//     role: string;
// };

// export type Review = {
//     id: string;
//     userId: string;
//     productId: string;
//     rating: number;
//     comment: string;
//     createdDate: string;
//     user: User;
// };

// export type Product = {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     brand: string;
//     category: string;
//     inStock: boolean;
//     images: Image[];
//     reviews: Review[];
// };