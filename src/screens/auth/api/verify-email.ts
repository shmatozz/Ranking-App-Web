'use server';

export const verifyEmail = async (email: string) => {
  try {
    console.log(email);
    const response = await fetch("http://localhost:9000/api/v1/password/recovery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
      });

     return response.ok;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    console.log(token)

    const response = await fetch("http://localhost:9000/api/v1/password/validate-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
      });

    return response.ok;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePassword = async (password: string, token: string) => {
  try {
    const response = await fetch("http://localhost:9000/api/v1/password/validate-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password, confirmPassword: password, token: token })
      })

    console.log(response);

    return (await response.text()).length == 0 ? {status: 200} : (await response.json());
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
