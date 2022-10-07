import Head from 'next/head';
import Navigation from './Navigation';
import { Footer } from '../components/navigation/footer/Footer';
import { Header } from '../components/navigation/header/Header';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>ALTRO</title>
        <meta name="description" content="ALTRO is an open source tool for robotics..." />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Robotics_Institute_logo.svg/1200px-Robotics_Institute_logo.svg.png"
        />
      </Head>

      <main className="w-[100%] flex flex-col items-center">
        <Header stickyHeader={true} />
        {children}
      </main>
    </>
  );
}
