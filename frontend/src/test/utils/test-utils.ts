import {act, screen} from "@testing-library/react";
import {UserEvent} from "@testing-library/user-event";
import {expect, Mock} from "vitest";

export const getTitleInput = () =>
  screen.getByTestId("search-filter-title");

export const getMaxRuntimeInput = () =>
  screen.getByTestId("search-filter-max-runtime");

export const getMinRuntimeInput = () =>
  screen.getByTestId("search-filter-min-runtime");

export const getGenreInput = () =>
  screen.getByTestId("search-filter-genre");

export const getMinRatingInput = () =>
  screen.getByTestId("search-filter-min-rating");

export const getMaxRatingInput = () =>
  screen.getByTestId("search-filter-max-rating");

export const getYearInput = () =>
  screen.getByTestId("search-filter-year");

export const getSortingInput = () =>
  screen.getByTestId("search-sorting");

export const getSortingDirectionIcon = () =>
  screen.getByTestId("search-sorting-direction");

export async function typeAndPressEnter(
  user: UserEvent,
  inputElement: Element,
  input: string | number
) {
  await act(async () => {
    await user.type(inputElement, `${input}{enter}`);
  });
}

type FetchMockOptions = {
  url: string;
  method: string;
  body: object;
}

export function testFetchCall(callNum: number, fetchMock: Mock, options: FetchMockOptions) {
  const fetchCall = callNum === -1
    ? fetchMock.mock.lastCall
    : fetchMock.mock.calls[callNum];
  expect(fetchCall).not.toBeUndefined();
  // @ts-expect-error previous undefined check
  const [url, request] = fetchCall;
  const body = JSON.parse(request.body);
  const method = request.method;
  expect(url).toEqual(options.url);
  expect(method).toEqual(options.method);
  expect(body).toEqual(options.body);
}

export function testFetchLastCall(fetchMock: Mock, options: FetchMockOptions) {
  return testFetchCall(-1, fetchMock, options);
}