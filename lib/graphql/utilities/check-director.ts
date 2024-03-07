import { getPrismaConnection } from "lib/prisma/manager";

export const checkifUserIsDirector = async ( userId : string) => {

    const prisma = getPrismaConnection();

    const isDirector = await prisma.director.findFirst( {
        where: {
            officer: {
                profile: {
                    userId
                }
            }
        }
    });

    return !!isDirector;
}