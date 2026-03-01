import { icCategory1Fiction, icCategory2NonFiction, icCategory3SelfImprovement, icCategory4Finance, icCategory5ScienceTech, icCategory6Education, icStar, imgBanner1, imgBanner2, imgBanner3, imgBookTemp } from "@/assets/asset";
import Navbar from "@/components/Navbar";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useGetRecommend } from "./hooksHome";
import type { Book } from "./homeType";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BookSkeleton } from "@/components/BookSkeleton";

const arrBanner = [
    imgBanner1,
    imgBanner2,
    imgBanner3,
];

const categories = [
    {
        id: 4,
        name: "Fiction",
        logoCat: icCategory1Fiction
    },
    {
        id: 10,
        name: "Non-Fiction",
        logoCat: icCategory2NonFiction
    },
    {
        id: 7,
        name: "Self-Improvement",
        logoCat: icCategory3SelfImprovement
    },
    {
        id: 9,
        name: "Finance",
        logoCat: icCategory4Finance
    },
    {
        id: 11,
        name: "Science & Technology",
        logoCat: icCategory5ScienceTech
    },
    {
        id: 8,
        name: "Education",
        logoCat: icCategory6Education
    },
];

const Home = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const {
        data: dataRecomm,
        isLoading: isLoadingRecomm,
        isFetchingNextPage: isFetchingNextPageRecomm,
        fetchNextPage: fetchNextPageRecomm,
        hasNextPage: hasNextPageRecomm
    } = useGetRecommend({ by: 'rating', page: 1, limit: 10 });

    useEffect(() => {
        if (!api) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });

    }, [api]);

    return (
        <>
            <Navbar />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-5 grid mb-5">
                <section id="banner-section" className="w-full mx-auto">
                    <Carousel setApi={setApi}>
                        <CarouselContent>
                            {
                                arrBanner.map((b, i) => (
                                    <CarouselItem key={i}>
                                        <img src={b} alt={`Banner ${i}`} className="rounded-4xl" />
                                    </CarouselItem>
                                ))
                            }

                        </CarouselContent>

                        <div className="flex justify-center gap-4 py-4">
                            {Array.from({ length: count }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`h-3 w-3 rounded-full transition-colors cursor-pointer
                                    ${i === current ? 'bg-primary' : 'bg-neutral-300'}
                                    `}
                                    onClick={() => api?.scrollTo(i)}
                                />
                            ))}
                        </div>
                    </Carousel>
                </section>

                <section id="category-section" className="grid grid-cols-3 md:flex gap-4">
                    {
                        categories.map((c, i) => (
                            <a href={`/category?category=${c.id}`} key={i} className="flex flex-col hover:bg-neutral-50 rounded-xl border p-3 gap-4 w-full md:w-1/6">
                                <div className="flex items-center justify-center rounded-xl p-1.5  bg-primary-200">
                                    <img src={c.logoCat} alt={c.name} />
                                </div>
                                <span className="text-xs md:text-sm">{c.name}</span>
                            </a>
                        ))
                    }
                </section>

                <section id="recommendation-section" className="flex flex-col md:flex gap-4">
                    <span className="w-full text-display-xs md:text-display-lg font-bold">Recommendation</span>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap w-full gap-5">

                        {isLoadingRecomm && (
                            <>
                                <BookSkeleton />
                                <BookSkeleton />
                                <BookSkeleton />
                                <BookSkeleton />
                            </>
                        )}

                        {!isLoadingRecomm && (
                            <>
                                {
                                    dataRecomm?.pages.map(page => {
                                        return page.books.map((books: Book) => {
                                            return (
                                                <div key={books.id} className="flex flex-col w-full md:max-w-[224px] rounded-3xl shadow">
                                                    <div className="flex h-64.5 md:h-84 rounded-t-3xl">
                                                        <img src={books.coverImage ?? imgBookTemp} alt={books.title} className="object-cover" />
                                                    </div>
                                                    <div className="flex flex-col p-4">
                                                        <span className="text-sm md:text-lg font-bold text-neutral-900">{books.title}</span>
                                                        <span className="text-sm md:text-md text-neutral-700">{books.author.name}</span>
                                                        <span className="flex gap-1 text-sm md:text-md text-neutral-900 font-semibold"><img src={icStar} alt={`Rating ${books.title}`} />{books.rating}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    })
                                }
                            </>
                        )}



                    </div>

                    {hasNextPageRecomm && (
                        <Button
                            onClick={() => fetchNextPageRecomm()}
                            disabled={isFetchingNextPageRecomm}
                            variant={'outline'}
                            className="rounded-full mx-auto w-full h-12 max-w-37.5 md:max-w-50 text-sm md:text-md font-bold">
                            {isFetchingNextPageRecomm && (<Spinner />)} Load More
                        </Button>
                    )}

                </section>

            </main>
        </>
    )
}
export default Home;