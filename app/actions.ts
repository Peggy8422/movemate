"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;

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

// update profile: user info/ preferance
export async function updateUserAvatar(avatarFile: File, token: string) {
  const formData = new FormData();
  formData.append("avatar", avatarFile);
  try {
    const res = await fetch(`${BASE_URL}/profile/uploadProfilePicture`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function updateProfileCover(coverFile: File, token: string) {
  const formData = new FormData();
  formData.append("cover", coverFile);
  try {
    const res = await fetch(`${BASE_URL}/profile/uploadCoverPicture`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function updateUserInfo(
  userData: {
    name: string;
    intro: string;
    personalTags: string[];
  },
  token: string
) {
  try {
    const res = await fetch(`${BASE_URL}/profile/savePersonalProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

// payload structure same as preferance-flow
export async function updatePreferance(
  preferanceData: object[],
  token: string
) {
  try {
    const res = await fetch(`${BASE_URL}/user/update-preferance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferanceData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}

export async function saveOtherFlowAnswer() {}
