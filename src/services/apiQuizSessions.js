import { callAPI, HttpMethod } from "./apiClient";

export async function startQuizSession(dto) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `/quiz-sessions/start`,
    data: dto,
  });

  return data;
}

export async function endQuizSession(dto) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `/quiz-sessions/end`,
    data: dto,
  });

  return data;
}

export async function getMySessions() {
  const data = await callAPI({
    method: HttpMethod.GET,
    url: `/quiz-sessions/me`,
  });

  return data;
}

export async function reviewSession(quizSessionId) {
  const data = await callAPI({
    method: HttpMethod.GET,
    url: `/quiz-sessions/review/${quizSessionId}`,
  });

  return data;
}