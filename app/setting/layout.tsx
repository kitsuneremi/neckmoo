import MainLayout from '@/layout/mainLayout'
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'settings',
  description: 'setting page'
}


export default function Layout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
