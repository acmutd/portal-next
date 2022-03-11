import { useRouter } from 'next/router';

const Rsvp = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>RSVP to Event: {slug}</p>;
};

export default Rsvp;
