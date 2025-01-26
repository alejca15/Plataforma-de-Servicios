import axios from "axios";

//----------------------------------Post-------------------------------//
const post_user = async (User_data) => {
  try {
    const response = await axios.post("http://localhost:3000/users", User_data);
    return response.data;
  } catch (error) {
    console.error("Error posting User", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_users = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_user = async (id) => {
  try {
    const response = await axios.delete("http://localhost:3000/users/${id}");
    return response.data;
  } catch (error) {
    console.error("Error deleting User", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_user = async (id, User_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/Users/${id}`, User_data);
    return response.data;
  } catch (error) {
    console.error("Error updating User", error);
    throw error;
  }
};

export default { post_user, get_users, delete_user, update_user };