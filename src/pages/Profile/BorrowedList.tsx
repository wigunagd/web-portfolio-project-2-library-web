import { icSearch } from "@/assets/asset";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetBorrowed } from "./hooksBorrowed";
import type { Loan } from "./borrowedType";
import { Spinner } from "@/components/ui/spinner";
import BorrowedListItem from "./BorrowedListItem";

interface pageProps {
    className?: string;
}

const BorrowedList = ({ className }: pageProps) => {

    const [statusBorrow, setStatusBorrow] = useState('');

    const handleBtnStatusBorrow = (sttsBorrow: string) => {
        setStatusBorrow(sttsBorrow);
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

    const {
        data: dataBorrowed,
        isLoading: isLoadingBorrowed,
        isFetchingNextPage: isFetchingNextPageBorrowed,
        fetchNextPage: fetchNextPageBorrowed,
        hasNextPage: hasNextPageBorrowed
    } = useGetBorrowed({ page: 1, limit: 20 });

    console.log(dataBorrowed, 'dataBorrowed');

    return (
        <div className={`flex flex-col w-full mx-auto gap-6 ${className}`}>
            <h1 className="text-left font-bold text-display-xs md:text-display-sm">Borrowed List</h1>

            <div id="searchbarloan" className="flex px-4 py-2 gap-1.5 border md:max-w-138.5 rounded-full items-center">
                <img src={icSearch} className="w-5 h-5 shrink-0" />
                <input id="search" name="search" className="h-7 w-full outline-none bg-transparent" placeholder="Search book " />
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
                                return page.data.loans.map((loan: Loan) => {
                                    return (
                                        <BorrowedListItem 
                                        title={loan.book.title} 
                                        status={loan.status}  
                                        coverImage={loan.book.coverImage}
                                        borrowedAt={loan.borrowedAt}
                                        dueAt={loan.dueAt}
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

export default BorrowedList;