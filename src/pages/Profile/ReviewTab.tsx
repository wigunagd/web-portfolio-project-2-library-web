import { icSearch } from "@/assets/asset";
import { useState } from "react";
import ReviewItemList from "./ReviewItemList";
import { useGetReview } from "./hooksReviews";
import type { ReviewItem } from "./reviewsType";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface pageProps {
    className?: string;
}

const ReviewTab = ({ className }: pageProps) => {

    const [txtReviewSearch, setTxtBookSearch] = useState('');

    const handleTxtSearch = (text: string) => {
        setTxtBookSearch(text);
    }

    const {
        data: dataBorrowed,
        isLoading: isLoadingBorrowed,
        isFetchingNextPage: isFetchingNextPageBorrowed,
        fetchNextPage: fetchNextPageBorrowed,
        hasNextPage: hasNextPageBorrowed
    } = useGetReview({ q: txtReviewSearch, page: 1, limit: 20 });

    return (
        <div className={`flex flex-col w-full gap-6 ${className}`}>
            <h1 className="text-left font-bold text-display-xs md:text-display-sm">Reviews</h1>

            <div id="searchbarloan" className="flex px-4 py-2 gap-1.5 border md:max-w-138.5 rounded-full items-center">
                <img src={icSearch} className="w-5 h-5 shrink-0" />
                <input
                    id="search"
                    name="search"
                    value={txtReviewSearch}
                    onChange={(e) => handleTxtSearch(e.target.value)}
                    className="h-7 w-full outline-none bg-transparent"
                    placeholder="Search Reviews" />
            </div>

            <div className="flex flex-col gap-4">
                {!isLoadingBorrowed && (
                    <>
                        {
                            dataBorrowed?.pages.map(page => {
                                return page.data.reviews.map((review: ReviewItem) => {
                                    return (
                                        <ReviewItemList
                                            key={review.id}
                                            bookTitle={review.book.title}
                                            coverImage={review.book.coverImage}
                                            tglReview={review.createdAt}
                                            rating={review.star}
                                            review={review.comment}
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

        </div>
    )
}

export default ReviewTab;