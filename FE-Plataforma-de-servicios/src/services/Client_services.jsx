import axios from "axios";

//----------------------------------Post-------------------------------//
const post_client = async (client_data) => {
  try {
    const response = await axios.post("http://localhost:3000/clients", client_data);
   if (!response) {
    throw error;
   }
    return response.data;
  } catch (error) {
    console.error("Error posting client", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
const get_clients = async () => {
  try {
    const response = await axios.get("http://localhost:3000/clients");
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
const delete_client = async (id) => {
  try {
    const response = await axios.delete("http://localhost:3000/clients/${id}");
    return response.data;
  } catch (error) {
    console.error("Error deleting client", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
const update_client = async (id, client_data) => {
  try {
    const response = await axios.put(`http://localhost:3000/clients/${id}`, client_data);
    return response.data;
  } catch (error) {
    console.error("Error updating client", error);
    throw error;
  }
};

export default { post_client, get_clients, delete_client, update_client };