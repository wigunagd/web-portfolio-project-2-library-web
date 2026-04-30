import { icBook, icSearch } from "@/assets/asset";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BookListItemAdmin from "./BookListItemAdmin";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteBookAdmin, useGetBookListAdmin } from "./hooksBookListAdmin";
import type { BookListAdminType, DeleteBookResponse } from "./bookListAdminType";

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog"
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface pageProps {
    className?: string;
}

const BookListAdmin = ({ className }: pageProps) => {

    const [statusBorrow, setStatusBorrow] = useState('all');
    const [txtBorrowSearch, setTxtBorrowSearch] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [idDelete, setIdDelete] = useState<number | null>();
    const [errReview, setErrReview] = useState("");

    const { mutate: mutateDeleteBookAdmin, isPending: isPendingDeleteBookAdmin } = useDeleteBookAdmin();

    const handleBtnStatusBorrow = (sttsBorrow: string) => {
        setStatusBorrow(sttsBorrow);
    }

    const sttsBorrow = [
        {
            txt: 'All',
            sttsBorrow: 'all'
        },
        {
            txt: 'Available',
            sttsBorrow: 'available'
        },
        {
            txt: 'Borrowed',
            sttsBorrow: 'borrowed'
        },
        {
            txt: 'Returned',
            sttsBorrow: 'returned'
        },
    ];

    const handleTxtSearch = (text: string) => {
        setTxtBorrowSearch(text);
    }

    const {
        data: dataBookListAdmin,
        isLoading: isLoadingBookListAdmin,
        isFetchingNextPage: isFetchingNextPageBookListAdmin,
        fetchNextPage: fetchNextPageBookListAdmin,
        hasNextPage: hasNextPageBookListAdmin
    } = useGetBookListAdmin({ q: txtBorrowSearch, status: statusBorrow, page: 1, limit: 20 });

    const handleSelectDelete = (id: number) => {
        setIdDelete(id);
        setIsDialogOpen(true);
        setErrReview('');
    }

    const handleClose = () => {
        setIdDelete(null);
        setIsDialogOpen(false);
    }

    const handleDoDelete = () => {
        setErrReview('');

        if (idDelete) {
            mutateDeleteBookAdmin(idDelete, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setIdDelete(null);
                    setIsDialogOpen(false);
                    toast('Buku dihapus');
                },
                onError: (e) => {
                    const error = e as AxiosError<DeleteBookResponse>;
                    const errorMessage = error.response?.data.message ?? "An unexpected error occurred";
                    setErrReview(errorMessage);
                }
            })
        } else {
            setErrReview('Pilih buku yang akan dihapus.')
        }
    }

    return (
        <div className={`flex flex-col w-full mx-auto gap-6 ${className}`}>
            <h1 className="text-left font-bold text-display-xs md:text-display-sm">Book List</h1>

            <Button className="w-full md:max-w-60 rounded-full h-12">Add Book</Button>

            <div id="searchbarloan" className="flex px-4 py-2 gap-1.5 border md:max-w-138.5 rounded-full items-center">
                <img src={icSearch} className="w-5 h-5 shrink-0" />
                <input
                    id="search"
                    name="search"
                    value={txtBorrowSearch}
                    onChange={(e) => handleTxtSearch(e.target.value)}
                    className="h-7 w-full outline-none bg-transparent"
                    placeholder="Search Book" />
            </div>

            <div className="flex gap-3">
                {
                    sttsBorrow.map(stts => (
                        <Button onClick={() => handleBtnStatusBorrow(stts.sttsBorrow)}
                            variant={'ghost2'}
                            className={`${statusBorrow === stts.sttsBorrow && 'bg-primary-300/25 border-primary-300'} border rounded-full`}>{stts.txt}</Button>
                    ))
                }
            </div>

            <div className="flex flex-col gap-4">

                {!isLoadingBookListAdmin && (
                    <>
                        {
                            dataBookListAdmin?.pages.map(page => {
                                return page.data.books.map((book: BookListAdminType) => {
                                    return (
                                        <BookListItemAdmin
                                            key={book.id}
                                            id={book.id}
                                            title={book.title}
                                            category={book.category.name}
                                            author={book.author.name}
                                            coverImage={book.coverImage ?? icBook}
                                            rating={book.rating}
                                            onClickDelete={() => handleSelectDelete(book.id)}
                                        />
                                    )
                                })
                            })
                        }
                    </>
                )}

                {hasNextPageBookListAdmin && (
                    <Button
                        onClick={() => fetchNextPageBookListAdmin()}
                        disabled={isFetchingNextPageBookListAdmin}
                        variant={'outline'}
                        className="rounded-full mx-auto w-full h-12 max-w-37.5 md:max-w-50 text-sm md:text-md font-bold">
                        {isFetchingNextPageBookListAdmin && (<Spinner />)} Load More
                    </Button>
                )}
            </div>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent showCloseButton={false} className="w-full md:max-w-113 gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="font-bold md:text-lg text-md">Delete Data</div>
                        <div className="text-sm md:text-md">
                            Once deleted, you won't be able to recover this data.
                        </div>
                    </div>
                    {
                        errReview.length > 0 &&
                        (
                            <div className="text-accent-red">{errReview}</div>
                        )
                    }
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            disabled={isPendingDeleteBookAdmin}
                            onClick={handleClose}
                            variant={'outline'}
                            className="rounded-full h-11 p-2 font-bold text-sm md:text-md">Cancel</Button>
                        <Button
                            disabled={isPendingDeleteBookAdmin}
                            onClick={handleDoDelete}
                            variant={'outline'}
                            className="rounded-full h-11 p-2 font-bold text-sm md:text-md text-white bg-accent-red">{isPendingDeleteBookAdmin && (<Spinner />) } Confirm</Button>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default BookListAdmin;