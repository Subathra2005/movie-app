import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const [movie, setMovie] = useState({
    movieName: "",
    releaseYr: "",
    genre: "",
    watched: "",
  });
  const [fetchedMovie, setFetchedMovie] = useState([]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/home");
      setFetchedMovie(res.data);
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const checkName = async () => {
    try {
      const name = await axios.get(
        `http://localhost:5001/api/home/movieName?movieName=${movie.movieName}`
      );
      if (name.data.success) {
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error: ", err);
      alert("Movie already exists");
    }
  };

  const watchedStatus = async () => {
    try {
      const watch = await axios.get(`http://localhost:5001/api/home/watched`);
      if (watch.data.success) {
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error: ", err);
      alert("Already there are 5 movies in watched status");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let statusWatch = true;
    if (movie.watched === "Yes") {
      statusWatch = await watchedStatus();
    }
    if ((await checkName()) && statusWatch) {
      try {
        const res = await axios.post("http://localhost:5001/api/home", movie);
        if (res.data.success) {
          alert("Added successfully");
          setMovie({
            movieName: "",
            releaseYr: "",
            genre: "",
            watched: "",
          });
          fetchMovie();
        }
      } catch (err) {
        alert("Couldn't add movie");
        console.error("Error: ", err);
      }
    }
  };


  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <div className='border shadow rounded bg-light p-4'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="me-3">Name of the movie</label>
          <input
            type="text"
            value={movie.movieName}
            onChange={(e) => setMovie({ ...movie, movieName: e.target.value })}
            placeholder="Enter movie name"
          />
        </div>
        <br />
        <div>
          <label className="me-3">Release Year</label>
          <input
            type="date"
            value={movie.releaseYr}
            onChange={(e) => setMovie({ ...movie, releaseYr: e.target.value })}
            placeholder="Choose release year"
          />
        </div>
        <br />
        <div>
          <label className="me-3">Genre</label>
          <select
            type="dropdown"
            value={movie.genre}
            onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
            placeholder="Choose genre"
          >
            <option value="">Choose one</option>
            <option value="Comedy">Comedy</option>
            <option value="Ation">Action</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
        <br />
        <div>
          <label className="me-3">Watched ? </label>
          <select
            type="dropdown"
            value={movie.watched}
            onChange={(e) => setMovie({ ...movie, watched: e.target.value })}
            placeholder="Choose watched status"
          >
            <option value="">Choose one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <br />
        <button type="submit">Add Movie</button>
      </form>
      </div>
      <br />
      <h4>Movies</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Movie Name</th>
            <th>Release Year</th>
            <th>Genre</th>
            <th>Watched ?</th>
          </tr>
        </thead>
        <tbody>
          {fetchedMovie.length > 0 ? (
            fetchedMovie.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.movieName}</td>
                <td>{movie.releaseYr}</td>
                <td>{movie.genre}</td>
                <td>{movie.watched}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4"> No movies available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
