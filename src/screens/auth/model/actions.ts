"use server";

export const sendCodeRequest = async (email: string) => {
  try {
    const response = await fetch(`http://localhost:9000/api/v1/auth/verify-email?emailToVerify=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to send confirmation code.");
    }

    const data = await response.json();

    return data.verificationCode;
  } catch (err) {
    console.error(err);
  } finally {
  }
};
