import { ObjectId } from 'mongodb';
import { injectable, singleton } from 'tsyringe';
import { EventMetaModel } from '../schemas/EventMeta.schema';
import UserService from './User.service';

@singleton()
@injectable()
export default class EventMetaService {
  constructor(private userService: UserService) {}

  async checkinEvent(userId: ObjectId, eventId: ObjectId) {
    const filter = {
      userId,
      eventId,
    };
    let eventMetaObj = await EventMetaModel.findOne(filter);
    if (!eventMetaObj) {
      eventMetaObj = await EventMetaModel.create(filter);
    }
    eventMetaObj.checkedIn = true;
    eventMetaObj.checkedInTS = new Date();
    await eventMetaObj.save();
    return eventMetaObj;
  }

  async rsvpEvent(userId: ObjectId, eventId: ObjectId) {
    const filter = {
      userId,
      eventId,
    };
    let eventMetaObj = await EventMetaModel.findOne(filter);
    if (!eventMetaObj) {
      eventMetaObj = await EventMetaModel.create(filter);
    }
    eventMetaObj.rsvp = true;
    eventMetaObj.rsvpTS = new Date();
    await eventMetaObj.save();
    return eventMetaObj;
  }

  async findRsvpByEventId(eventId: ObjectId) {
    const entries = await EventMetaModel.find({ eventId, rsvp: true });
    return Promise.all(entries.map((entry) => this.userService.findById(entry.userId as any)));
  }

  async findCheckInByEventId(eventId: ObjectId) {
    const entries = await EventMetaModel.find({ eventId, checkedIn: true });
    return Promise.all(entries.map((entry) => this.userService.findById(entry.userId as any)));
  }
}
