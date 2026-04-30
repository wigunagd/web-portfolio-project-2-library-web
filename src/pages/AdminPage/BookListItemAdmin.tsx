import { icStar } from "@/assets/asset";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BorrowedListItemProps {
    id: number;
    title: string;
    category: string;
    author: string;
    coverImage: string;
    rating: number;
    onClickDelete: () => void
}

const BookListItemAdmin = ({ id, title, category, author, coverImage, rating, onClickDelete }: BorrowedListItemProps) => {

    return (
        <div className="flex flex-col w-full rounded-xl gap-3 p-5 bg-white shadow-sm">

            <div className="flex gap-4 items-center">
                <div className="flex w-full">

                    <div className="flex flex-row gap-3 w-full">

                        <img src={coverImage} alt={title} className="w-full max-w-26" />

                        <div className="flex flex-col gap-3 w-full">
                            <Button variant={'outline'} className="radius-sm w-fit p-2 font-bold text-sm">{category}</Button>
                            <span className="font-bold text-md md:text-xl">{title}</span>
                            <span className="text-sm md:text-md">{author}</span>
                            <span className="flex font-bold gap-0.5 text-md md:text-sm"><img src={icStar} alt="Star" className="w-6 h-6" /> {rating}</span>
                        </div>

                    </div>

                </div>

                <div className="hidden md:flex md:flex-1 gap-4">
                    <Button
                        asChild
                        variant={'outline'}
                        className="radius-sm p-2 text-sm md:text-md w-23.75 h-12 rounded-full"><a href={`/bookpreviewadmin?id=${id}`}>Preview</a></Button>
                    <Button
                        variant={'outline'}
                        className="radius-sm p-2 text-sm md:text-md w-23.75 h-12 rounded-full">Edit</Button>
                    <Button
                        onClick={onClickDelete}
                        variant={'outline'}
                        className="radius-sm p-2 text-sm md:text-md w-23.75 h-12 rounded-full text-accent-red">Delete</Button>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost2" className="font-bold text-xl w-6 h-6 md:hidden">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="gap-4 mr-4">
                        <DropdownMenuItem asChild className="text-md"><a href={`/bookpreviewadmin?id=${id}`}>Preview</a></DropdownMenuItem>
                        <DropdownMenuItem className="text-md">Edit</DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-md text-accent-red"><Button onClick={onClickDelete} variant={'ghost2'}>Delete</Button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default BookListItemAdmin;