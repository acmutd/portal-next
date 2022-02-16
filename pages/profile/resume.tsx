import { gql, useMutation } from '@apollo/client';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function ResumePage() {
  const [uploadReady, setUploadReady] = useState(false);
  const uploadRef = useRef<HTMLInputElement>();

  const GET_SIGNED_URL = gql`
    mutation Mutation($options: SignedURLInput!) {
      transferFile(options: $options) {
        url
      }
    }
  `;
  const [getSignedURL] = useMutation(GET_SIGNED_URL);

  const handleResumeUploadReady = () => {
    if (
      uploadRef.current.files.length !== 1 ||
      (!uploadRef.current.files[0].name.endsWith('.pdf') &&
        !uploadRef.current.files[0].name.endsWith('.doc') &&
        !uploadRef.current.files[0].name.endsWith('.docx'))
    ) {
      return alert('Please make sure you upload a single file ending in .pdf, doc, or docx');
    }
    setUploadReady(true);
  };

  const handleResumeUpload = async () => {
    // let extension = 'pdf';
    // const file = uploadRef.current.files[0];
    // if (file.name.endsWith('.doc')) extension = 'doc';
    // else if (file.name.endsWith('.docx')) extension = 'docx';
    const res = await getSignedURL({
      variables: {
        options: {
          transfer: 'UPLOAD',
          fileType: 'RESUME',
        },
      },
    });
    const { url } = res.data.transferFile;

    axios
      .put(url, uploadRef.current.files[0])
      .then(() => alert('Upload succeeded...'))
      .catch(() => alert('Upload failed. Please try again later...'));

    setUploadReady(false);
  };

  return (
    <div className="flex gap-3 flex-col">
      <div id="upload_container" className="flex w-full h-full">
        <input
          id="resume_input"
          type="file"
          className="hidden"
          ref={uploadRef}
          onChange={handleResumeUploadReady}
        />
        {!uploadReady ? (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            id="resume_input_label"
            htmlFor="resume_input"
            className="bg-green-400 hover:bg-green-800 p-3 rounded-lg mx-auto w-full h-full"
          >
            Upload
          </label>
        ) : (
          <button
            type="button"
            className="bg-green-400 hover:bg-green-800 p-3 rounded-lg mx-auto w-full h-full"
            onClick={handleResumeUpload}
          >
            Confirm Upload
          </button>
        )}
      </div>
      <button type="button" className="bg-green-400 hover:bg-green-800 p-3 rounded-lg">
        View
      </button>
      <button type="button" className="bg-green-400 hover:bg-green-800 p-3 rounded-lg">
        Delete
      </button>
    </div>
  );
}
