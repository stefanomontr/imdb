import {act, render, screen} from "@testing-library/react";
import SearchFilters from "../components/SearchFilters.tsx";
import {SearchContextProvider} from "../components/SearchContext.tsx";
import {expect} from "vitest";
import FilterChips from "../components/FilterChips.tsx";
import {userEvent} from "@testing-library/user-event";
import {
  getTitleInput,
  getMinRuntimeInput,
  getMaxRuntimeInput,
  getMinRatingInput,
  getMaxRatingInput,
  getGenreInput,
  getYearInput,
  typeAndPressEnter
} from "./utils/test-utils.ts";
import Constants from "../utils/constants.ts";

describe("Search Filters", async () => {
  it("rendering", async () => {
    render(
      <SearchContextProvider>
        <SearchFilters/>
      </SearchContextProvider>
    );

    expect(screen.getByText(Constants.TITLE)).toBeInTheDocument();
    expect(screen.getByText(Constants.RUNTIME)).toBeInTheDocument();
    expect(screen.getByText(Constants.GENRE)).toBeInTheDocument();
    expect(screen.getByText(Constants.YEAR)).toBeInTheDocument();
    expect(screen.getByText(Constants.RATING)).toBeInTheDocument();

    expect(getTitleInput()).toBeInTheDocument();
    expect(getMinRuntimeInput()).toBeInTheDocument();
    expect(getMaxRuntimeInput()).toBeInTheDocument();
    expect(getGenreInput()).toBeInTheDocument();
    expect(getYearInput()).toBeInTheDocument();
    expect(getMinRatingInput()).toBeInTheDocument();
    expect(getMaxRatingInput()).toBeInTheDocument();
  });

  it.each([
    [Constants.TITLE, getTitleInput, "The GodFather"],
    [Constants.MIN_RUNTIME, getMinRuntimeInput, 60],
    [Constants.MAX_RUNTIME, getMaxRuntimeInput, 90],
    [Constants.GENRE, getGenreInput, "Drama"],
    [Constants.YEAR, getYearInput, 2011],
    [Constants.MIN_RATING, getMinRatingInput, 3],
    [Constants.MAX_RATING, getMaxRatingInput, 9]
  ])(
    "Search %s and delete input", async (
      chipLabel: string,
      getInput: () => Element,
      input: string | number
  ) => {
    const user = userEvent.setup();

    render(
      <SearchContextProvider>
        <FilterChips/>
        <SearchFilters/>
      </SearchContextProvider>
    );

    // filter chip not rendered yet
    expect(screen.queryByText(`${chipLabel}: ${input}`)).not.toBeInTheDocument();

    expect(getInput()).toBeInTheDocument();
    expect(getInput()).not.toHaveValue(input);

    // search
    await typeAndPressEnter(user, getInput(), input);

    expect(getInput()).toHaveValue(input);
    // filter chip rendered
    const queryChip = () => screen.queryByText(`${chipLabel}: ${input}`);
    expect(queryChip()).toBeInTheDocument();

    // delete filter input
    await act(async () => {
      await user.clear(getInput());
      await user.type(getInput(), "{enter}");
    });

    // filter chip deleted
    expect(queryChip()).not.toBeInTheDocument();
    expect(getInput()).not.toHaveValue(input);
  });

  it.each([
    [Constants.TITLE, getTitleInput, "The GodFather"],
    [Constants.MIN_RUNTIME, getMinRuntimeInput, 60],
    [Constants.MAX_RUNTIME, getMaxRuntimeInput, 90],
    [Constants.GENRE, getGenreInput, "Drama"],
    [Constants.YEAR, getYearInput, 2011],
    [Constants.MIN_RATING, getMinRatingInput, 3],
    [Constants.MAX_RATING, getMaxRatingInput, 9]
  ])(
    "Search %s and delete filter chip", async (
      chipLabel: string,
      getInput: () => Element,
      input: string | number
    ) => {
      const user = userEvent.setup();

      render(
        <SearchContextProvider>
          <FilterChips/>
          <SearchFilters/>
        </SearchContextProvider>
      );

      // filter chip not rendered yet
      expect(screen.queryByText(`${chipLabel}: ${input}`)).not.toBeInTheDocument();

      expect(getInput()).toBeInTheDocument();
      expect(getInput()).not.toHaveValue(input);

      // search
      await typeAndPressEnter(user, getInput(), input);

      expect(getInput()).toHaveValue(input);
      // filter chip rendered
      const queryChip = () => screen.queryByText(`${chipLabel}: ${input}`);
      expect(queryChip()).toBeInTheDocument();
      // @ts-expect-error previous null check
      const deleteIcon = queryChip().nextElementSibling;
      expect(deleteIcon).not.toBeNull();

      // delete filter chip
      await act(async () => {
        // @ts-expect-error previous null check
        await user.click(deleteIcon);
      })

      expect(queryChip()).not.toBeInTheDocument();
      expect(getInput()).not.toHaveValue(input);
    });

});