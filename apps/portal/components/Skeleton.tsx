import Background from './Background';
import Navbar from './Navbar';

const Skeleton = ({ children }) => {
  return (
    <>
      <Background splotches={3} />
      <Navbar>{children}</Navbar>
    </>
  );
};

export default Skeleton;
