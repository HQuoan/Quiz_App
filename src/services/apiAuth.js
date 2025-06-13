import { callAPI, HttpMethod } from "./apiClient";
import { getSheet } from './../../node_modules/goober/src/core/get-sheet';

export async function login(loginDto) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `/users/login`,
    data: loginDto,
  });

  return data?.result?.user;
}


export async function logout() {
  await callAPI({
    method: HttpMethod.POST,
    url: `/users/logout`,
  });
}

export async function getCurrentUser() {
   const res = await callAPI({
    method: HttpMethod.GET,
   url: `/users/me`,
  });

  return res?.result;
}




