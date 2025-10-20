import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";

const BookManagement = () => {

  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  const {
    loading: borrowSliceLoading,
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
  }, [dispatch, error, message, loading, borrowSliceError, borrowSliceLoading, borrowSliceMessage]);


  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const searchedBooks = books && books.filter((book) => {
    return book.title.toLowerCase().includes(searchedKeyword) || book.author.toLowerCase().includes(searchedKeyword)
  })

  return <>
    <main className="relative flex-1 p-6 pt-28">
      <Header />

      {/* sub header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
          {user && user.role === "Admin" ? "Book Management" : "Books"}
        </h2>
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {
            isAuthenticated && user.role === "Admin" && (
              <button onClick={() => dispatch(toggleAddBookPopup())}
                className="relative pl-14 w-full sm:w-52 gap-4 justify-center items-center flex py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
              >
                <span className="bg-white flex justify-center items-center overflow-hidden rounded-full text-black w-[25px] h-[25px] text-[27px] absolute left-5 ">+</span>
                Add New Book
              </button>
            )
          }
          <input type="text"
            placeholder="Search Book..."
            className="w-full sm:w-52  border border-gray-300 p-2 rounded-md"
            value={searchedKeyword}
            onChange={handleSearch}
          />
        </div>
      </header>

      {/* table */}
      {
        books && books.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Author</th>
                  {
                    isAuthenticated && user?.role === "Admin" && (
                      <th className="py-2 px-4 text-left">Quantity</th>
                    )
                  }
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Availability</th>
                  {
                    isAuthenticated && user?.role === "Admin" && (
                      <th className="py-2 px-4 text-center ">Record Book</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {
                  searchedBooks.map((book, index) => (
                    <tr key={book._id} className={(index + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{book.title}</td>
                      <td className="py-2 px-4">{book.author}</td>
                      {
                        isAuthenticated && user?.role === "Admin" && (
                          <td className="py-2 px-4">{book.quantity}</td>
                        )
                      }
                      <td className="py-2 px-4">₹{book.price}</td>
                      <td className="py-2 px-4">
                        {book.availability ? (
                          <span className="text-green-600 font-medium">Available</span>
                        ) : (
                          <span className="text-red-600 font-medium">Not Available</span>
                        )}
                      </td>
                      {
                        isAuthenticated && user?.role === "Admin" && (
                          <td className="py-2 px-4 flex space-x-2 my-3 justify-center">
                            <BookA onClick={() => openReadPopup(book._id)} className="cursor-pointer"/>
                            <NotebookPen onClick={() => openRecordBookPopup(book._id)} className="cursor-pointer" />
                          </td>
                        )
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">No books available.</h3>
        )
      }
    </main>

    {addBookPopup && <AddBookPopup /> }
    {readBookPopup && <ReadBookPopup book={readBook} /> }
    {recordBookPopup && <RecordBookPopup bookId={borrowBookId} /> }
  </>;
};

export default BookManagement;
