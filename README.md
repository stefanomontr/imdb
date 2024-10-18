# README

This is my solution to a technical test focusing on building a UI in short time.
Hence, the most important part of the application is the frontend.

You can read this file skipping the two "technical" sections, if you don’t want to read about implementation details.
Those sections are not needed at all if you just want to try and test the app in your browser.

- [Challenge Definition](#challenge-definition)
- [Requirements](#requirements)
- [Architecture (Technical)](#architecture-technical)
- [Premise (Technical)](#premise-technical)
- [Startup](#startup)
- [Functionality](#functionality)
- [Movie Posters](#movie-posters)
- [Responsive Design](#responsive-design)
- [Shutdown](#shutdown)
- [Source Code (Technical)](#source-code-technical)


## CHALLENGE DEFINITION

IMDb provides tab-separated files with movie listings. 
The application will have to fulfill the following functional requirements.

1) For each movie, show:

   - Title
   - Genre
   - Year
   - Rating
   - Runtime (i.e. duration)
   - A small icon of the poster
   - A link to the IMDb page of that movie


2) The user can sort movies by:

   - Title
   - Year
   - Runtime
   - Rating


3) The user can filter movies by:

   - Title
   - Genre
   - Year
   - Rating
   - Runtime (i.e. duration)

The data files can be downloaded from [IMDb datasets](https://datasets.imdbws.com/). 
Their description is [here](https://www.imdb.com/interfaces/). Pick the relevant ones.

## REQUIREMENTS

The application has been tested on Linux, Windows, and Mac, so there should be no specific OS required.

Since it's resource intensive, you will need at least **15GB of free memory** (actually less, but it's an approximation).
For instructions on how to delete the application data after usage, look up the [Shutdown](#shutdown) section.

Your **3306, 8080 and 3000 ports** should be **free**.

The browser should be irrelevant, but so far I've only tested the application on Chrome and Firefox.
 

## ARCHITECTURE (TECHNICAL)

My solution to the problem of showing a large amount of data (more than 11 million of movies) was to parse the TSV files and ingest them into a **MySQL** database.

The database is queried by a **SpringBoot** backend application.

The backend then serves data to a Vite **React** single-page application. The frontend is written in TypeScript.


## PREMISE (TECHNICAL)

If you start the application following the [Startup](#startup) instructions, please be aware that the app will show the IMDb data of October the 1st, 2024.
Since [IMDb datasets](https://datasets.imdbws.com/) are updated on a daily basis, there might be some (minor) differences between the current files and the ones I used to build the application.
You can download the files I used &mdash; `title.basics.tsv` and `title.ratings.tsv` &mdash; from [here](https://drive.google.com/file/d/1-QUmR83BlG-ZXXnFMrudN_8DccUjaI2i/view).

If you want to check the status of the MySQL db while the application is runnning, you can establish a connection to http://localhost:3306 with `user=root` and `password=root`.


## STARTUP

The application is started by the [docker-compose.yaml](docker-remote/docker-compose.yaml) file. You can download the file and put it in an empty folder, then access that folder in your command line and run

```
docker compose up
```

Docker Compose will pull 4 images. The database image is particularly heavy since it contains all the IMDb data (around 5GB), but you will delete it after testing the application.

After the download, Docker Compose will start the services, and you will see some logs in your command line.
Wait for these logs to appear:

```
Started ImdbApplication in ... seconds
Completed initialization in ... ms 
```
![alt text](/screenshots/startup-logs.png)

Once the logs appear, you can connect to http://localhost:3000/ from your browser and visit the application.


## FUNCTIONALITY

Once you land on the application on a desktop device, after the first data fetching, the app should look like this

![alt text](/screenshots/desktop-first-rendering.png)

On the left, search filters can be expanded on click. To trigger the search, you just need to type something into the inputs and then press `Enter` or click somewhere else on the page.

N.B. The Genre filter is the slowest one, if you combine it with other filters it might take a long time to load 
(currently the application is performing a full text search on a field where all genre values are combined into a blank space separated string - this will be improved in the future). 
All other filters should take from a very short to a reasonable amount of time, but it also depends on the PC on which you are testing the app.

To sort results, you can use the select input at the top right corner

![alt text](/screenshots/sorting.png)

The double-arrow icon allows you to invert the order direction (but obviously only after selecting a value from the select).
Null values are always handled as last, so that in both ascending and descending order you will be immediately shown non-null values.

N.B. The sorting is reinitialized every time you change your search filters, as it wouldn't make sense to keep the old sorting for a new search. 
So, if you want to test the sorting with some search filters, apply the filters first and then select the sorting.

To rapidly check what search criteria are being applied, you can look up the filter chips at the top of the page

![alt text](/screenshots/filter-chips-position.png)

The chips show every active search field and its value in the format `${field}: ${value}`.

![alt text](/screenshots/filter-chips.png)

You can click on the `X` icon on a specific filter chip to delete that filter while keeping the others - this will immediately trigger a new search with the remaining filters.

Since the DB contains more than 11 million movies, the search is paginated and returns 5 results at a time. 
To retrieve the next 5 results, you can click on the `LOAD MORE` button at the bottom of the result list. 

![alt text](/screenshots/load-more.png)

Obviously, this option is not available when the application is already showing all the results for the active filters. 
You can check if this is the case in the result count, where you can see the number of results shown and the total number of results available for the active search criteria.

![alt text](/screenshots/result-count.png)

Finally, if you hover over the movie title, it will be highlighted. If you click on it, a new browser tab will open on the IMDb page of that movie.

![alt text](/screenshots/imdb-link.png)


## MOVIE POSTERS
Movie posters are retrieved through web scraping. The IMDb page of the movie is scraped to get the image url.
Since the call is asynchronous, results will initially be rendered with a placeholder image, which will be later replaced by the movie poster.

Before retrieving the images:

![alt text](/screenshots/posters-before.png)

After retrieving the images (as you can see, the placeholder image will be kept for those movies for which IMDb
provides no poster at all. F.ex. the one in the screenshot, [Who's He Anyway](https://www.imdb.com/title/tt0448176/?ref_=sr_t_1)):

![alt text](/screenshots/posters-after.png)


## RESPONSIVE DESIGN

For smaller screens, i.e. under 1024 pixels of width, the app design changes.

Search filters appear on top of the list of results.

![alt text](/screenshots/tablet-first-rendering.png)

If you expand the search filters, you will notice that the inputs do not take the full width of their parent container, unlike in the computer version.

![alt text](/screenshots/tablet-filters.png)

Moreover, you can see 2 additional differences from the computer version:

1) Search filters are static and do not follow the viewport (i.e. they are left outside the window upper boundary as you scroll down).
This decision was due to the fact that, if filters had followed the viewport, they would have covered the underlying search results.

2) Results can now be scrolled without scrolling the overall page at the same time. Indeed, the height of the results container is fixed.
This is useful because, since filters are fixed at the top of the page, they can be reached quickly even when loading several results.

![alt text](/screenshots/tablet-responsive-design.gif)


## SHUTDOWN

Once you're done with testing, you can shut down the application by hitting `CTRL+C` in the command line where you started it. After that, don't forget to also submit the following command
```
docker compose down --volumes
```
As this will delete the containers and the attached docker volumes.

Finally, delete the images with
```
docker rmi stefanomontr/imdb-mysql:0.0.2 \
  stefanomontr/imdb-backend:0.0.3 \
  stefanomontr/imdb-frontend:0.0.4 \
  browserless/chrome:latest
```


## SOURCE CODE (TECHNICAL)

You can find the entire source code (db, backend, frontend) on my GitHub repository https://github.com/stefanomontr/imdb. 
If you want to build the images locally, you can clone the repo and use the [docker-compose.yaml](/docker-compose.yaml) file for local builds.

Before building them, you should download and add the source files to the project. You can either use up-to-date data or the old data I used to build the DB image.
To use up-to-date data, download `title.basics.tsv` and `title.ratings.tsv` from [IMDb datasets](https://datasets.imdbws.com/) and copy them into the **/database/data-source** folder.
To use the old data, download this [zip file](https://drive.google.com/file/d/1-QUmR83BlG-ZXXnFMrudN_8DccUjaI2i/view) and extract it into the **/database/data-source** folder.

You can find some frontend tests [here](/frontend/src/test).

To manage the server state (i.e. data retrieved from a backend server / db) I used the third party library [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview). 
Specifically, I used their [useInfiniteQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery) hook to implement pagination. 
This provides my application with some nice features like request caching &mdash; search results are cached for every combination of search filters. 
Thus, even if a search takes very long to be performed, the next time those same search criteria are inputted, the results will immediately be rendered from the cache. 
Under the hood, though, TanStack Query will request the data again and compare them with the cached data to silently update the UI, resulting in a seamless experience for the user. 
Obviously, since the application does not write any new data to the DB, the comparison should never result in an actual UI update, 
but nonetheless this ensures that cached data correctly reflects the DB status.
