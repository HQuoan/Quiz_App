import { callAPI, HttpMethod } from "./apiClient";

export async function getQuizzes() {
  const data = await callAPI({
    method: HttpMethod.GET,
    url: `/quizzes`,
  });

  return data;
}