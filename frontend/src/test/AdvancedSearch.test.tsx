import {expect, vi} from "vitest";
import {act, render, screen, waitFor} from "@testing-library/react";
import AdvancedSearch from "../components/AdvancedSearch.tsx";
import {SearchContextProvider} from "../components/SearchContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {
  getTitleInput,
  getMinRuntimeInput,
  getMaxRuntimeInput,
  getMinRatingInput,
  getMaxRatingInput,
  getGenreInput,
  getYearInput,
  testFetchLastCall,
  typeAndPressEnter
} from "./utils/test-utils.ts";
import {userEvent} from "@testing-library/user-event";
import Movie from "../dtos/Movie.ts";
import Page from "../dtos/Page.ts";

const renderWithQueryClientAndSearchCtx = () => {
  let pageNumber = 0;
  const pageSize = 5;
  const mockResponse = Promise.resolve({
    json: () => Promise.resolve({
      content: [] as Movie[],
      pageable: {
        pageNumber: pageNumber++,
        pageSize,
      }
    } as Page<Movie>)
  });
  const fetchMock = vi.fn(() => mockResponse);

  vi.stubGlobal("fetch", fetchMock);
  const testQueryClient = new QueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <SearchContextProvider>
        <AdvancedSearch/>
      </SearchContextProvider>
    </QueryClientProvider>
  );

  return {fetchMock};
}

const searchUrl = "http://localhost:8080/movies/search";

describe("Advanced Search", async () => {
  it("Initial fetch after rendering", async () => {
    const {fetchMock} = renderWithQueryClientAndSearchCtx();
    const initialSearchCriteria = {
      pageNumber: 0,
      pageSize: 5
    }

    expect(fetchMock).toHaveBeenCalledOnce();
    testFetchLastCall(fetchMock, {
      url: searchUrl,
      method: "POST",
      body: initialSearchCriteria
    });
  });

  it.each([
    ["title", getTitleInput, "The GodFather"],
    ["minRuntime", getMinRuntimeInput, 60],
    ["maxRuntime", getMaxRuntimeInput, 90],
    ["genre", getGenreInput, "Drama"],
    ["year", getYearInput, 2011],
    ["minRating", getMinRatingInput, 3],
    ["maxRating", getMaxRatingInput, 9]
  ])(
    "Input search filter %s and load more", async (
      fieldName: string,
      getInput: () => Element,
      input: string | number
    ) => {
      const user = userEvent.setup();
      const {fetchMock} = renderWithQueryClientAndSearchCtx();

      expect(getInput()).toBeInTheDocument();
      expect(getInput()).not.toHaveValue(input);

      // search
      await typeAndPressEnter(user, getInput(), input);

      // test fetch call with search input
      expect(fetchMock).toHaveBeenCalledTimes(2);
      testFetchLastCall(fetchMock, {
        url: searchUrl,
        method: "POST",
        body: {
          [fieldName]: input,
          pageNumber: 0,
          pageSize: 5
        }
      });

      // load one more page
      await waitFor(() => screen.getByText("LOAD MORE"));
      await act(async () => {
        await user.click(screen.getByText("LOAD MORE"));
      });

      expect(fetchMock).toHaveBeenCalledTimes(3);
      testFetchLastCall(fetchMock, {
        url: searchUrl,
        method: "POST",
        body: {
          [fieldName]: input,
          pageNumber: 2,
          pageSize: 5
        }
      });
    });
});
