import axios from "../axios";

export async function  getDashboardData(){
  try {
    const response = await axios.get("posts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
  