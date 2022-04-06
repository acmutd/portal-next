import { singleton } from 'tsyringe';
import { EventCheckinInput } from '../schemas/EventCheckin';
import pubsubclient from '../../pubsub';

@singleton()
export default class EventCheckinService {
  async pubCheckinEvent(options: EventCheckinInput) {
    const topicName = 'projects/acm-core/topics/TEST_PUBSUB';

    const messageId = await pubsubclient.topic(topicName).publishMessage({ json: options });
    return messageId;
  }
}
