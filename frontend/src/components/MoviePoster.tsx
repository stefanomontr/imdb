import puppeteer from 'puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js';
import {useEffect, useRef, useState} from "react";
import Constants from "../utils/constants.ts";
import image from "../assets/image-placeholder.png";
import {Page} from "puppeteer-core/lib/esm/puppeteer/api/Page.d.ts";
import classes from "../css/MovieSearch.module.css";

export interface MoviePosterProps {
  movieTitle: string;
  imdbUrl: string;
}

export default function MoviePoster(props: MoviePosterProps) {
  const [moviePosterSrc, setMoviePosterSrc] = useState<string>();
  const browserPage = useRef<Page>();

  useEffect(() => {
    getMoviePosterSrc()
      .then(moviePosterUrl => setMoviePosterSrc(moviePosterUrl))
      .catch(error => {
        console.error(`Error while scraping page ${props.imdbUrl}`, error);
      })
      .finally(async () => {
        await browserPage.current?.close();
      });
  }, [props.imdbUrl]);

  const getMoviePosterSrc = async () => {
    const browser = await puppeteer.connect({
      browserWSEndpoint: "ws://localhost:4000"
    });
    browserPage.current = await browser.newPage();
    await browserPage.current.setUserAgent(Constants.BROWSER_AGENT);
    await browserPage.current.goto(props.imdbUrl, {
      waitUntil: "domcontentloaded",
    });

    return await browserPage.current.evaluate(() => {
      const moviePoster = document.querySelector(".ipc-media--poster-l img") as HTMLImageElement;
      return moviePoster && moviePoster.src;
    });
  };

  return (
    <div className={classes.search__moviePoster}>
      <img
        src={moviePosterSrc || image}
        style={{width: "50px", height: "74px"}}
        alt={`Movie poster of ${props.movieTitle}`}
      />
    </div>
  );
}