import { container } from 'tsyringe';
import { UseMiddleware, Mutation, Arg } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import EventMeta from '../schemas/EventMeta.schema';
import EventMetaService from '../services/EventMeta.service';

export default class EventMetaResolver {
  private eventMetaService: EventMetaService;

  constructor() {
    this.eventMetaService = container.resolve(EventMetaService);
  }

  @Mutation(() => EventMeta)
  @UseMiddleware(TypegooseMiddleware)
  async checkinEvent(
    @Arg('userId', () => String) userId: string,
    @Arg('eventId', () => String) eventId: string,
  ) {
    return this.eventMetaService.checkinEvent(userId, eventId);
  }

  @Mutation(() => EventMeta)
  @UseMiddleware(TypegooseMiddleware)
  async rsvpEvent(
    @Arg('userId', () => String) userId: string,
    @Arg('eventId', () => String) eventId: string,
  ) {
    return this.eventMetaService.rsvpEvent(userId, eventId);
  }
}
