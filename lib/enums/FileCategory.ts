import { registerEnumType } from 'type-graphql';

enum FileCategory {
  RESUME,
}

registerEnumType(FileCategory, {
  name: 'FileCategory',
  description: 'Types of files or documents that may be uploaded to Google Cloud.',
});

export default FileCategory;
