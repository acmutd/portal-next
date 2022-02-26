import { ObjectId } from 'mongodb';
import { injectable } from 'tsyringe';
import { UseMiddleware, Mutation, Arg, Resolver } from 'type-graphql';
import { TypegooseMiddleware } from '../middlewares/typegoose';
import ObjectIdScalar from '../scalars/ObjectIDScalar';
import EventMeta from '../schemas/EventMeta.schema';
import EventMetaService from '../services/EventMeta.service';

@Resolver()
@injectable()
export default class EventMetaResolver {
  constructor(private eventMetaService: EventMetaService) {}

  @Mutation(() => EventMeta)
  @UseMiddleware(TypegooseMiddleware)
  async checkinEvent(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId,
    @Arg('eventId', () => ObjectIdScalar) eventId: ObjectId,
  ) {
    return this.eventMetaService.checkinEvent(userId, eventId);
  }

  @Mutation(() => EventMeta)
  @UseMiddleware(TypegooseMiddleware)
  async rsvpEvent(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId,
    @Arg('eventId', () => ObjectIdScalar) eventId: ObjectId,
  ) {
    return this.eventMetaService.rsvpEvent(userId, eventId);
  }
}
