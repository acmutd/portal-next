import { ResolversEnhanceMap } from '@generated/type-graphql';
import { UseMiddleware } from 'type-graphql';
import { onCreateVanityLink, onEditVanityLink } from '../middlewares/generate-vanity';
import { checkNetId } from '../middlewares/check-netid';
import { onlyOfficerAllowed } from '../middlewares/only-officer';
import { onlySelfCheckIn, onlySelfUpdateProfile } from '../middlewares/only-self';
import {
  onApplicationCreationComplete,
  onApplicationSubmissionComplete,
  onEventCreationComplete,
  onProfileCreationComplete,
} from '../middlewares/send-email';
import { addTypeformHiddenFields, addTypeformWebhook } from '../middlewares/typeform';
import { checkValidOfficer } from '../middlewares/check-valid-officer';

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
      UseMiddleware(addTypeformHiddenFields),
      UseMiddleware(addTypeformWebhook),
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
      UseMiddleware(checkNetId),
      UseMiddleware(onProfileCreationComplete),
    ],
  },
  VanityLink: {
    createOneVanityLink: [UseMiddleware(onlyOfficerAllowed), UseMiddleware(onCreateVanityLink)],
    updateOneVanityLink: [UseMiddleware(onlyOfficerAllowed), UseMiddleware(onEditVanityLink)],
  },
  FilledApplication: {
    filledApplication: [UseMiddleware(onlyOfficerAllowed)],
    filledApplications: [UseMiddleware(onlyOfficerAllowed)],
    findFirstFilledApplication: [UseMiddleware(onlyOfficerAllowed)],
    deleteManyFilledApplication: [UseMiddleware(onlyOfficerAllowed)],
    deleteOneFilledApplication: [UseMiddleware(onlyOfficerAllowed)],
    createOneFilledApplication: [UseMiddleware(onApplicationSubmissionComplete)]
  },
  Application: {
    application: [UseMiddleware(checkValidOfficer)]
  }
};
