import axios from "axios";

//----------------------------------Post-------------------------------//
const post_provider = async (provider_data) => {
  try {
    const response = await axios.post("http://localhost:3000/providers", provider_data);
    return response.data;
  } catch (error) {
    console.error("Error posting provider", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_providers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/providers");
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_provider = async (id) => {
  try {
    const response = await axios.delete("http://localhost:3000/providers/${id}");
    return response.data;
  } catch (error) {
    console.error("Error deleting provider", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_provider = async (id, provider_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/providers/${id}`, provider_data);
    return response.data;
  } catch (error) {
    console.error("Error updating provider", error);
    throw error;
  }
};

export default { post_provider, get_providers, delete_provider, update_provider };