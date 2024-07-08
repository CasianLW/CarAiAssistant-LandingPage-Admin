import React, { useState, useEffect, FC } from "react";
import { useApiHelper } from "@/helpers/api-helper.hook";
import { EditUserModal } from "./EditUser.modal";

interface User {
  _id: string;
  username: string;
  email: string;
  isBanned: boolean;
  isPremium: boolean;
}

export const Users: FC = () => {
  const { sendRequest } = useApiHelper();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const data = await sendRequest({
        url: `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        }/users`,
      });
      setAllUsers(data.data);
      setUsers(data.data.slice(0, usersPerPage)); // Set the first page of users
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await sendRequest({
          url: `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
          }/users/${userId}`,
          method: "DELETE",
        });
        const updatedUsers = allUsers.filter((user) => user._id !== userId);
        setAllUsers(updatedUsers);
        paginateUsers(currentPage, updatedUsers);
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const editUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    paginateUsers(page);
  };

  const paginateUsers = (page: number, usersList: User[] = allUsers) => {
    const startIndex = (page - 1) * usersPerPage;
    const selectedUsers = usersList.slice(
      startIndex,
      startIndex + usersPerPage
    );
    setUsers(selectedUsers);
  };

  const totalPages = Math.ceil(allUsers.length / usersPerPage);

  return (
    <div className="max-w-[400px] md:max-w-full ">
      <h2 className="text-lg font-bold text-black">User Management</h2>
      <ul className="md:grid md:grid-cols-2 ">
        {users.map((user) => (
          <li
            className="flex  justify-between items-center py-2 text-black border-b md:max-w-[400px]"
            key={user._id}
          >
            {user.username} - {user.email}
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => editUser(user)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && editingUser && (
        <EditUserModal
          user={editingUser}
          closeModal={closeModal}
          fetchUsers={() => paginateUsers(currentPage)}
        />
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`mx-1 px-2 py-1 text-black text-sm border ${
              currentPage === page
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};
