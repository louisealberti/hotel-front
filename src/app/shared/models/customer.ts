import { Room } from "./room";

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    bill?: number;
    room?: Room;
}