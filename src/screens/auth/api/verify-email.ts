import AxiosConfig from "@/shared/api/AxiosConfig";

export const verifyEmail = async (email: string) => {
  try {
    const response = await AxiosConfig.get("/auth/verify-email", {
      params: {
        emailToVerify: email,
      }
    })

    console.log(response);

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
