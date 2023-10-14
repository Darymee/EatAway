import axios from "../axios";

export async function getDashboardData() {
  try {
    const response = await axios.get("posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addNewPost(post) {
  try {
    const response = await axios.post("posts", post);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
