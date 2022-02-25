import { registerEnumType } from 'type-graphql';

enum Action {
  UPLOAD,
  DOWNLOAD,
  DELETE,
}

registerEnumType(Action, {
  name: 'Action',
  description: 'Indicate whether the SignedURL will be for uploading, downloading, or deleting.',
});

export default Action;
