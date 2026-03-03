import { icStar, imgTmpProfilePic } from "@/assets/asset";
import type { Review } from "@/pages/pagetype/bookType";

const BookCommentList = ({ i, r }: { i: number, r: Review }) => {
    return (
        <div key={i} className="flex flex-col w-full p-4 gap-4 rounded-4xl shadow">
            <div className="flex flex-row w-full gap-3 items-center">
                <img src={imgTmpProfilePic} alt={`Profile ${r.userId}`} className="w-15 h-15 md:w-20 md:h-20 rounded-full" />
                <div className="flex flex-col">
                    <span className="text-sm md:text-lg font-bold text-neutral-950">{r.user.name}</span>
                    <span className="text-sm md:text-md text-neutral-950">{r.createdAt}</span>
                </div>
            </div>
            <span className="flex items-center text-sm md:text-md text-neutral-700 gap-1.5">
                {Array.from({ length: r.star }).map((_, i) => (
                    <img key={i} src={icStar} alt={`Star-${i}`} />
                ))}
            </span>
            <p>{r.comment}</p>
        </div>
    )
}

export default BookCommentList;