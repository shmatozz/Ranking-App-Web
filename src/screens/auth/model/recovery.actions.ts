import {updatePassword, verifyEmail} from "@/screens/auth/api/verify-email";

export const handleSendCode = async (email: string) => {
  try {
    return await verifyEmail(email)
  } catch (error) {
    console.error("Ошибка при отправке кода", error);
  }
};

export const handlePasswordChange = async (password: string, params: URLSearchParams) => {
  try {
    return await updatePassword(password, params.get("token")!)
  } catch (error) {
    console.error("Ошибка при смене пароля", error);
  }
};