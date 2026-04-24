import { Button } from "@/components/ui/button";
import { getDaysBetween } from "@/lib/dateFunction";
import { formatTanggal } from "@/lib/dayJsUsage";

interface BorrowedListItemProps{
    title: string;
    coverImage: string;
    status: string;
    borrowedAt: string;
    dueAt: string;
}

const BorrowedListItem = ({title, coverImage, status, borrowedAt, dueAt} : BorrowedListItemProps) => {

    return (
        <div className="flex flex-col w-full rounded-xl gap-3 p-5 bg-white shadow-sm">
            <div className="grid grid-cols-2 text-sm md:text-md">
                <div className="flex gap-3 items-center">
                    <span className="font-bold ">Status</span>
                    <Button variant={'ghost2'} className={`flex font-bold px-2 rounded-sm 
                                                        ${status !== 'OVERDUE' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>{status}</Button>
                </div>

                <div className="flex gap-3 items-center justify-end">
                    <span className="font-bold ">Due Date</span>
                    <Button variant={'ghost2'} className={`flex font-bold px-2 rounded-sm        bg-accent-red/10 text-accent-red`}>{formatTanggal(dueAt, 'DD MMMM YYYY')}</Button>
                </div>
            </div>

            <hr />

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex w-full">

                    <div className="flex gap-3 w-full">

                        <img src={coverImage} alt={title} className="w-full max-w-23" />

                        <div className="flex flex-col gap-3 w-full">
                            <Button variant={'outline'} className="radius-sm w-fit p-2 font-bold text-sm">Category</Button>
                            <span className="font-bold text-md md:text-xl">{title}</span>
                            <span className="text-sm md:text-md">Author Name</span>
                            <span className="font-bold text-md md:text-sm">{formatTanggal(dueAt, 'DD MMMM YYYY')} . Duration {getDaysBetween(borrowedAt, dueAt)} Days</span>
                        </div>

                    </div>

                </div>

                <Button asChild className="w-full md:max-w-45.5 rounded-full"><a href="/updateprofile">Give Review</a></Button>
            </div>
        </div>
    )
}

export default BorrowedListItem;