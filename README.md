# React Native Movie App using Movie Database API

This project demonstrates how to build a **Movie App** using **React Native** and **The Movie Database (TMDb) API** to fetch and display movie data such as popular movies, top-rated movies, and movie details.

## 🚀 Features

* Display popular and top-rated movies
* Search movies by name
* View detailed movie information (title, synopsis, release date, rating, poster)
* Responsive UI for both Android and iOS
* Uses TMDb API


## 🧩 Technologies Used

* React Native
* TypeScript
* Fetch API
* The Movie Database (TMDb) API
* React Navigation
* Expo

## 🔑 Getting an API Key

1. Go to [TMDb website](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to **API** section
4. Generate your API key

## ⚙️ API Endpoints Used

* **Popular Movies:**  `https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=en-US&page=1`
* **Top Rated Movies:** `https://api.themoviedb.org/3/movie/top_rated?api_key={API_KEY}&language=en-US&page=1`
* **Search Movies:** `https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={MOVIE_NAME}`
* **Movie Details:** `https://api.themoviedb.org/3/movie/{MOVIE_ID}?api_key={API_KEY}&language=en-US`

## ❗ Common Errors

| Error | Reason            |
| ----- | ----------------- |
| 401   | Invalid API Key   |
| 404   | Movie not found   |
| 429   | Too many requests |
