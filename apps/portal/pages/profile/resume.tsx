/* eslint-disable no-alert */
import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import contentDisposition from 'content-disposition';
import mime from 'mime-types';
import { useSession } from 'next-auth/react';
import { useMutation, gql, useQuery } from 'urql';
import Button from 'components/Button';
import CircularBlur from 'components/CircularBlur';
import DocumentIcon from 'apps/portal/icons/DocumentIcon';

export default function ResumePage() {
  const [uploadReady, setUploadReady] = useState(false);
  const uploadRef = useRef<HTMLInputElement>();
  const { data: session, status } = useSession({ required: true });

  const GET_SIGNED_URL = `
    mutation resume_GetSignedURlMutation($options: SignedURLInput!) {
      transferFile(options: $options) {
        url
      }
    }
  `;
  const [_, getSignedUrl] = useMutation(GET_SIGNED_URL);

  const HOMEPAGE_QUERY = gql`
    query Query($where: ProfileWhereUniqueInput!) {
      me {
        resumeFilename
      }
      profile(where: $where) {
        firstName
        netid
      }
    }
  `;

  const [{ data, error }, refetchResume] = useQuery({
    query: HOMEPAGE_QUERY,
    variables: {
      where: {
        userId: session ? session.id : '',
      },
    },
    requestPolicy: 'network-only',
  });

  const handleResumeUploadReady = useCallback(() => {
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
  }, [setUploadReady, uploadRef]);

  const handleResumeUpload = useCallback(() => {
    const variables = {
      options: {
        action: 'UPLOAD',
        fileType: 'RESUME',
      },
    };

    getSignedUrl(variables).then((result: any) => {
      if (result.error) {
        console.error('Uhoh', result.error);
      }

      const { url } = result.data.transferFile;

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
        .then(() => {
          alert('Upload succeeded...');
          refetchResume();
        })
        .catch(() => alert('Upload failed. Please try again later...'));

      setUploadReady(false);
    });
  }, [getSignedUrl, refetchResume]);

  const handleResumeDownload = useCallback(() => {
    const variables = {
      options: {
        action: 'DOWNLOAD',
        fileType: 'RESUME',
      },
    };
    getSignedUrl(variables).then((result: any) => {
      if (result.error) {
        console.error('Uhoh', result.error);
      }

      const { url } = result.data.transferFile;

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
    });
  }, [getSignedUrl]);

  const handleResumeDelete = useCallback(() => {
    const variables = {
      options: {
        action: 'DELETE',
        fileType: 'RESUME',
      },
    };
    getSignedUrl(variables).then((result: any) => {
      if (result.error) {
        console.error('Uhoh', result.error);
      }

      const { url } = result.data.transferFile;
      axios({
        url,
        method: 'DELETE',
        responseType: 'blob', // important
      })
        .then(() => {
          alert('Successfully deleted resume.');
          refetchResume();
        })
        .catch(() => alert('Delete failed. Please try again later...'));
    });
  }, [getSignedUrl, refetchResume]);

  if (status == 'loading') return <p className="text-gray-100">loading...</p>;
  return (
    <div className="px-16 py-[65px] h-full relative">
      <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
      <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
      <h1 className="text-[48px] font-Gilroy text-white font-semibold text-center mb-[30px]">
        resume
      </h1>
      <div className="flex gap-10 items-center flex-wrap mb-[32px]">
        <DocumentIcon fill="#fff" width={100} height={180} />
        {data ? (
          <div>
            <h3 className="text-white font-semibold text-[32px]">Uploaded resume: </h3>
            <h3 className="text-white text-[24px]">{data ? data.me.resumeFilename : 'N/A'}</h3>
          </div>
        ) : (
          <h3 className="text-white font-semibold text-[32px]">Loading...</h3>
        )}
      </div>

      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-4">
          <div id="upload_container" className="flex">
            <input
              id="resume_input"
              type="file"
              className="hidden"
              ref={uploadRef}
              onChange={handleResumeUploadReady}
              accept=".pdf,.doc,.docx"
            />
            {!uploadReady ? (
              <Button onClick={() => uploadRef.current?.click()}>upload</Button>
            ) : (
              <Button onClick={handleResumeUpload}>confirm upload</Button>
            )}
          </div>
          <span className="font-medium text-white text-[24px] whitespace-nowrap hidden sm:inline">
            upload new resume
          </span>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleResumeDownload}>download</Button>
          <span className="font-medium text-white text-[24px] whitespace-nowrap hidden sm:inline">
            download current resume
          </span>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleResumeDelete}>delete</Button>
          <span className="font-medium text-white text-[24px] whitespace-nowrap hidden sm:inline">
            delete current resume
          </span>
        </div>
      </div>
    </div>
  );
}
