import React, { useContext, useEffect, useState } from "react";

import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";


const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });

  // Load user data when page loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

       Swal.fire({
            icon: "success",
            title: "Success!",
            text: "profile updated successfully!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <img
            src={isEditing ? formData.photoURL : user.photoURL}
            alt="User profile"
            className="w-24 h-24 rounded-full border object-cover"
          />
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="text-sm font-medium">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          ) : (
            <p className="mt-1 text-gray-700">
              {user.displayName || "No name set"}
            </p>
          )}
        </div>

        {/* Email (read only) */}
        <div className="mb-3">
          <label className="text-sm font-medium">Email</label>
          <p className="mt-1 text-gray-500">{user.email}</p>
        </div>

        {/* Photo URL */}
        {isEditing && (
          <div className="mb-3">
            <label className="text-sm font-medium">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full btn-primary py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
