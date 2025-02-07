import { Auth } from "./auth.interface";

export interface User extends Auth {
    name? : string;
    phone? : string;
    description?: string;
    address?: string;
}