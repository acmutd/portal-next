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
    createOneEvent: [UseMiddleware(onlyOfficerAllowed), UseMiddleware(onEventCreationComplete)],
    updateOneEvent: [UseMiddleware(onlyOfficerAllowed)],
    deleteOneEvent: [UseMiddleware(onlyOfficerAllowed)],
  },
  TypeformApplication: {
    createOneTypeformApplication: [
      UseMiddleware(onlyOfficerAllowed),
      UseMiddleware(onApplicationCreationComplete),
    ],
    updateOneTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
    deleteOneTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
  },
  EventReservation: {
    createOneEventReservation: [UseMiddleware(onlySelfCheckIn)],
  },
  Profile: {
    upsertOneProfile: [
      UseMiddleware(onlySelfUpdateProfile),
      UseMiddleware(onProfileCreationComplete),
    ],
  },
};
