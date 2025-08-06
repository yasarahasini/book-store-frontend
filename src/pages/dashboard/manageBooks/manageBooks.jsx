import React from 'react'
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageBooks = () => {
    const navigate = useNavigate();

    const {data: books, refetch} = useFetchAllBooksQuery()

    const [deleteBook] = useDeleteBookMutation()

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();

        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`);
    };
  return (
    <section className="py-1 bg-blueGray-50">
    <div className="w-full px-4 mx-auto mt-24 mb-12 xl:w-8/12 xl:mb-0">
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg ">
            <div className="px-4 py-3 mb-0 border-0 rounded-t">
                <div className="flex flex-wrap items-center">
                    <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                        <h3 className="text-base font-semibold text-blueGray-700">All Books</h3>
                    </div>
                    <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                        <button className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none" type="button">See all</button>
                    </div>
                </div>
            </div>

            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse ">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                                #
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                                Book Title
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                                Category
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                                Price
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            books && books.map((book, index) => (
                                <tr key={index}>
                                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap text-blueGray-700 ">
                                   {index + 1}
                                </th>
                                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap ">
                                    {book.title}
                                </td>
                                <td className="p-4 px-6 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap">
                                  {book.category}
                                </td>
                                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">

                                    ${book.newPrice}
                                </td>
                                <td className="p-4 px-6 space-x-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">

                                    <Link to={`/dashboard/edit-book/${book._id}`} className="mr-2 font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2">
                                        Edit
                                    </Link>
                                    <button 
                                    onClick={() => handleDeleteBook(book._id)}
                                    className="px-4 py-1 mr-2 font-medium text-white bg-red-500 rounded-full">Delete</button>
                                </td>
                            </tr> 
                            ))
                        }
         

                    </tbody>

                </table>
            </div>
        </div>
    </div>

</section>
  )
}

export default ManageBooks