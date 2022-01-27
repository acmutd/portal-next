import { UserModel } from '../schemas/User.schema';

export default class UserService {
  async getAll() {
    return UserModel.find().exec();
  }
}
