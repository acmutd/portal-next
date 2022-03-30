import { useRouter } from 'next/router';

const Checkin = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Checkin to Event: {slug}</p>;
};

export default Checkin;
