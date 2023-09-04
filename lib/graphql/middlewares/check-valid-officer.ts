import { MiddlewareFn } from "type-graphql";
import { TContext } from "../interfaces/context.interface";
import { getSession } from "next-auth/react";
import { checkOfficerMatchesDivision } from "../utilities/check-officer-division";
import { Application } from "lib/generated/graphql";

export const checkValidOfficer: MiddlewareFn<TContext> = async({ args, context }, next) => {
    const session = await getSession(context);
    if (!session) {
        return null;
    }
    const applicationData: Application = await next();
    if (!applicationData) return null;
    const officerDivisionMatches = await checkOfficerMatchesDivision(session.id, applicationData.divisionId);
    if (!officerDivisionMatches) return null;
    return applicationData;
}