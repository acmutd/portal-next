import { injectable } from 'tsyringe';
import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import User from '../schemas/User.schema';
import UserService from '../services/User.service';

@Resolver()
@injectable()
export default class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  @UseMiddleware(TypegooseMiddleware)
  async users(): Promise<User[]> {
    return this.userService.getAll();
  }
}
