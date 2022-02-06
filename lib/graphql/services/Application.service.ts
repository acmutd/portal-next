import { singleton } from 'tsyringe';
import Application, { ApplicationFilter, ApplicationModel } from '../schemas/Application.schema';

@singleton()
export default class ApplicationService {
  async createApplication(application: Application) {
    return ApplicationModel.create(application);
  }

  async getAll(inputFilter: ApplicationFilter) {
    const filter: any = {};
    if (inputFilter.name) {
      filter.name = inputFilter.name;
    }
    if (inputFilter.active) {
      filter.active = inputFilter.active;
    }
    if (inputFilter.closeAfter) {
      filter.dateEnd = {
        $gte: new Date(inputFilter.closeAfter),
      };
    }
    return ApplicationModel.find(filter).collation({ locale: 'en', strength: 2 }).exec();
  }
}
