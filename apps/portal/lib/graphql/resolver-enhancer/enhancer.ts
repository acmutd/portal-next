import { ResolversEnhanceMap, applyResolversEnhanceMap } from '@generated/type-graphql';
import { UseMiddleware } from 'type-graphql';
import { onlyOfficerAllowed } from '../middlewares/only-officer';

export const resolversEnhanceMap: ResolversEnhanceMap = {
  Event: {
    _all: [UseMiddleware(onlyOfficerAllowed)],
  },
  TypeformApplication: {
    createTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
    updateTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
    deleteTypeformApplication: [UseMiddleware(onlyOfficerAllowed)],
  },
};
