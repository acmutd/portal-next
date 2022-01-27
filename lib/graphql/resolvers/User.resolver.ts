import { container } from 'tsyringe';
import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import User from '../schemas/User.schema';
import UserService from '../services/User.service';

@Resolver()
export default class UserResolver {
  private userService: UserService;

  constructor() {
    this.userService = container.resolve(UserService);
  }

  @Query(() => [User])
  @UseMiddleware(TypegooseMiddleware)
  async users(): Promise<User[]> {
    return this.userService.getAll();
  }
}
