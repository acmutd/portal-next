import { ObjectId } from 'mongodb';
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

  async getUpcomingEvents() {
    return eventModel.find({
      start: {
        $gt: new Date(),
      },
    });
  }

  async findById(eventId: ObjectId) {
    return eventModel.findById(eventId);
  }
}