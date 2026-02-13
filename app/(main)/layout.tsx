import React from 'react'
import Header from '../../components/Header'
import { getCurrentUser } from '@/lib/auth';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div>
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
