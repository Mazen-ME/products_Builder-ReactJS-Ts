import {productName} from "../types/types.tsx";

export interface Iproduct {
    id?: string | undefined;
    title: string;
    description: string;
    imageURL: string;

    price: string;
    colors: string[];
    category: {
        name: string;
        imageURL: string;
    }

}


export interface IFormTypes {
    id: string;
    name: productName;
    label: string;
    type: string;

}


export interface ICategory {
    id: string;
    name: string;
    imageURL: string;
}