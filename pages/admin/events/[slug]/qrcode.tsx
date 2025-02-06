import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loading from 'components/Loading_Apply';

export default function QRCodePage() {
  const { query } = useRouter();
  const { slug } = query;
  const { status } = useSession({ required: true });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!slug || !canvasRef.current) return;
    
    // Generate QR code with optimized settings
    QRCode.toCanvas(
      canvasRef.current, 
      `${window.location.origin}/checkin/${slug}`, 
      {
        margin: 3.5,
        width: 300,
        errorCorrectionLevel: 'M', // Balance between size and error correction
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }
    );
  }, [slug, canvasRef]);

  if (status === 'loading') return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <canvas 
        ref={canvasRef}
        className="bg-white p-4 rounded-lg shadow-lg"
      />
      <p className="mt-4 text-white text-center">
        Scan this QR code to check in to the event
      </p>
    </div>
  );
}
