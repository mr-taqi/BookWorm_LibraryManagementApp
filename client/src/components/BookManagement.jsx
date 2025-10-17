import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup, toggleRecordBookPopup } from "../store/slices/popupSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import Header from "../layout/Header";

const BookManagement = () => {

  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookkPopup } = useSelector((state) => state.popup);
  const {
    loading: borroeSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };


  const [borrowBookId, setborrowBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setborrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }

    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, message, loading, borrowSliceError, borroeSliceLoading, borrowSliceMessage]);


  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = books && books.filter((book) => {
    book.title.toLowerCase().includes(searchedKeyword) || book.author.toLowerCase().includes(searchedKeyword)
  })

  return <>
    <main className="relative flex-1 p-6 pt-28">
      <Header />
    </main>
  </>;
};

export default BookManagement;
