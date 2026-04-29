import { icPNext, icPPrev, icSearch } from "@/assets/asset";
import { useState } from "react";
import { useGetUserList } from "./hooksUserList";
import { formatTanggal } from "@/lib/dayJsUsage";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface pageProps {
    className?: string;
}

const UserList = ({ className }: pageProps) => {

    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;
    let displayedNumber = 0;

    const handleTxtSearchUser = (text: string) => {
        setQ(text);
    }

    const pPrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const pNext = () => {
        if (page < (dataUser?.data?.pagination?.totalPages ?? 1)) {
            setPage(page + 1);
        }
    }

    const { data: dataUser, isLoading: isLoadingDataUser } = useGetUserList({ q, page, limit });

    if (isLoadingDataUser) {
        return (
            <div className="flex justify-center p-10">
                <span>Loading users...</span>
            </div>
        );
    }

    const totalPages = dataUser?.data.pagination.totalPages ?? 1

    const getBtnArr = (current: number, total: number): number[] => {
        let start = Math.max(1, current - 1);
        const end = Math.min(total, start + 2);

        if (end === total && total >= 3) {
            start = Math.max(1, end - 2);
        }

        const buttons: number[] = [];
        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }

        return buttons;
    };

    return (
        <div className={`flex flex-col w-full gap-6 ${className}`}>
            <h1 className="text-left font-bold text-display-xs md:text-display-sm">User</h1>

            <div id="searchbarloan" className="flex px-4 py-2 gap-1.5 border md:max-w-138.5 rounded-full items-center">
                <img src={icSearch} className="w-5 h-5 shrink-0" />
                <input
                    id="search"
                    name="search"
                    value={q}
                    onChange={(e) => handleTxtSearchUser(e.target.value)}
                    className="h-7 w-full outline-none bg-transparent"
                    placeholder="Search Reviews" />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col w-full gap-4 p-4 border rounded-3xl">

                    <table className="table-auto">
                        <thead className="bg-neutral-50">
                            <tr className="text-left">
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Nomor Handphone</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Created at</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                dataUser?.data.users.map((userItem, i) => (
                                    <tr className="border-b">
                                        <td className="py-2 px-4">{displayedNumber = i + 1 + (limit * (page - 1))}</td>
                                        <td className="py-2 px-4">{userItem.name}</td>
                                        <td className="py-2 px-4">{userItem.phone}</td>
                                        <td className="py-2 px-4">{userItem.email}</td>
                                        <td className="py-2 px-4">{formatTanggal(userItem.createdAt, 'DD MMM YYYY, HH:mm')}</td>
                                    </tr>
                                ))
                            }

                            {
                                isLoadingDataUser && (
                                    <tr>
                                        <td colSpan={5} className="flex justify-center">
                                            <Spinner />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <div className="grid grid-cols-2 px-6">
                        <div className="flex">Showing {1 + (limit * (page - 1))} to {displayedNumber} of {dataUser?.data.pagination.total}</div>
                        <div className="flex gap-6 justify-end">
                            <Button onClick={pPrev} variant={'ghost'}><img src={icPPrev} alt="Previous" /> Previous</Button>
                            {
                                page > 2 && (
                                    <div className="w-10 h-10 p-2 flex items-end">...</div>
                                )
                            }
                            {
                                getBtnArr(page, totalPages).map(i => (
                                    <Button onClick={() => setPage(i)} variant={'ghost'} className={`w-10 h-10 ${page === (i) && 'border rounded-lg'}`}>{i}</Button>
                                ))
                            }
                            {
                                page < totalPages-1 && (
                                    <div className="w-10 h-10 p-2 flex items-end">...</div>
                                )
                            }
                            <Button onClick={pNext} variant={'ghost'}>Next <img src={icPNext} alt="Next" /></Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserList;