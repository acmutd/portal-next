import { singleton } from 'tsyringe';

@singleton()
export default class DiscordService {
  fetchMetadata() {
    return {
      snowflake: 'snowflake',
      username: 'testusername',
      discriminator: '1234',
    };
  }
}
