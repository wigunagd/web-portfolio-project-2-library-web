import { icStar, imgBookTemp } from "@/assets/asset";
import type { Book } from "@/pages/pagetype/bookType";

const BookItemList = ({ books }: { books: Book }) => {
    return (

        <a
            href={`/detailbook?id=${books.id}`}
            key={books.id}
            className="flex flex-col w-full md:max-w-56 rounded-3xl shadow">
            <div className="flex h-64.5 md:h-84">
                <img src={books.coverImage ?? imgBookTemp} alt={books.title} className="w-full object-cover rounded-t-3xl" />
            </div>
            <div className="flex flex-col p-4">
                <span className="text-sm md:text-lg font-bold text-neutral-900">{books.title}</span>
                <span className="text-sm md:text-md text-neutral-700">{books.author.name}</span>
                <span className="flex gap-1 text-sm md:text-md text-neutral-900 font-semibold"><img src={icStar} alt={`Rating ${books.title}`} />{books.rating}</span>
            </div>
        </a>
    )
}

export default BookItemList;