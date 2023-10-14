import axios from "../axios";

export async function  getDashboardData(){
  try {
    const response = await axios.get("posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
  