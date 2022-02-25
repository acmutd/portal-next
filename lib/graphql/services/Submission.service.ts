import { singleton } from 'tsyringe';
import { SubmissionFilter, SubmissionModel, SubmitInput } from '../schemas/Submission.schema';

@singleton()
export default class SubmissionService {
  async submitApplication({ userId, applicationId, responses }: SubmitInput) {
    let submission = await SubmissionModel.findOne({
      userId,
      applicationId,
    });
    if (submission) {
      submission.responses = [...responses];
      submission.modifiedAt = new Date();
      await submission.save();
    } else {
      const createTime = new Date();
      submission = await SubmissionModel.create({
        userId,
        applicationId,
        responses,
        createdAt: createTime,
        modifiedAt: createTime,
      });
    }
    return submission;
  }

  async getAll(inputFilter: SubmissionFilter) {
    const filter: SubmissionFilter = {};
    if (inputFilter._id) {
      filter._id = inputFilter._id;
    }
    if (inputFilter.applicationId) {
      filter.applicationId = inputFilter.applicationId;
    }
    if (inputFilter.userId) {
      filter.userId = inputFilter.userId;
    }
    if (inputFilter.applicationStatus) {
      filter.applicationStatus = inputFilter.applicationStatus;
    }
    return SubmissionModel.find(filter).exec();
  }
}
