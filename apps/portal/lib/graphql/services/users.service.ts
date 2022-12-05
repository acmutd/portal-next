import { singleton } from 'tsyringe';
import googleCloudStorage from '../../google-cloud';

@singleton()
export default class UsersService {
  async getResumeFileName(userId: string): Promise<string> {
    const bucketName = 'acm-core.appspot.com';
    const fileName = `resumes/${userId}`;
    const fileRef = googleCloudStorage.bucket(bucketName).file(fileName);
    const hasResume = await fileRef.exists();
    if (!hasResume[0]) {
      return 'N/A';
    }
    const data = await fileRef.getMetadata();
    const contentDisposition: string = data[0].contentDisposition;
    return contentDisposition.substring(22, contentDisposition.length - 1);
  }
}
