import { singleton } from 'tsyringe';
import Event, { eventModel } from '../schemas/Event.schema';

@singleton()
export default class EventService {
  async getAll() {
    return eventModel.find().exec();
  }

  async createEvent(event: Event) {
    return eventModel.create(event);
  }
}
