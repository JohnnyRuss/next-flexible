import { getUserProjects } from "@/lib/actions";
import ProfilePage from "@/components/ProfilePage";
import { UserProfile } from "@/common.types";
import React from "react";

interface UserProfileT {
  params: {
    userId: string;
  };
}

const UserProfile: React.FC<UserProfileT> = async ({ params: { userId } }) => {
  const result = (await getUserProjects({ id: userId, last: 100 })) as {
    user: UserProfile;
  };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return <ProfilePage user={result?.user} />;
};

export default UserProfile;
