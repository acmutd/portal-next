import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

const SignoutPage: NextPage = () => {
  useEffect(() => {
    signOut({
      callbackUrl: '/',
    });
  }, []);

  return null;
};

export default SignoutPage;
