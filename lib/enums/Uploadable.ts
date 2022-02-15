import { registerEnumType } from 'type-graphql';

enum Uploadable {
  RESUME,
}

registerEnumType(Uploadable, {
  name: 'Uploadable',
  description: 'Types of files or documents that may be uploaded to Google Cloud.',
});

export default Uploadable;
