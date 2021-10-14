import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    // Checking if token exists
    if(!authToken) {
        return response.status(401).end();
    }

    var [, token] = authToken.split(" ");
    token = token.replace('\"', "");
    token = token.replace('\"', "");

    try {
        // Validating token
        const { sub } = verify(token, "6dbcc1c3a8922556bf03cbf0aac1120e") as IPayload;
        request.user_id = sub;
        return next();
    } catch(err) {
        return response.status(401).end();
    }

    // Retrieving user data


}


