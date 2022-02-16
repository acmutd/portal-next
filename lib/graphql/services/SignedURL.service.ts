import { GetSignedUrlConfig } from '@google-cloud/storage';
import { singleton } from 'tsyringe';
import googleCloudStorage from '../../google-cloud';
import Transfer from '../../enums/Transfer';
import Uploadable from '../../enums/Uploadable';
import { SignedURLInput } from '../schemas/SignedURL';

@singleton()
export default class SignedURLService {
  async generateV4SignedUrl(options: SignedURLInput, id: string, filetype: string) {
    if (options.fileType === Uploadable.RESUME) {
      const url = await this.generateResumeSignedUrl(options, id, filetype);
      return url;
    }
    return null;
  }

  async generateResumeSignedUrl(options: SignedURLInput, id: string, filetype: string) {
    const bucketName = 'acm-core.appspot.com';
    const fileName = `resumes/${id}.${filetype}`;

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
            contentType: 'application/octet-stream',
          };

    // Get a v4 signed URL for reading the file
    const [url] = await googleCloudStorage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(signedUrlOptions);

    return url;
  }
}
