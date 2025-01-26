import axios from "axios";

//----------------------------------Post-------------------------------//

const post_login = async (user_data) => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", user_data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting token:", error);
        throw error;
    }
};

export default post_login