import { icBook, imgTmpProfilePic } from "@/assets/asset";
import type { Author } from "@/pages/pagetype/bookType";


const AuthorList = ({a, className} : {a: Author, className:string}) => {
    return (

        <div key={a.id} className={`flex items-center gap-4 w-full ${className}`}>
            <img src={imgTmpProfilePic} alt={`Profile ${a.id}`} className="w-15 h-15 md:w-20 md:h-20 rounded-full" />
            <div className="flex flex-col">
                <a href={`/author?id=${a.id}`} className="text-sm md:text-lg font-bold hover:text-primary-300 text-neutral-900">{a.name}</a>
                <span className="flex items-center text-sm md:text-md text-neutral-700 gap-1.5"><img src={icBook} alt={`Book ${a.id}`} />{a.bookCount} books</span>
            </div>
        </div>
    )
}

export default AuthorList;