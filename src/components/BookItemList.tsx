import { icStar, imgBookTemp } from "@/assets/asset";
import type { Book } from "@/pages/pagetype/bookType";

const BookItemList = ({ books, className }: { books: Book, className: string }) => {
    return (

        <div key={books.id}
            className={`flex flex-col rounded-3xl shadow w-full ${className}`}>
            <a href={`/detailbook?id=${books.id}`} className="flex h-64.5 md:h-84">
                <img src={books.coverImage ?? imgBookTemp} alt={books.title} className="w-full object-cover rounded-t-3xl" />
            </a>
            <div className="flex flex-col p-4">
                <a href={`/detailbook?id=${books.id}`} className="text-sm md:text-lg line-clamp-2 font-bold hover:text-primary-300 text-neutral-900">{books.title}</a>
                <a href={`/author?id=${books.authorId}`} className="text-sm md:text-md hover:text-primary-300 text-neutral-700">{books.author.name}</a>
                <span className="flex gap-1 text-sm md:text-md text-neutral-900 font-semibold"><img src={icStar} alt={`Rating ${books.title}`} />{books.rating}</span>
            </div>
        </div>
    )
}

export default BookItemList;