import React, { FC, useState } from "react";
import { useApiHelper } from "@/helpers/api-helper.hook";

interface User {
  _id: string;
  username: string;
  email: string;
  isBanned: boolean;
  isPremium: boolean;
}

interface EditUserModalProps {
  user: User;
  closeModal: () => void;
  fetchUsers: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({
  user,
  closeModal,
  fetchUsers,
}) => {
  const { sendRequest } = useApiHelper();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isBanned, setIsBanned] = useState(user.isBanned);
  const [isPremium, setIsPremium] = useState(user.isPremium);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendRequest({
        url: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        }/users/${user._id}`,
        method: "PATCH",
        body: { username, email, isBanned, isPremium },
      });
      fetchUsers();
      closeModal();
      alert("User updated successfully.");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit User
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-2 w-full border rounded text-black"
              placeholder="Username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 w-full border rounded text-black"
              placeholder="Email"
            />
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={isBanned}
                onChange={(e) => setIsBanned(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Is Banned</span>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2 text-gray-700">Is Premium</span>
            </div>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
