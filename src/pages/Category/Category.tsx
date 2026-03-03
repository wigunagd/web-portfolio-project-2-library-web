import { icClose, icFilter } from "@/assets/asset";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { categoriesList } from "../pagetype/categorylist";
import { FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/3_redux";
import { setFilterReducer } from "@/redux/1_filterSlice";
import { useSearchParams } from "react-router-dom";
import { useGetBookInCategoty } from "./hooksCategory";
import { BookSkeleton } from "@/components/BookSkeleton";
import type { Book } from "../pagetype/bookType";
import BookItemList from "@/components/BookItemList";
import { Spinner } from "@/components/ui/spinner";

const categories = categoriesList;

const Category = () => {
    const filterState = useAppSelector((state) => state.filter);
    const dispatch = useAppDispatch();
    const [srcParam] = useSearchParams();
    const category = Number(srcParam.get('category'));

    const useIsMobile = (breakpoint: number = 768) => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

        useEffect(() => {
            const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
            const handleResize = (e: MediaQueryListEvent) => {
                setIsMobile(e.matches);
            };
            mediaQuery.addEventListener('change', handleResize);
            return () => mediaQuery.removeEventListener('change', handleResize);
        }, [breakpoint]);

        return isMobile;
    };

    const isMobile = useIsMobile();
    const [showFilter, setShowFilter] = useState(false);

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    }

    const [filterCategory, setfilterCategory] = useState<number[]>(filterState.category);
    const [filterRating, setfilterRating] = useState<number[]>(filterState.rating);

    useEffect(() => {
        if (category !== 0) {
            setfilterCategory((prevFilter) => {
                const newFilter = [...prevFilter, category];

                dispatch(setFilterReducer({
                    category: newFilter,
                    rating: filterRating
                }));

                return newFilter;
            });
        }
    }, [filterRating, dispatch, category]);

    const {
        data: dataBook,
        isLoading: isLoadingBook,
        isFetchingNextPage: isFetchingNextPageBook,
        fetchNextPage: fetchNextPageBook,
        hasNextPage: hasNextPageBook
    } = useGetBookInCategoty({ page: 1, limit: 10 });

    const handleCheckboxChangeCategory = (id: number, checked: boolean) => {
        const newFilter = checked
            ? [...filterCategory, id]
            : filterCategory.filter((item) => item !== id);

        setfilterCategory(newFilter);

        dispatch(setFilterReducer({ category: newFilter, rating: filterRating }));
    };

    const handleCheckboxChangeRating = (id: number, checked: boolean) => {

        const newFilter = checked
            ? [...filterRating, id]
            : filterRating.filter((item) => item !== id);

        setfilterRating(newFilter);

        dispatch(setFilterReducer({ category: filterCategory, rating: newFilter }));
    };

    return (
        <>
            <Navbar />

            <main className="relative pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-4 md:gap-12 grid mb-5">
                <h1 className="text-display-xs md:text-display-lg font-bold">Book List</h1>

                <div className=" w-full md:max-w-300 mx-auto gap-4 md:gap-12 grid md:flex">

                    <Button
                        onClick={handleShowFilter}
                        variant={'ghost2'}
                        className="flex md:hidden flex-row justify-between items-center h-13 gap-5 rounded-xl shadow px-4 ">
                        <span className="text-sm font-extrabold">FILTER</span>
                        <img src={icFilter} alt="ic filter" className="w-5 h-5" />
                    </Button>

                    <aside className={`flex flex-col w-full md:max-w-56.5 gap-5 rounded-xl shadow py-4
                    ${isMobile ? (
                            showFilter
                                ? 'block absolute h-full top-16'
                                : 'hidden'
                        )
                            : 'block'
                        }
                    `}>

                        <div className="flex flex-col gap-5 bg-white">

                            <div className="flex flex-col px-4 gap-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-extrabold">FILTER</span>

                                    <Button
                                        onClick={handleShowFilter}
                                        className="flex md:hidden"
                                        variant={'ghost2'}>
                                        <img src={icClose} alt="ic filter" className="w-5 h-5" />
                                    </Button>
                                </div>

                                <span className="text-lg font-extrabold">Category</span>
                                {
                                    categories.map((c, i) => (
                                        <div key={i}
                                            className="flex flex-row w-full gap-2 text-xd items-center">
                                            <Checkbox
                                                checked={filterCategory.includes(c.id)}
                                                onCheckedChange={(checked: boolean) => handleCheckboxChangeCategory(c.id, checked)}
                                                id={`filter cat ${c.id}`}
                                                value={`${c.id}`}
                                                name={`filter cat ${c.id}`} />
                                            <FieldLabel htmlFor={`filter cat ${c.id}`} className="text-xd">
                                                {c.name}
                                            </FieldLabel>
                                        </div>
                                    ))
                                }
                            </div>

                            <hr />

                            <div className="flex flex-col px-4 gap-5">
                                <span className="text-lg font-extrabold">Rating</span>
                                {
                                    [5, 4, 3, 2, 1].map(r => (
                                        <div key={r}
                                            className="flex flex-row w-full gap-2 text-xd items-center">
                                            <Checkbox
                                                checked={filterRating.includes(r)}
                                                onCheckedChange={(checked: boolean) => handleCheckboxChangeRating(r, checked)}
                                                id={`filter rating ${r}`}
                                                value={`${r}`}
                                                name={`filter rating ${r}`} />
                                            <FieldLabel htmlFor={`filter rating ${r}`} className="text-xd">
                                                {r}
                                            </FieldLabel>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                    </aside>

                    <section id="book-section" className="flex flex-col md:flex gap-4 w-full md:max-w-219.75">
                        <div className="grid grid-cols-2 md:flex md:flex-wrap w-full gap-5">

                            {isLoadingBook && (
                                <>
                                    <BookSkeleton />
                                    <BookSkeleton />
                                    <BookSkeleton />
                                    <BookSkeleton />
                                </>
                            )}

                            {!isLoadingBook && (
                                <>
                                    {
                                        dataBook?.pages.map(page => {
                                            return page.books
                                                .filter((books) => filterCategory.length === 0 || filterCategory.includes(books.categoryId))
                                                .filter((books) => filterRating.length === 0 || books.rating >= Math.max(...filterRating))
                                                .map((books: Book) => {
                                                    return (
                                                        <BookItemList className="md:max-w-[204.75px]" books={books} />
                                                    )
                                                })
                                        })
                                    }
                                </>
                            )}



                        </div>

                        {hasNextPageBook && (
                            <Button
                                onClick={() => fetchNextPageBook()}
                                disabled={isFetchingNextPageBook}
                                variant={'outline'}
                                className="rounded-full mx-auto w-full h-12 max-w-37.5 md:max-w-50 text-sm md:text-md font-bold">
                                {isFetchingNextPageBook && (<Spinner />)} Load More
                            </Button>
                        )}

                    </section>

                </div>



            </main>

            <Footer className="mb-18 md:mb-0" />
        </>
    )
}

export default Category;