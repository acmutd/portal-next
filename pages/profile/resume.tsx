import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import contentDisposition from 'content-disposition';
import mime from 'mime-types';
import { getSession, useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import Button from 'components/Button';
import CircularBlur from 'components/CircularBlur';
import DocumentIcon from 'icons/DocumentIcon';
import { GetServerSideProps } from 'next';
import { gqlQueries, queryClient } from 'src/api';
import { dehydrate } from 'react-query';
import { Action, FileCategory } from 'lib/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  await queryClient.prefetchQuery('resumeData', () =>
    gqlQueries.getResumePageUserInfo({
      where: {
        userId: session?.id || '',
      },
    }),
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function ResumePage() {
  const [uploadReady, setUploadReady] = useState(false);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const { data: session, status } = useSession({ required: true });
  const {
    data,
    isLoading,
    refetch: refetchResume,
  } = useQuery(
    ['resumeData'],
    () =>
      gqlQueries.getResumePageUserInfo({
        where: {
          userId: session?.id || '',
        },
      }),
    {
      enabled: status === 'authenticated',
    },
  );

  const handleResumeUploadReady = useCallback(() => {
    if (!uploadRef.current || !uploadRef.current.files) return;
    if (
      uploadRef.current.files!.length !== 1 ||
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

  const handleResumeUpload = useCallback(async () => {
    try {
      const data = await gqlQueries.getResumeSignedURL({
        options: {
          action: Action.Upload,
          fileType: FileCategory.Resume,
        },
      });
      const { url } = data.transferFile;

      const fileName = `${session!.user!.name!.replace(/\W/g, '')}_resume.${mime.extension(
        uploadRef.current!.files![0].type,
      )}`; // FirstnameLastname_resume.extension

      const disposition = contentDisposition(fileName); // This will be the default filename when downloading

      await axios.put(url!, uploadRef.current!.files![0], {
        headers: {
          'Content-Type': mime.contentType(uploadRef.current!.files![0].type),
          'Content-Disposition': disposition,
        },
      });
      await refetchResume();
      setUploadReady(false);
    } catch (error) {
      console.error('Uhoh', error);
      alert('Upload failed. Please try again later...');
    }
  }, [gqlQueries.getResumeSignedURL, refetchResume]);

  const handleResumeDownload = useCallback(async () => {
    const data = await gqlQueries.getResumeSignedURL({
      options: {
        action: Action.Download,
        fileType: FileCategory.Resume,
      },
    });
    const { url } = data.transferFile;

    axios({
      url: url!,
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
  }, [gqlQueries.getResumeSignedURL]);

  const handleResumeDelete = useCallback(async () => {
    try {
      const data = await gqlQueries.getResumeSignedURL({
        options: {
          action: Action.Delete,
          fileType: FileCategory.Resume,
        },
      });
      const { url } = data.transferFile;
      await axios({
        url: url!,
        method: 'DELETE',
        responseType: 'blob', // important
      });
      alert('Successfully deleted resume.');
      await refetchResume();
    } catch (err) {
      console.error(err);
      alert('Delete failed. Please try again later...');
    }
  }, [gqlQueries.getResumeSignedURL, refetchResume]);

  if (isLoading || status == 'loading') return <p className="text-gray-100">loading...</p>;
  return (
    <div className="px-16 py-[65px] h-full relative">
      <CircularBlur backgroundColor="rgba(129, 53, 218, 1)" top="20%" left="10%" />
      <CircularBlur backgroundColor="#daa635" bottom="20%" right="15%" />
      <h1 className="text-[48px] font-Gilroy text-white font-semibold text-center mb-[30px]">
        resume
      </h1>
      <div className="flex gap-10 items-center flex-wrap mb-[32px]">
        <DocumentIcon fill="#fff" width={100} height={180} />
        {!isLoading ? (
          <div>
            <h3 className="text-white font-semibold text-[32px]">Uploaded resume: </h3>
            <h3 className="text-white text-[24px]">{data?.me.resumeFilename || 'N/A'}</h3>
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
