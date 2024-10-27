import MemberProfile from '@/components/MemberProfile';
import Link from 'next/link';
import { MdHome } from 'react-icons/md';

export default function routesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <section className="absolute top-5 left-5 transform">
        <Link href="/">
          <div className="py-2 text-xl px-4 rounded-full text-purple-500 flex items-center gap-2">
            <div className="text-2xl">
              <MdHome />
            </div>
            Home
          </div>
        </Link>
      </section>
      <div className="absolute top-3 right-3 max-w-7xl mx-auto">
        <MemberProfile />
      </div>
    </div>
  );
}
