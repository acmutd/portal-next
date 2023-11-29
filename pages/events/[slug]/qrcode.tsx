import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from 'components/Loading';

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

  if (status == 'loading') return <Loading />;
  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
