import { EventCheckinInput } from '../schemas/EventCheckin';
import pubsubclient from '../../pubsub';
import { singleton } from 'tsyringe';

@singleton()
export default class EventCheckinService {
  async pubCheckinEvent(options: EventCheckinInput) {
    const topicName = 'projects/acm-core/topics/TEST_PUBSUB';

    try {
      console.log('1');
      const messageId = await pubsubclient
        .topic(topicName)
        .publishMessage({ json: options });
      return messageId;
    } catch (error: any) {
      console.error(`Received error while publishing: ${error.message}`);
    }
  }
}
