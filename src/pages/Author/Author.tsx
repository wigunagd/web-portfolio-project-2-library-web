import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "react-router-dom";
import { useGetAuthorBooksData, useGetAuthorData } from "./hooksAuthor";
import AuthorList from "@/components/AuthorList";
import { AuthorSkeleton } from "@/components/AuthorSkeleton";
import { BookSkeleton } from "@/components/BookSkeleton";
import BookItemList from "@/components/BookItemList";
import type { Book } from "../pagetype/bookType";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const Author = () => {

    const [srcParam] = useSearchParams();
    const id = Number(srcParam.get('id'));

    const { data: dataAuthor, isLoading: isLoadingAuthor } = useGetAuthorData({ id: id, page: 1, limit: 1 });

    const {
        data: dataAuthorBook,
        isLoading: isLoadingAuthorBook,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetAuthorBooksData({ id: id, page: 1, limit: 5 });

    console.log(dataAuthorBook);


    return (
        <>
            <Navbar />

            <main className="relative pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-10 md:gap-12 grid mb-5">

                {isLoadingAuthor && (<AuthorSkeleton />)}

                {!isLoadingAuthor && dataAuthor?.author && (
                    <AuthorList className="w-full" a={{
                        id: dataAuthor.author.id,
                        name: dataAuthor.author.name,
                        bookCount: dataAuthor.bookCount
                    }} />
                )}

                <section id="book-section" className="flex flex-col md:flex gap-8 w-full md:max-w-219.75">
                    <h1 className="text-display-xs md:text-display-lg font-bold">Book List</h1>

                    <div className="grid grid-cols-2 md:flex md:flex-wrap w-full gap-5">

                        {isLoadingAuthorBook && (
                            <>
                                <BookSkeleton />
                                <BookSkeleton />
                                <BookSkeleton />
                                <BookSkeleton />
                            </>
                        )}

                        {!isLoadingAuthorBook && (
                            <>
                                {
                                    dataAuthorBook?.pages.map(page => {
                                        return page.books.map((books: Book) => {
                                            return (
                                                <BookItemList className="md:max-w-56" books={books} />
                                            )
                                        })
                                    })
                                }
                            </>
                        )}

                    </div>

                    {hasNextPage && (
                        <Button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            variant={'outline'}
                            className="rounded-full mx-auto w-full h-12 max-w-37.5 md:max-w-50 text-sm md:text-md font-bold">
                            {isFetchingNextPage && (<Spinner />)} Load More
                        </Button>
                    )}

                </section>

            </main>

            <Footer className="mb-18 md:mb-0 mt-10 md:mt-29.5" />
        </>
    )
}

export default Author;