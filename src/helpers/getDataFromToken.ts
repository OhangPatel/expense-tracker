// src/helpers/getDataFromToken.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        
        if (!token) {
            throw new Error("No token provided");
        }
        
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        
        if (!decodedToken) {
            throw new Error("Invalid token");
        }
        
        return decodedToken.id;
    } catch (error: any) {
        console.error("Token validation error:", error.message);
        return null;
    }
};