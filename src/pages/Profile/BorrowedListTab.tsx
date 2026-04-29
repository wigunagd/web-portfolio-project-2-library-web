import { icSearch, icStar, icStar0 } from "@/assets/asset";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetBorrowed } from "./hooksBorrowed";
import type { Loan } from "./borrowedType";
import { Spinner } from "@/components/ui/spinner";
import BorrowedListItem from "./BorrowedListItem";
import { useSendReview } from "./hooksReviews";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import type { AxiosError } from "axios";
import type { SaveReviewResponse } from "./reviewsType";


interface pageProps {
    className?: string;
}

const BorrowedListTab = ({ className }: pageProps) => {

    const [statusBorrow, setStatusBorrow] = useState('');
    const [txtBookSearch, setTxtBookSearch] = useState('');
    const [idBookToComment, setIdBookToComment] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [starRating, setStarRating] = useState(0);
    const [review, setReview] = useState("");
    const [errReview, setErrReview] = useState("");

    const { mutate: mutateReview, isPending: isPendingReview } = useSendReview();

    const handleBtnStatusBorrow = (sttsBorrow: string) => {
        setStatusBorrow(sttsBorrow);
    }

    const handleOpenComment = (id: number) => {
        setStarRating(0);
        setIdBookToComment(id);
        setIsDialogOpen(true);
        setReview('')
        setErrReview("");
    };

    const handleStar = (star: number) => {
        setStarRating(star);
    }

    const handleReview = (text: string) => {
        setReview(text);
    }

    const sttsBorrow = [
        {
            txt: 'All',
            sttsBorrow: ''
        },
        {
            txt: 'Active',
            sttsBorrow: 'active'
        },
        {
            txt: 'Returned',
            sttsBorrow: 'returned'
        },
        {
            txt: 'Overdue',
            sttsBorrow: 'overdue'
        },
    ];

    const starIcon = [1, 2, 3, 4, 5];

    const {
        data: dataBorrowed,
        isLoading: isLoadingBorrowed,
        isFetchingNextPage: isFetchingNextPageBorrowed,
        fetchNextPage: fetchNextPageBorrowed,
        hasNextPage: hasNextPageBorrowed
    } = useGetBorrowed({ page: 1, limit: 20 });

    const handleTxtSearch = (text: string) => {
        setTxtBookSearch(text);
    }

    const handleSendReview = () => {
        const isOKToPost = idBookToComment > 0 && starRating > 0 && review.length > 0;
        setErrReview('');

        if (isOKToPost) {
            mutateReview({
                bookId: idBookToComment,
                star: starRating,
                comment: review
            }, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setReview('');
                    setStarRating(0);
                },
                onError: (e) => {
                    const error = e as AxiosError<SaveReviewResponse>;
                    const errorMessage = error.response?.data.message ?? "An unexpected error occurred";
                    setErrReview(errorMessage);
                }
            })
        } else {
            setErrReview('Pilih rating dan tulis review anda.')
        }
    }

    return (
        <div className={`flex flex-col w-full mx-auto gap-6 ${className}`}>
            <h1 className="text-left font-bold text-display-xs md:text-display-sm">Borrowed List</h1>

            <div id="searchbarloan" className="flex px-4 py-2 gap-1.5 border md:max-w-138.5 rounded-full items-center">
                <img src={icSearch} className="w-5 h-5 shrink-0" />
                <input
                    id="search"
                    name="search"
                    value={txtBookSearch}
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

                {!isLoadingBorrowed && (
                    <>
                        {
                            dataBorrowed?.pages.map(page => {
                                return page.data.loans
                                    .filter((loan: Loan) => {
                                        const matchesStatus = statusBorrow === '' ||
                                            loan.status.toLowerCase() === statusBorrow.toLowerCase();

                                        const matchesSearch = txtBookSearch === '' ||
                                            loan.book.title.toLowerCase().includes(txtBookSearch.toLowerCase());

                                        return matchesStatus && matchesSearch;
                                    })
                                    .map((loan: Loan) => {
                                        return (
                                            <BorrowedListItem
                                                key={loan.id}
                                                title={loan.book.title}
                                                status={loan.status}
                                                coverImage={loan.book.coverImage}
                                                borrowedAt={loan.borrowedAt}
                                                dueAt={loan.dueAt}
                                                onCommentClick={() => handleOpenComment(loan.bookId)}
                                            />
                                        )
                                    })
                            })
                        }
                    </>
                )}

                {hasNextPageBorrowed && (
                    <Button
                        onClick={() => fetchNextPageBorrowed()}
                        disabled={isFetchingNextPageBorrowed}
                        variant={'outline'}
                        className="rounded-full mx-auto w-full h-12 max-w-37.5 md:max-w-50 text-sm md:text-md font-bold">
                        {isFetchingNextPageBorrowed && (<Spinner />)} Load More
                    </Button>
                )}
            </div>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md gap-6">
                    <DialogHeader>
                        <DialogTitle>Give Review</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 items-center">
                        <Label className="font-bold text-sm md:text-md">Give Rating</Label>
                        <div className="flex gap-1">
                            {
                                starIcon.map(star => (
                                    <Button key={star}
                                        onClick={() => handleStar(star)}
                                        variant={'ghost2'}
                                        className="p-0 w-12.25 h-12.25">
                                        <img className="w-12.25 h-12.25" src={star <= starRating ? icStar : icStar0} alt="star" /></Button>
                                ))
                            }
                        </div>
                        <Textarea
                            onChange={(e) => handleReview(e.target.value)}
                            value={review}
                            className="py-2 px-3 h-58.75"
                            placeholder="Please share your thoughts about this book" />
                        {
                            errReview.length > 0 &&
                            (
                                <div className="text-accent-red">{errReview}</div>
                            )
                        }
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={isPendingReview}
                            onClick={handleSendReview}
                            className="w-full rounded-full text-sm md:text-md">{isPendingReview && (<Spinner />)}Send</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default BorrowedListTab;