import React from 'react';
import { UserButton } from '@clerk/nextjs';

import { FaSpinner } from 'react-icons/fa';
import { getAuthUser } from '@/utils/actions';

const MemberProfile: React.FC = async () => {
  const user = await getAuthUser();

  return (
    <div className="flex items-center justify-center gap-2 border-2 border-purple-500 p-2 mr-2 mt-2 rounded-lg bg-">
      {user ? (
        <>
          <UserButton />
          <p>{user.username}</p>
        </>
      ) : (
        <div className="flex justify-center items-center animate-spin">
          <FaSpinner size={20} />
        </div>
      )}
    </div>
  );
};

export default MemberProfile;
