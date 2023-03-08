function App() {

    //set state variables for movies, favorites, and input.
    const [movies, setMovies] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [input, setInput] = React.useState('');


    //function that calls the api using the input variable as the search.
    const fetchMovies = async (input) => {
        const url = `https://www.omdbapi.com/?s=${input}&apikey=86194efd`;
        const response = await fetch(url);
        const responseJson = await response.json(); //convert to JSON

        //only set the movies variable to wresponseJSON if the responseJSON.search is not null
        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };


    //useEffect hook to call the API when the input changes.
    React.useEffect(() => {
        fetchMovies(input);
    }, [input]);

    //useEffect hook to use local storage
    //React.useEffect(() => {
        //const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-storage'));
        //setFavorites(movieFavorites);
    //}, [])

    //function to save items to local storage
    //const saveToLocalStorage = (items) => {
        //localStorage.setItem('react-movie-app-storage', JSON.stringify(items));
    //}

    //function to add a movie to favorites list
    const addFavoriteMovie = (movie) => {
        const isMovieInFavorites = favorites.some((favorite) => favorite.imdbID === movie.imdbID);

        if (!isMovieInFavorites) {
            const newFavoriteList = [...favorites, movie];
            setFavorites(newFavoriteList);
            //saveToLocalStorage(newFavoriteList);
        };
    }

    //function to remove a movie from favorites
    const removeFavorites = (movie) => {
        const newFavoriteList = favorites.filter((favorite) => favorite.imdbID != movie.imdbID);
        setFavorites(newFavoriteList);
        //saveToLocalStorage(newFavoriteList);
    }

    return (
        <div>
            <Navbar />
            <Showcase input={input} setInput={setInput} />
            <div className='container-fluid movie-app'>
                <div className='text-center py-4'>
                    <GalleryTitle />
                </div>
                <div className='movie-list'>
                    <MovieList movies={movies} handleFavoritesClick={addFavoriteMovie} favComponent={AddToFavorites} />
                </div>
                <div className='container-fluid top'>
                    <FavoritesHeader />
                </div>
                <div className='movie-list'>
                    <MovieList movies={favorites} handleFavoritesClick={removeFavorites} favComponent={RemoveFavorites} />
                </div>
            </div>
        </div>
    )
}


function MovieList({ movies, favComponent, handleFavoritesClick }) {

    const FavoriteComponent = favComponent;
    return (
        <>
            {movies.map((movie, index) => {
                return <div key={index} className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster}></img>
                    <div onClick={() => handleFavoritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavoriteComponent />
                    </div>
                </div>
            })}
        </>
    )
}

function Navbar() {
    return (
        <nav className='navbar navbar-expand-lg bg-dark navbar-dark py-4 fixed-top w-100'>
            <div className="container navbar-container">
                <a href='#Showcase' className='navbar-brand brand text-danger'>Movie App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id="navmenu">
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item px-3'>
                            <a href='#Movies' className='nav-link text-danger'>Movies</a>
                        </li>
                        <li className='nav-item px-3'>
                            <a href='#Favorites' className='nav-link text-danger'>Favorites</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

function Showcase({input, setInput}) {
    return (
        <section id='Showcase' className="bg-dark text-light p-5 text-center text-sm-start">
            <div className=" py-5">
                <div className="d-sm-flex align-items-center justify-content-between">
                    <img className='img-fluid w-50 d-none d-sm-block pt-4' src="movie.svg" alt="movie" />
                    <div>
                        <div>
                            <h1 className='text-danger'>Movie Search App</h1>
                        </div>
                        <div>
                            <p className="lead my-5">Find your next movie obsession with my movie search app. Start typing and watch your favorite movies populate in the movie gallery, powered by the IMDB API.</p>
                            <div>
                                <input className='barrio' type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type to search...' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function MoviesHeader() {
    return (
        <div id='Movies' className='pt-2'>
            <h1>Movies</h1>
        </div>
    )
}

function AddToFavorites() {
    return (
        <>
            <span className='mr-2'>Add To Fav</span>
            <i className='fas fa-heart'></i>
        </>
    )
}

function RemoveFavorites() {
    return (
        <>
            <span className='mr-2'>Remove Fav</span>
            <i className='fas fa-trash'></i>
        </>
    )
}

function FavoritesHeader() {
    return (
        <div id='Favorites'>
            <h1>Favorites</h1>
        </div>
    )
}

function GalleryTitle() {
    return (
        <div>
            <h1>Movie Gallery</h1>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
