import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const MovieCard = ({ user: initialUser, movie, onUserUpdate }) => {
   const [localUser, setLocalUser] = useState(initialUser);
   const isFavorite = (movieTitle) => localUser.favorite_movies.includes(movieTitle);  // Check if the movie is already in the favorites
   const navigate = useNavigate();
   const handleCardClick = () => navigate(`/movies/${encodeURIComponent(movie.id)}`);

   const handleAddToFavoritesClick = (e) => {
      e.stopPropagation(); // Prevent the click from triggering the card's onClick
      addToFavorites();
   };

   const addToFavorites = async () => {
      if (!isFavorite(movie.title)) {
         try {
            const response = await axios.post(
               `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localUser.username}/movies/${movie.title}`,
               {},
               { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            const updatedUser = response.data;
            setLocalUser(updatedUser);  // Update local user state with data retuned confirming post operation
            onUserUpdate(updatedUser);  // Update the user state in MainView with data returned confirming post operation
            alert("Movie added to favorites!");

         } catch (error) {
            console.error("Error adding movie to favorites:", error);
         }
      }
   };

   return (
      <Card style={{ cursor: "pointer" }} className="h-100" onClick={handleCardClick}>
         <Card.Img variant="top" src={movie.image} style={{ width: "100%", height: '300px', objectFit: 'contain' }} />
         <Card.Body className="flex-grow-1">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text style={{ whiteSpace: 'pre' }}>{movie.releaseYear}        {movie.rating}</Card.Text>
            <Card.Text >{movie.director}</Card.Text>
         </Card.Body>
         <Button className="m-3" onClick={handleAddToFavoritesClick}>{isFavorite(movie.title) ? "Already in Favorites" : "Add to Favorites"}</Button>
      </Card>
   );
};

MovieCard.propTypes = {
   movie: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      releaseYear: PropTypes.string,
      rating: PropTypes.string,
      director: PropTypes.string.isRequired,
   }).isRequired,
};
