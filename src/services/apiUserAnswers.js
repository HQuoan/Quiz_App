import { callAPI, HttpMethod } from "./apiClient";

export async function checkAnswer(dto) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `/user-answers/check`,
    data: dto,
  });

  return data;
}