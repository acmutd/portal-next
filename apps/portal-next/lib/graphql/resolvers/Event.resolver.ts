import { injectable } from 'tsyringe';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import Event from '../schemas/Event.schema';
import User from '../schemas/User.schema';
import EventService from '../services/Event.service';
import EventMetaService from '../services/EventMeta.service';

@Resolver(() => Event)
@injectable()
export default class EventResolver {
  constructor(private eventService: EventService, private eventMetaService: EventMetaService) {}

  @Mutation(() => Event)
  @UseMiddleware(TypegooseMiddleware)
  async createEvent(@Arg('event') event: Event) {
    return this.eventService.createEvent(event);
  }

  @Query(() => [Event])
  @UseMiddleware(TypegooseMiddleware)
  async events() {
    return this.eventService.getAll();
  }

  @Query(() => [Event])
  @UseMiddleware(TypegooseMiddleware)
  async upcomingEvents() {
    return this.eventService.getUpcomingEvents();
  }

  @FieldResolver(() => [User])
  @UseMiddleware(TypegooseMiddleware)
  async rsvp(@Root() event: Event) {
    return this.eventMetaService.findRsvpByEventId(event._id);
  }

  @FieldResolver(() => [User])
  @UseMiddleware(TypegooseMiddleware)
  async checkIn(@Root() event: Event) {
    return this.eventMetaService.findCheckInByEventId(event._id);
  }
}
