export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <img src={movie.image} />
                <h1>Title: {movie.title}</h1>
                <h3>Release Year: {movie.releaseYear}, Rated: {movie.rating}, Runtime: {movie.runtime}</h3>
                <h3>Genres: {movie.genres}</h3>
                <h2>Director: {movie.director}</h2>
                <h2>Starring: {movie.actors}</h2>
                <h4 style={{ maxWidth: '700px', margin: 'auto' }}>{movie.description}</h4>
                <h4>    </h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={onBackClick}
                    style={{
                        width: '100px',  
                        height: '50px',  
                        fontSize: '30px'  
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
};