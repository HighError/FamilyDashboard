import Layout from '@/components/Layout';
import { getSession, GetSessionParams } from 'next-auth/react';

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function Home() {
  return (
    <Layout title="Огляд" subtitle="З поверненням">
      <div>123</div>
    </Layout>
  );
}
