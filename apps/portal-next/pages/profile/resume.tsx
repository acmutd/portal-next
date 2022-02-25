import { useRef, useState } from 'react';
import axios from 'axios';
import contentDisposition from 'content-disposition';
import mime from 'mime-types';
import { useSession } from 'next-auth/react';
import { graphql, useMutation } from 'react-relay';
import { resume_GetSignedURlMutation } from 'queries/__generated__/resume_GetSignedURlMutation.graphql';

export default function ResumePage() {
  const [uploadReady, setUploadReady] = useState(false);
  const uploadRef = useRef<HTMLInputElement>();
  const { data: session } = useSession();

  const GET_SIGNED_URL = graphql`
    mutation resume_GetSignedURlMutation($options: SignedURLInput!) {
      transferFile(options: $options) {
        url
      }
    }
  `;
  const [commit, isInFlight] = useMutation<resume_GetSignedURlMutation>(GET_SIGNED_URL);

  const handleResumeUploadReady = () => {
    if (
      uploadRef.current.files.length !== 1 ||
      uploadRef.current.files[0].size > 2000000 ||
      (!(uploadRef.current.files[0].type === mime.lookup('.pdf')) &&
        !(uploadRef.current.files[0].type === mime.lookup('.docx')) &&
        !(uploadRef.current.files[0].type === mime.lookup('.doc')))
    ) {
      return alert(
        'Please make sure you upload a single file ending in .pdf, doc, or docx that is under 2MB in size',
      );
    }

    setUploadReady(true);
  };

  const handleResumeUpload = async () => {
    commit({
      variables: {
        options: {
          action: 'UPLOAD',
          fileType: 'RESUME',
        },
      },
      onCompleted(data) {
        const { url } = data.transferFile;

        const fileName = `${session.user.name.replace(/\W/g, '')}_resume.${mime.extension(
          uploadRef.current.files[0].type,
        )}`; // FirstnameLastname_resume.extension

        const disposition = contentDisposition(fileName); // This will be the default filename when downloading

        axios
          .put(url, uploadRef.current.files[0], {
            headers: {
              'Content-Type': mime.contentType(uploadRef.current.files[0].type),
              'Content-Disposition': disposition,
            },
          })
          .then(() => alert('Upload succeeded...'))
          .catch(() => alert('Upload failed. Please try again later...'));

        setUploadReady(false);
      },
      onError() {
        alert('Upload failed. Please try again later...');
      },
    });
  };

  const handleResumeDownload = async () => {
    commit({
      variables: {
        options: {
          action: 'DOWNLOAD',
          fileType: 'RESUME',
        },
      },
      onCompleted(data) {
        const { url } = data.transferFile;

        axios({
          url,
          method: 'GET',
          responseType: 'blob', // important
        })
          .then((response) => {
            const disposition = contentDisposition.parse(response.headers['content-disposition']);
            const fileName = disposition.parameters.filename;
            const objectUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = objectUrl;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
          })
          .catch(() => alert('Download failed. Please try again later...'));
      },
      onError() {
        alert('Download failed. Please try again later...');
      },
    });
  };

  const handleResumeDelete = async () => {
    commit({
      variables: {
        options: {
          action: 'DELETE',
          fileType: 'RESUME',
        },
      },
      onCompleted(data) {
        const { url } = data.transferFile;

        axios({
          url,
          method: 'DELETE',
          responseType: 'blob', // important
        })
          .then(() => alert('Successfully deleted resume.'))
          .catch(() => alert('Delete failed. Please try again later...'));
      },
      onError() {
        alert('Delete failed. Please try again later...');
      },
    });
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
      <button
        type="button"
        className="bg-green-400 hover:bg-green-800 p-3 rounded-lg"
        onClick={handleResumeDownload}
      >
        Download
      </button>
      <button
        type="button"
        className="bg-green-400 hover:bg-green-800 p-3 rounded-lg"
        onClick={handleResumeDelete}
      >
        Delete
      </button>
      {isInFlight && <div>loading...</div>}
    </div>
  );
}
