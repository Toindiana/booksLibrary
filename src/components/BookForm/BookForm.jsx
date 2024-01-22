import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FaSpinner } from "react-icons/fa";
import "./BookForm.css";
import booksData from "../../data/books.json";
import { getRandomNumber } from "../../functions/getRandom";
import {
  addNewBook,
  randomBookApi,
  selectIsLoading,
} from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (author && title) {
      const book = {
        title,
        author,
        id: uuidv4(),
        isFavorite: false,
        sourse: "my-book",
      };
      dispatch(addNewBook(book));
    } else {
      dispatch(setError("You must fill title and author "));
    }

    setTitle("");
    setAuthor("");
  }

  function handleRandomBook() {
    const randomNum = getRandomNumber(booksData.length);

    const book = {
      ...booksData[randomNum],
      id: uuidv4(),
      isFavorite: false,
      sourse: "random",
    };

    dispatch(addNewBook(book));
  }

  const handleRandomBookAPI = () => {
    dispatch(randomBookApi("http://yakovenko-aleksandr.ru/randomBook.php"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <button type="submit">Add book</button>
        <button
          type="button"
          onClick={() => {
            handleRandomBook();
          }}
        >
          Add random
        </button>
        <button
          type="button"
          onClick={handleRandomBookAPI}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add random API"
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
