// app/dashboard/page.tsx
import BookingSection from './BookingSections';
import { getAuthUser } from '@/utils/actions';

export default async function Dashboard() {
  const user = await getAuthUser();

  return (
    <main className="min-h-svh bg-gradient-to-b from-purple-50 via-white to-white flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-purple-100/[0.2] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white opacity-90 -z-10" />

      <div className="w-full">
        <div className="container mx-auto sm:px-4 mt-20 xl:mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-xl p-8 space-y-8">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-60" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-60" />

                {/* Content */}
                <div className="relative">
                  <BookingSection
                    username={user.username}
                    firstName={user.firstName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
