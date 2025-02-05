export const whoAmI = async (token: string) => {
  try {
    const response = await fetch(
      "http://localhost:9000/api/v1/auth/info-by-token?token=" + token,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}