import {act, render, screen, waitFor} from "@testing-library/react";
import SearchSorting from "../components/SearchSorting.tsx";
import {SearchContextProvider} from "../components/SearchContext.tsx";
import {expect} from "vitest";
import SearchFilters from "../components/SearchFilters.tsx";
import {userEvent} from "@testing-library/user-event";
import FilterChips from "../components/FilterChips.tsx";
import {getSortingInput, getTitleInput, typeAndPressEnter} from "./utils/test-utils.ts";

describe("Sorting", async () => {
  it("Sorting rendering", async () => {
    render(
      <SearchContextProvider>
        <SearchSorting />
      </SearchContextProvider>
    );
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  it("Search sorting and reset after filters change", async () => {
    const user = userEvent.setup();

    render(
      <SearchContextProvider>
        <FilterChips />
        <SearchSorting />
        <SearchFilters />
      </SearchContextProvider>
    );

    expect(screen.getByText("Sort by")).toBeInTheDocument();
    expect(getSortingInput()).toBeInTheDocument();
    await act(async () => {
      await user.selectOptions(getSortingInput(), "title");
    });

    // sort by title
    expect(screen.getByText("Sort by: title ASC")).toBeInTheDocument();
    expect(screen.getByTestId("search-sorting-direction")).toBeInTheDocument();

    // invert sorting order
    await act(async () => {
      await user.click(screen.getByTestId("search-sorting-direction"));
    });

    await waitFor(() => screen.getByText("Sort by: title DESC"));
    expect(screen.getByText("Sort by: title DESC")).toBeInTheDocument();
    expect(screen.queryByText("Sort by: title ASC")).not.toBeInTheDocument();

    expect(getTitleInput()).toBeInTheDocument();
    expect(getTitleInput()).toHaveValue("");

    // change search filters
    await typeAndPressEnter(user, getTitleInput(), "Titanic");
    expect(getTitleInput()).toHaveValue("Titanic");

    // expect sorting to be reset
    expect(screen.getByText("Title: Titanic")).toBeInTheDocument();
    expect(screen.queryByText("Sort by: title DESC")).not.toBeInTheDocument();
  });
})