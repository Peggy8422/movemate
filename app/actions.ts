"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.DEV_BASE_URL ?? "http://localhost:3000";

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

// signup/login
export async function signup(
  userName: string,
  userEmail: string,
  userPassword: string
) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function login(userEmail: string, userPassword: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

// forget/reset password
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
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function resetPassword(newPassword: string, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newPassword,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function saveOtherFlowAnswer() {}
