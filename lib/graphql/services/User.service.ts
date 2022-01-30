import { Ref } from '@typegoose/typegoose';
import { singleton } from 'tsyringe';
import User, { UserModel } from '../schemas/User.schema';

@singleton()
export default class UserService {
  async getAll() {
    return UserModel.find().exec();
  }

  async findById(userId: Ref<User>) {
    const userObj = await UserModel.findById(userId);
    return userObj;
  }
}
