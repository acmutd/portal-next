import { ResolversEnhanceMap } from '@generated/type-graphql';
import { UseMiddleware } from 'type-graphql';
import { onCreateVanityLink, onEditVanityLink } from '../middlewares/generate-vanity';
import { checkNetId } from '../middlewares/check-netid';
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
    upsertProfile: [
      UseMiddleware(onlySelfUpdateProfile),
      UseMiddleware(checkNetId),
      UseMiddleware(onProfileCreationComplete),
    ],
  },
  VanityLink: {
    createVanityLink: [UseMiddleware(onlyOfficerAllowed), UseMiddleware(onCreateVanityLink)],
    updateVanityLink: [UseMiddleware(onlyOfficerAllowed), UseMiddleware(onEditVanityLink)],
  },
};
