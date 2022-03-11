import { useRouter } from 'next/router';

const Event = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Event: {slug}</p>;
};

export default Event;
