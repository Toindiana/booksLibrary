import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { setError } from "./errorSlice";

const initialState = {
  books: [],
  isLoading: false,
};

export const randomBookApi = createAsyncThunk(
  "books/randomBookApi",
  async (url, thunkAPI) => {
    try {
      const response = await axios.get(url);
      const book = {
        title: response.data.title,
        author: response.data.author,
        id: uuidv4(),
        isFavorite: false,
        sourse: "API",
      };
      return book;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));

      //oprion 1
      // throw error;

      //option 2
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSclice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addNewBook: (state, action) => {
      state.books.push(action.payload);
    },

    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },

    toggleFavorite: (state, action) => {
      const newBooks = state.books.map((book) => {
        if (book.id === action.payload) {
          return { ...book, isFavorite: !book.isFavorite };
        } else {
          return book;
        }
      });

      return {
        books: newBooks,
        isLoading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(randomBookApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(randomBookApi.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.books.push(actions.payload);
    });
    builder.addCase(randomBookApi.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { addNewBook, deleteBook, toggleFavorite } = booksSclice.actions;

export const selectBooks = (state) => state.books.books;

export const selectIsLoading = (state) => state.books.isLoading;

export default booksSclice.reducer;
