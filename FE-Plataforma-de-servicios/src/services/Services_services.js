import axios from "axios";

//----------------------------------Post-------------------------------//
// Crear un servicio
const postService = async (serviceData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/services",
      serviceData
    );
    if (!response) {
        console.error(error);
      }
    return response.data;
    
  } catch (error) {
    console.error("Error posting service:", error);
    throw error;
  }
};

//----------------------------------Get-------------------------------//
// Obtener todos los servicios
const getServices = async () => {
  try {
    const response = await axios.get("http://localhost:3000/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

//----------------------------------Delete-------------------------------//
// Eliminar un servicio
const deleteService = async (id) => {
  try {
    const response = await axios.delete("http://localhost:3000/services/${id}");
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

//----------------------------------Put-------------------------------//
// Actualizar un servicio
const updateService = async (id, serviceData) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/services/${id}",
      serviceData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

//----------------------------------Exportar el CRUD-------------------------------//
export default { postService, getServices, deleteService, updateService };
