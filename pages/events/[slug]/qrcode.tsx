import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function QRCodePage() {
  const { query } = useRouter();
  const { slug } = query;
  const { status } = useSession({ required: true });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, `${window.location.origin}/checkin/${slug}`, {
        margin: 3.5,
        width: 300,
      });
    }
  }, [canvasRef]);

  const array = [];
  for (let i = 0; i < 20; i++) {
    array.push(
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>,
    );
  }

  if (status == 'loading')
    return (
      <>
        <div
          role="status"
          className="w-full h-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          {array}
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
