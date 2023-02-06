import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOneOrFail(user_id, {
      join: {
        alias: "users",
        leftJoinAndSelect: {
          games: "users.games",
        },
      },
    });

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * FROM USERS ORDER BY FIRST_NAME ASC"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    console.log(first_name, last_name);
    return await this.repository.query(
      `SELECT * FROM USERS WHERE FIRST_NAME='${first_name}' AND LAST_NAME='${last_name}'`
    ); // Complete usando raw query
  }
}
