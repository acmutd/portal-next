import { Ref } from '@typegoose/typegoose';
import { singleton } from 'tsyringe';
import User, { UserFilter, UserModel } from '../schemas/User.schema';

@singleton()
export default class UserService {
  async getAll(inputFilter?: UserFilter) {
    const filter: UserFilter = {};

    if (inputFilter) {
      if (inputFilter._id) filter._id = inputFilter._id;
      if (inputFilter.email) filter.email = inputFilter.email;
      if (inputFilter.name) filter.name = inputFilter.name;
    }

    return UserModel.find(filter).exec();
  }

  async findById(userId: Ref<User>) {
    const userObj = await UserModel.findById(userId);
    return userObj;
  }
}
