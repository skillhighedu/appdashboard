// import { useEffect, useState } from "react";
// import { User, LogOut, Edit, Save, X } from "lucide-react";
// import Header from "@components/Header";
// import Loading from "@components/Loading";
// import { Button } from "@components/ui/button";
// import  Input  from "@components/Input";
// import { useStore } from "@context/useStore";
// import { useAuthStore } from "@context/authStore";
// import { fetchUserProfile } from "../services/userServices";

// export default function Profile() {
//   const { userProfile, setUserProfile } = useStore();
//   const { logout } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // Edit states
//   const [isEditingName, setIsEditingName] = useState(false);
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [nameValue, setNameValue] = useState("");

//   // Password states
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadUserProfile = async () => {
//       try {
//         setError(null);
//         const data = await fetchUserProfile();
//         setUserProfile(data);
//         setNameValue(data.name || "");
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//         setError("Unable to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserProfile();
//   }, [setUserProfile]);

//   const handleLogout = () => {
//     logout();
//   };

//   const handleSaveName = async () => {
//     try {
//       setError(null);
//       setSuccessMessage(null);

//       if (!nameValue.trim()) {
//         setError("Name cannot be empty");
//         return;
//       }

//       // await updateUserProfile({ name: nameValue });
//       // setUserProfile({ ...userProfile, name: nameValue });
//       // setIsEditingName(false);
//       // setSuccessMessage("Name updated successfully");

//       // Auto-clear success message after 3 seconds
//       setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (error) {
//       console.error("Failed to update name:", error);
//       setError("Unable to update name. Please try again.");
//     }
//   };

//   const handleCancelNameEdit = () => {
//     setNameValue(userProfile?.name || "");
//     setIsEditingName(false);
//   };

//   const handleUpdatePassword = async () => {
//     try {
//       setPasswordError(null);
//       setSuccessMessage(null);

//       // Validation
//       if (!currentPassword || !newPassword || !confirmPassword) {
//         setPasswordError("All password fields are required");
//         return;
//       }

//       if (newPassword !== confirmPassword) {
//         setPasswordError("New passwords don't match");
//         return;
//       }

//       if (newPassword.length < 8) {
//         setPasswordError("Password must be at least 8 characters long");
//         return;
//       }

//       // await updateUserPassword({
//       //   currentPassword,
//       //   newPassword
//       // });

//       // Reset fields
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setIsChangingPassword(false);
//       setSuccessMessage("Password updated successfully");

//       // Auto-clear success message after 3 seconds
//       setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (error) {
//       console.error("Failed to update password:", error);
//       setPasswordError("Failed to update password. Please verify your current password and try again.");
//     }
//   };

//   // Animation variants
//   const profileVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   const logoutIconVariants = {
//     hover: {
//       x: [0, 3, 0],
//       transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
//     },
//   };

//   const formVariants = {
//     hidden: { opacity: 0, height: 0 },
//     visible: {
//       opacity: 1,
//       height: "auto",
//       transition: { duration: 0.3, ease: "easeOut" }
//     },
//   };

//   return (
//     <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <Header title="Profile" />

//       <main className="flex-1 py-6 space-y-6">
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loading />
//           </div>
//         ) : error && !passwordError ? (
//           <div className="text-center text-red-600 p-4 bg-red-50 rounded-2xl">
//             {error}
//           </div>
//         ) : (
//           <>
//             {successMessage && (
//               <div className="text-center text-green-600 p-4 bg-green-50 rounded-2xl">
//                 {successMessage}
//               </div>
//             )}

//             {/* User Profile Card */}
//             <div className="bg-white dark:bg-darkSecondary rounded-2xl shadow-sm border border-gray-100 dark:border-darkPrimary p-6 transition-colors">
//               <div className="flex flex-col md:flex-row items-center gap-6">
//                 <div className="text-primary dark:text-white flex-shrink-0 bg-gray-100 dark:bg-darkPrimary p-4 rounded-full">
//                   <User className="w-12 h-12" />
//                 </div>

//                 <div className="flex-1 space-y-2 text-center md:text-left">
//                   {isEditingName ? (
//                     <div className="flex items-center gap-2">
//                       <Input
//                         type="text"
//                         value={nameValue}
//                         onChange={(e) => setNameValue(e.target.value)}
//                         className="max-w-xs"
//                         placeholder="Enter your name"
//                       />
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={handleSaveName}
//                         className="flex items-center gap-1"
//                       >
//                         <Save className="w-4 h-4" />
//                         <span>Save</span>
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={handleCancelNameEdit}
//                         className="flex items-center gap-1"
//                       >
//                         <X className="w-4 h-4" />
//                         <span>Cancel</span>
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center md:justify-start gap-2">
//                       <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                         {userProfile?.name ?? "Unknown User"}
//                       </h2>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setIsEditingName(true)}
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   )}
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {userProfile?.email ?? "No email available"}
//                   </p>
//                 </div>

//                 <Button
//                   variant="default"
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 text-sm font-medium rounded-md transition-colors"
//                   aria-label="Log out"
//                 >
//                   <span>Logout</span>
//                   <div className="motion-safe:hover:animate-pulse">
//                     <LogOut className="w-4 h-4" />
//                   </div>
//                 </Button>
//               </div>

//               {/* Profile Actions */}
//               <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
//                 <div className="flex flex-col space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                       Security Settings
//                     </h3>
//                     <Button
//                     className="text-sm text-white"
//                       variant={isChangingPassword ? "outline" : "default"}
//                       onClick={() => setIsChangingPassword(!isChangingPassword)}
//                     >
//                       {isChangingPassword ? "Cancel" : "Change Password"}
//                     </Button>
//                   </div>

//                   {isChangingPassword && (
//                     <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       {passwordError && (
//                         <div className="text-red-600 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
//                           {passwordError}
//                         </div>
//                       )}

//                       <div className="space-y-4">
//                         <div>
//                           <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Current Password
//                           </label>
//                           <Input
//                             id="currentPassword"
//                             type="password"
//                             value={currentPassword}
//                             onChange={(e) => setCurrentPassword(e.target.value)}
//                             className="max-w-md "
//                           />
//                         </div>

//                         <div>
//                           <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             New Password
//                           </label>
//                           <Input
//                             id="newPassword"
//                             type="password"
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             className="max-w-md"
//                           />
//                         </div>

//                         <div>
//                           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Confirm New Password
//                           </label>
//                           <Input
//                             id="confirmPassword"
//                             type="password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="max-w-md"
//                           />
//                         </div>
//                       </div>

//                       <div className="flex gap-4 justify-end">
//                        <Button onClick={handleUpdatePassword} variant="outline" className="text-gray-700 cursor-pointer">Cancel</Button>
//                         <Button onClick={handleUpdatePassword} className="text-white cursor-pointer">Update Password</Button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

import Header from "@components/Header";
import { User, LogOut } from "lucide-react";
import { useStore } from "@context/useStore";
import { fetchUserProfile } from "../services/userServices";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import { useAuthStore } from "@context/authStore";
import { Button } from "@components/ui/button";

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

          <Button
            className="px-4 flex items-center gap-2 py-3 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            Logout <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
}
