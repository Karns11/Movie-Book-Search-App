function App() {

    const [input, setInput] = React.useState('');
    const [books, setBooks] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);


    const fetchBooksOnKeyPress = (evt) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyBvNUD2bF0TLOLJzv1VQCEy0FesTF0akKA`).then(res=>setBooks(res.data.items)).catch(err=>console.log(err));
        }
    };

    const fetchBooksOnClick = (evt) => {
        evt.preventDefault();
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyBvNUD2bF0TLOLJzv1VQCEy0FesTF0akKA`).then(res=>setBooks(res.data.items)).catch(err=>console.log(err));
    };

    //React.useEffect(() => {
        //const bookFavorites = JSON.parse(localStorage.getItem('react-book-app-storage'));
        //setFavorites(bookFavorites);
    //}, []);

    //const saveToLocalStorage = (items) => {
        //localStorage.setItem('react-book-app-storage', JSON.stringify(items));
    //};

    const addFavoriteBook = (book) => {
        const isBookInFavorites = favorites.some((favorite) => favorite.id === book.id);

        if (!isBookInFavorites) {
            const newFavoriteList = [...favorites, book];
            setFavorites(newFavoriteList);
            //saveToLocalStorage(newFavoriteList);
        };
    };

    const removeFavoriteBook = (book) => {
        const newFavoriteList = favorites.filter((favorite) => favorite.id != book.id);
        setFavorites(newFavoriteList);
        //saveToLocalStorage(newFavoriteList);
    };

    return (
        <div>
            <Navbar input={input} setInput={setInput} fetchBooksOnKeyPress={fetchBooksOnKeyPress} fetchBooksOnClick={fetchBooksOnClick} />
            <div id='Home'>
            <Showcase />
            </div>
            <div className='book-app'>
                <h1 className='text-center py-3'><strong class="font-weight-bold text-primary">Book Gallery</strong></h1>
                <div id='Books' className='book-list'>
                    <BooksList books={books} favcomponent={AddToFavorites} handlefavoritesClick={addFavoriteBook} />
                </div>
                <h1 className='py-2 px-3'><strong class="font-weight-bold text-primary">Favorites</strong></h1>
                <div id='Favorites' className='book-list'>
                    <BooksList books={favorites} favcomponent={RemoveFromFavorites} handlefavoritesClick={removeFavoriteBook} />
                </div>
            </div>
        </div>
    )
}

function Navbar({ input, setInput, fetchBooksOnKeyPress, fetchBooksOnClick }) {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                  <div className="container">
                    <a className="navbar-brand" href="#">Book Search App</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="#" aria-current="page">Home<span class="visually-hidden">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Book Gallery</a>
                                <div className="dropdown-menu" aria-labelledby="dropdownId">
                                    <a className="dropdown-item" href="#Books">Books</a>
                                    <a className="dropdown-item" href="#Favorites">Favorites</a>
                                </div>
                            </li>
                        </ul>
                        <form class="d-flex my-2 my-lg-0">
                            <input className="form-control me-sm-2" type="text" placeholder="Type to search..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={fetchBooksOnKeyPress} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={fetchBooksOnClick}>Search</button>
                        </form>
                    </div>
              </div>
            </nav>
            
        </div>
    )
}

function Showcase() {
    return (
        <section id='Showcase' className="bg-dark text-light p-5 text-center text-sm-start">
            <div className=" py-3">
                <div className="d-sm-flex align-items-center justify-content-between">
                    <div>
                        <div>
                            <h1 className='text-warning text-center'>Book Search App</h1>
                        </div>
                        <div>
                            <p className="lead my-5 text-center px-3">Welcome to my book search app! Discover your next literary obsession by browsing our extensive collection of books, powered by the Google Books API. Simply search and watch as relevant book titles populate in the search gallery. Thank you for choosing my platform to feed your reading appetite.</p>
                        </div>
                    </div>
                    <img className='img-fluid w-50 d-none d-sm-block pt-4 book-img' src="book.svg" alt="book" />
                </div>
            </div>
        </section>
    )
}

function BooksList({ books, favcomponent, handlefavoritesClick }) {

    const FavoriteComponent = favcomponent;

    return (
        <>
            {books.map((book, index) => {
                let thumbnail = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
                return (
                    <div key={index} className='image-container d-flex justify-content-start m-3'>
                        <img className='nail' src={thumbnail} />
                        <div onClick={() => handlefavoritesClick(book)} className='overlay d-flex align-items-center justify-content-space-center'>
                            <FavoriteComponent />
                        </div>
                    </div>
                )
            })}
        </>
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

function RemoveFromFavorites() {
    return (
        <>
            <span className='mr-2'>Remove Fav</span>
            <i className='fas fa-trash'></i>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));