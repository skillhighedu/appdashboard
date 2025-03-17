import Header from "@components/Header";
import { User, LogOut } from "lucide-react";
import { useStore } from "@context/useStore";
import { fetchUserProfile } from "../services/userServices";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import { useAuthStore } from "@context/authStore";
export default function Profile() {
  const { setUserProfile, userProfile } = useStore();
  const [loading, setLoading] = useState(true);
  const { logout } = useAuthStore();
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [setUserProfile]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-7xl mx-auto  h-screen">
      <Header title="Profile" />
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-full mx-auto p-6 bg-white rounded-2xl shadow-sm border-0 flex items-center space-x-4">
          <div className="text-primary">
            <User />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {userProfile && userProfile.name}
            </h2>
            <p className="text-sm text-gray-500">
              {userProfile && userProfile.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleLogout()}
            className="px-4 flex items-center gap-2 py-3 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition cursor-pointer"
          >
            Logout
            <LogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
