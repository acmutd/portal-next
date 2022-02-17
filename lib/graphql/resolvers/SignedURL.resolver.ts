import { getSession } from 'next-auth/react';
import { injectable } from 'tsyringe';
import { Arg, Resolver, Mutation, Ctx } from 'type-graphql';
import SignedURL, { SignedURLInput } from '../schemas/SignedURL';
import SignedURLService from '../services/SignedURL.service';

@Resolver(() => SignedURL)
@injectable()
export default class SignedURLResolver {
  constructor(private signedURLService: SignedURLService) {}

  @Mutation(() => SignedURL)
  async transferFile(
    @Arg('options', () => SignedURLInput) options: SignedURLInput,
    @Ctx() context: any,
  ) {
    const session = await getSession(context);
    const url = await this.signedURLService.generateV4SignedUrl(options, session?.id);
    return {
      transfer: options.transfer,
      fileType: options.fileType,
      url,
    };
  }
}
