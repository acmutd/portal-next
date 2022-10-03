import { ResolversEnhanceMap } from '@generated/type-graphql';
import { UseMiddleware } from 'type-graphql';
import { onlyOfficerAllowed } from '../middlewares/only-officer';
import { onlySelfCheckIn, onlySelfUpdateProfile } from '../middlewares/only-self';

export const resolversEnhanceMap: ResolversEnhanceMap = {
  Event: {
    _all: [UseMiddleware(onlyOfficerAllowed)],
  },
  TypeformApplication: {
    createTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
    updateTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
    deleteTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
  },
  EventReservation: {
    createEventReservation: [UseMiddleware(onlySelfCheckIn)],
  },
  Profile: {
    upsertProfile: [UseMiddleware(onlySelfUpdateProfile)],
  },
};
