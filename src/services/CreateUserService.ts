import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({ name, email, admin, password } : IUserRequest) {
        const usersRepositories = getCustomRepository(UsersRespositories);

        if(!email) {
            throw new Error("E-mail field is required!");
        }

        const userAlreadyExists = await usersRepositories.findOne({ email });

        if(userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepositories.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        await usersRepositories.save(user);

        return user;
    }
}

export { CreateUserService };
