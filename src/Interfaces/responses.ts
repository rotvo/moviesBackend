import { RowDataPacket } from "mysql2/promise";

export interface ApiResponse {
    status: string;
    message: string;
    data?: RowDataPacket[] | RowDataPacket | any;
    error?: string
}


