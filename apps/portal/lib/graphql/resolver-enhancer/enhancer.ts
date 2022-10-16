import { ResolversEnhanceMap } from '@generated/type-graphql';
import { UseMiddleware } from 'type-graphql';
import { onlyOfficerAllowed } from '../middlewares/only-officer';
import { onlySelfCheckIn, onlySelfUpdateProfile } from '../middlewares/only-self';
import {
  onApplicationCreationComplete,
  onEventCreationComplete,
  onProfileCreationComplete,
} from '../middlewares/send-email';

export const resolversEnhanceMap: ResolversEnhanceMap = {
  Event: {
    createEvent: [UseMiddleware(onlyOfficerAllowed), UseMiddleware(onEventCreationComplete)],
    updateEvent: [UseMiddleware(onlyOfficerAllowed)],
    deleteEvent: [UseMiddleware(onlyOfficerAllowed)],
  },
  TypeformApplication: {
    createTypeformApplication: [
      UseMiddleware(onlyOfficerAllowed),
      UseMiddleware(onApplicationCreationComplete),
    ],
    updateTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
    deleteTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
  },
  EventReservation: {
    createEventReservation: [UseMiddleware(onlySelfCheckIn)],
  },
  Profile: {
    upsertProfile: [UseMiddleware(onlySelfUpdateProfile), UseMiddleware(onProfileCreationComplete)],
  },
};
