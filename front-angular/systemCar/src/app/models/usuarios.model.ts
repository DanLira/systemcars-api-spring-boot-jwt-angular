import { Authority } from "./authority.model";
import { Cars } from "./cars.model";

export interface Usuarios {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    login: string;
    password: string
    phone: string;
    cars: Cars;
    authorities?: Authority[];
    token?: string;
}
