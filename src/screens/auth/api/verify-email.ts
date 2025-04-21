'use server';

export const verifyEmail = async (email: string) => {
  try {
    console.log(email);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/password/recovery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email})
      });

    console.log(response);

    const responseText = await response.text();
    return responseText.length === 0 ? { status: 200 } : JSON.parse(responseText);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    console.log(token)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/password/validate-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
      });

    const responseText = await response.text();
    return responseText.length === 0 ? { status: 200 } : JSON.parse(responseText);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updatePassword = async (password: string, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/password/change`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password, confirmPassword: password, token: token })
      })

    console.log(response);

    const responseText = await response.text();
    return responseText.length === 0 ? { status: 200 } : JSON.parse(responseText);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
