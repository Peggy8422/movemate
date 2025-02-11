"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// cookies actions
export async function setCookie(key: string, value: string) {
  cookies().set(key, value);
}

export async function getCookie(key: string) {
  return cookies().get(key);
}

export async function deleteCookie(key: string) {
  cookies().delete(key);
}

// 
export async function forgetPassword(userEmail: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
  
}

export async function resetPassword(
  newPassword: string,
  token: string
) {
  try {
    const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword,
      }),
    });
    const data = await res.json();
    return data.message;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
