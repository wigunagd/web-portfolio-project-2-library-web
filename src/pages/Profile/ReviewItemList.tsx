import { icStar, icStar0 } from "@/assets/asset";
import { Button } from "@/components/ui/button";
import { formatTanggal } from "@/lib/dayJsUsage";

interface ReviewListItemProps {
    bookTitle: string;
    coverImage: string;
    tglReview: string;
    rating: number;
    review: string;
}

const ReviewItemList = ({ bookTitle, coverImage, tglReview, rating, review }: ReviewListItemProps) => {

    return (
        <div className="flex flex-col w-full rounded-xl gap-3 p-5 bg-white shadow-sm">
            <div className="grid grid-cols-2 text-sm md:text-md">
                {formatTanggal(tglReview, 'DD MMMM YYYY, HH:mm')} 
            </div>

            <hr />

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex w-full">

                    <div className="flex gap-3 w-full">

                        <img src={coverImage} alt={bookTitle} className="w-full max-w-23" />

                        <div className="flex flex-col gap-3 w-full">
                            <Button variant={'outline'} className="radius-sm w-fit p-2 font-bold text-sm">Category</Button>
                            <span className="font-bold text-md md:text-xl">{bookTitle}</span>
                            <span className="text-sm md:text-md">Author Name</span>
                        </div>

                    </div>

                </div>
            </div>

            <hr />

            <div className="flex flex-col gap-2">
                <div className="flex gap-0.5">
                    {
                        [1, 2, 3, 4, 5].map(star => (
                            <img className="w-6 h-6" src={star <= rating ? icStar : icStar0} alt="star" />
                        ))
                    }
                </div>
                <div className="text-sm md:text-md">{review}</div>
            </div>
        </div>
    )
}

export default ReviewItemList;