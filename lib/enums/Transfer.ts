import { registerEnumType } from 'type-graphql';

enum Transfer {
  UPLOAD,
  DOWNLOAD,
}

registerEnumType(Transfer, {
  name: 'Transfer',
  description: 'Indicate whether the SignedURL will be for uploading or downloading.',
});

export default Transfer;
