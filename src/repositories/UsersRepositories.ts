import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRespositories extends Repository<User> {

}

export { UsersRespositories }
