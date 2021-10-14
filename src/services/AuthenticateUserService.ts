import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRespositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UsersRespositories);

        const user = await userRepositories.findOne({email});

        if(!user) {
            throw new Error("E-mail/Password incorrect");
        }

        // compare 1234 with fx9g876hg0dfkm89fxh (hash)
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("E-mail/Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "6dbcc1c3a8922556bf03cbf0aac1120e", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService };
