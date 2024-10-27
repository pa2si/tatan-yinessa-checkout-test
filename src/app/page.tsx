// app/page.tsx
import HomeLogo from '@/components/HomeLogo';
import HomeLogoXL from '@/components/HomeLogoXL';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="min-h-svh grid md:grid-cols-2 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-50 via-white to-white">
      <div className="flex flex-col justify-center px-8 md:px-16 py-12 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Welcome back!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-xl leading-relaxed">
            We wish you great fun with your classes. Ready for Salsa Caleña?
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Go to my Booking
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="pt-8">
          <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                🎵
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center">
                💃
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center">
                🕺
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Learn Salsa Caleña from the best!
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center p-12 xl:p-0  xl:bg-purple-200 xl:rotate-12">
        <div className="relative w-full max-w-lg">
          <div className="hidden xl:block">
            <HomeLogoXL />
          </div>
          <div className="block xl:hidden">
            <HomeLogo />
          </div>
        </div>
      </div>
    </main>
  );
}
