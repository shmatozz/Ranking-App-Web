import {auth} from "@/shared/lib";

class UserService {
  async getUserInfo(token: string) {
    const response = await fetch("http://localhost:9000/api/v1/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);
  }
}

export default new UserService();