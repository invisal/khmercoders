/* eslint-disable @next/next/no-img-element */
interface UserProfileProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    username: string;
    avatar: string | null;
    about: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center p-4 bg-black shadow rounded-lg">
      <img
        className="size-24 rounded-full object-cover"
        src={user.avatar || "https://via.placeholder.com/150"}
        alt={user.name || "User"}
      />
      <h2 className="mt-4 font-bold text-xl">{user.name}</h2>
      <span className="text-gray-600">{10} Followers</span>
      <p className="text-center text-gray-500 mt-2">{user.about}</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Follow
      </button>
    </div>
  );
};
