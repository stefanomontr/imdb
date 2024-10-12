import {useEffect, useRef} from "react";
import image from "../assets/image-placeholder.png";
import {Page} from "puppeteer-core/lib/esm/puppeteer/api/Page.d.ts";
import classes from "../css/MovieSearch.module.css";
import {useQuery} from "@tanstack/react-query";
import Constants from "../utils/constants.ts";
import {Browser} from "puppeteer-core";
import puppeteer from "puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js";

export interface MoviePosterProps {
  movieTitle: string;
  imdbUrl: string;
}

export default function MoviePoster(props: MoviePosterProps) {
  const browserPage = useRef<Page>();
  const browserConnection = useRef<Browser>();

  const closeConnection = () => {
    console.log("Closing connection");
    if (browserPage.current && !browserPage.current.isClosed()) {
      browserPage.current.close()
        .then(() => {
          if (browserConnection.current && browserConnection.current.connected) {
            browserConnection.current.close();
          }
        });
    }
  };

  useEffect(() => {
    return closeConnection
  }, []);

  const getMoviePosterSrc = async (signal: AbortSignal) => {
    console.log("opening connection");
    // @ts-expect-error browserConnection.current could be undefined
    browserConnection.current = await puppeteer.connect({
      browserWSEndpoint: "ws://localhost:4000"
    });
    // @ts-expect-error browserPage.current could be undefined
    browserPage.current = await browserConnection.current?.newPage();

    signal.addEventListener("abort", closeConnection);

    await browserPage.current?.setUserAgent(Constants.BROWSER_AGENT);
    await browserPage.current?.goto(props.imdbUrl, {
      waitUntil: "domcontentloaded",
    });
    return browserPage.current?.evaluate(() => {
      const moviePoster = document.querySelector(".ipc-media--poster-l img") as HTMLImageElement;
      return moviePoster && moviePoster.src;
    });
  };

  const { data } = useQuery({
    queryFn: ({signal}) =>
      getMoviePosterSrc(signal)
        .catch(error => {
          throw new Error(`Error in scraping page ${props.imdbUrl}: ${error?.message}`);
        })
        .finally(closeConnection),
    queryKey: ["imdb-scraping", props.imdbUrl]
  });

  return (
    <div className={classes.search__moviePoster}>
      <img
        src={data || image}
        style={{width: "50px", height: "74px"}}
        alt={`Movie poster of ${props.movieTitle}`}
      />
    </div>
  );
}