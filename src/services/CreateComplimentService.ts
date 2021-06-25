import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRespositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message } : IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRespositories);

        if(user_sender === user_receiver) {
            throw new Error("User receiver cannot be you. (Do you need a hug?)")
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiverExists) {
            throw new Error("User receiver doesn't exists!");
        }

        const compliment = await complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService };
