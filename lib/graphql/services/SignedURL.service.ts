import { GetSignedUrlConfig } from '@google-cloud/storage';
import { singleton } from 'tsyringe';
import googleCloudStorage from '../../google-cloud';
import Transfer from '../../enums/Transfer';
import Uploadable from '../../enums/Uploadable';
import { SignedURLInput } from '../schemas/SignedURL';

@singleton()
export default class SignedURLService {
  async generateV4SignedUrl(options: SignedURLInput, id: string) {
    if (options.fileType === Uploadable.RESUME) {
      const url = await this.generateResumeSignedUrl(options, id);
      return url;
    }
    return null;
  }

  async generateResumeSignedUrl(options: SignedURLInput, id: string) {
    const bucketName = 'acm-core.appspot.com';
    const fileName = `resumes/${id}`;

    // eslint-disable-next-line operator-linebreak
    const signedUrlOptions: GetSignedUrlConfig =
      options.transfer === Transfer.DOWNLOAD
        ? {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          }
        : {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
          };

    // The response-content-disposition parameter can only be used by authorized requests. Anonymous links don't work with it. You have a few options:
    // The content-disposition of a particular object is part of its metadata and can be permanently set. If you always want a specific file to be downloaded with a specific name, you can just permanently set the content-disposition metadata for the object.
    // You can also generate signed URLs that include the response-content-disposition query parameter. Then the users will be making authorized requests to download the resource.
    // In our case, we're just permanently setting the content-disposition metadata through axios.

    // Get a v4 signed URL for reading the file
    const [url] = await googleCloudStorage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(signedUrlOptions);

    return url;
  }
}
