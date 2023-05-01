import { Inter } from 'next/font/google'
import { Homepage } from '@/containers/Hompege';
import { MainLayout } from '@/layouts';

export default function Home() {
  return (
    <MainLayout>
      <Homepage/>
    </MainLayout>
  );
}
