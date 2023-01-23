import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/router';

export default function QRCodePage() {
  const { query } = useRouter();
  const { slug } = query;

  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, `${window.location.origin}/checkin/${slug}`, {
        margin: 3.5,
        width: 300,
      });
    }
  }, [canvasRef]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
