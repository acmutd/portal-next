import { singleton } from 'tsyringe';
import { EventMetaModel } from '../schemas/EventMeta.schema';

@singleton()
export default class EventMetaService {
  async checkinEvent(userId: string, eventId: string) {
    const filter = {
      userId,
      eventId,
    };
    const update = {
      checkedIn: true,
      checkedInTS: new Date(),
    };
    const savedEventMeta = await EventMetaModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    await savedEventMeta.save();
    return savedEventMeta;
  }

  async rsvpEvent(userId: string, eventId: string) {
    const filter = {
      userId,
      eventId,
    };
    const update = {
      rsvp: true,
      rsvpTS: new Date(),
    };
    const savedEventMeta = await EventMetaModel.findOneAndUpdate(filter, update);
    await savedEventMeta.save();
    return savedEventMeta;
  }
}
