import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
} from "../../redux/slices/filterSlice";
import {
  selectBooks,
  deleteBook,
  toggleFavorite,
} from "../../redux/slices/booksSlice";

function BookList() {
  const books = useSelector(selectBooks);

  const dispatch = useDispatch();

  function handleDeleteBook(id) {
    dispatch(deleteBook(id));
  }

  function handleToggleFavorite(id) {
    dispatch(toggleFavorite(id));
  }

  const filterTitleLowerText =
    useSelector(selectTitleFilter).toLocaleLowerCase();

  const filterAuthorLowerText =
    useSelector(selectAuthorFilter).toLocaleLowerCase();

  const onlyFavorite = useSelector(selectOnlyFavorite);

  const filtedBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLocaleLowerCase()
      .includes(filterTitleLowerText);

    const matchesAuthor = book.author
      .toLocaleLowerCase()
      .includes(filterAuthorLowerText);

    const matchesOnlyFavorite = onlyFavorite ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesOnlyFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLocaleLowerCase() === filter) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }

      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {filtedBooks.length === 0 ? (
        <p>no books</p>
      ) : (
        <ul>
          {filtedBooks.map((book) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {highlightMatch(book.title, filterTitleLowerText)}{" "}
                  <strong>
                    {highlightMatch(book.author, filterAuthorLowerText)}
                  </strong>{" "}
                  ({book.sourse})
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavorite(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>
                  <button onClick={() => handleDeleteBook(book.id)}>
                    delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default BookList;
