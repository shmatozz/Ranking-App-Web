'use server';

export const verifyEmail = async (email: string) => {
  try {
    console.log(email)
    const response = await fetch("http://localhost:9000/api/v1/auth/verify-email?emailToVerify=" + email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

    console.log(response);

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePassword = async (password: string) => {
  try {
    const response = await fetch(password,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

    console.log(response);

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
