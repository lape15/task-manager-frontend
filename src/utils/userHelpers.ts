"use server";

import { User, UserFieldErrors } from "./types";

type ActionState =
  | { error: string }
  | { success: User; token: string }
  | { error: UserFieldErrors };

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createUser = async (
  previousState: ActionState | null,
  formData: FormData
) => {
  const user: User = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    email: formData.get("email") as string,
  };

  for (const [key, value] of Object.entries(user)) {
    if (!value) {
      return { error: { [key]: `${key} field is required` } };
    }
  }
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorText = await response.text();

      return { error: errorText };
    }

    const res = await response.json();

    return res.success
      ? { success: res.User, token: res.token }
      : { error: res.message };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
};
