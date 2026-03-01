import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useGetDetailBook } from "./hooksDetailBook";
import { useSearchParams } from "react-router-dom";
import { icDirectionRight, icStar } from "@/assets/asset";
import { Button } from "@/components/ui/button";
import { DetailBookSkeleton } from "./DetailBookSkeleton";

const DetailBook = () => {
    const [srcParam] = useSearchParams();
    const id = Number(srcParam.get('id'));

    const { data: dataDetailBook, isLoading: isLoadingDetailBook } = useGetDetailBook(id);
    //console.log(dataDetailBook, 'dataDetailBook');

    return (
        <>
            <Navbar />

            <main className="pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-12 grid mb-5">
                <section id="book-detail-section" className="flex flex-col w-full mx-auto gap-6 md:gap-16">

                    {isLoadingDetailBook && (<DetailBookSkeleton />)}

                    {!isLoadingDetailBook && (
                        <div className="flex flex-col w-full gap-6">

                            <div className="flex gap-1 text-sm font-semibold items-center">
                                <a href="/" className="text-primary-300">Home</a>
                                <img src={icDirectionRight} alt="Direction Right" className="w-4 h-4" />
                                <a href={`/category?category=${dataDetailBook?.categoryId}`} className="text-primary-300">{dataDetailBook?.category.name}</a>
                                <img src={icDirectionRight} alt="Direction Right" className="w-4 h-4" />
                                <span>{dataDetailBook?.title}</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-9">

                                <div className="flex w-full md:w-1/3 max-w-84.25 max-h-124.5 mx-auto md:mx-0">
                                    <img src={dataDetailBook?.coverImage} alt={dataDetailBook?.title} className="mx-auto w-full object-cover" />
                                </div>

                                <div className="flex flex-col w-full md:w-2/3 max-w-206.75 gap-5">

                                    <div className="flex flex-col w-full gap-5.5">

                                        <span className="border flex w-fit px-2 rounded-sm text-sm font-bold">{dataDetailBook?.category.name}</span>

                                        <h2 className="font-bold text-display-xs md:text-display-sm">{dataDetailBook?.title}</h2>

                                        <span className="text-sm md:text-md">{dataDetailBook?.author.name}</span>

                                        <span className="text-md flex items-center gap-1"><img src={icStar} alt="Rating" />{dataDetailBook?.rating}</span>
                                    </div>

                                    <div className="flex w-full gap-5">
                                        <div className="flex flex-col w-full max-w-25.5">
                                            <span className="text-lg md:text-display-xs font-bold">{dataDetailBook?.pages ?? '-'}</span>
                                            <span className="text-sm md:text-md">Page</span>
                                        </div>

                                        <div className="border-r" />

                                        <div className="flex flex-col w-full max-w-25.5">
                                            <span className="text-lg md:text-display-xs font-bold">{dataDetailBook?.reviewCount}</span>
                                            <span className="text-sm md:text-md">Rating</span>
                                        </div>

                                        <div className="border-r" />

                                        <div className="flex flex-col w-full max-w-25.5">
                                            <span className="text-lg md:text-display-xs font-bold">{dataDetailBook?.reviewCount}</span>
                                            <span className="text-sm md:text-md">Review</span>
                                        </div>
                                    </div>

                                    <div className="border-b w-full max-w-140" />

                                    <div className="flex flex-col w-full gap-2">
                                        <span className="font-bold text-xl">Description</span>
                                        <p className="text-sm md:text-md">{dataDetailBook?.description}</p>
                                    </div>

                                    <div className="fixed bottom-0 left-0 w-full h-18 px-4 flex items-center bg-white md:relative md:h-fit md:px-0 md:bg-transparent">
                                        <div className="grid grid-cols-2 md:flex gap-3 w-full items-center">
                                            <Button variant={'ghost'} className="rounded-full w-full md:max-w-50 h-10 md:h-12 text-sm md:text-md font-bold border">
                                                Add to Cart
                                            </Button>
                                            <Button className="rounded-full w-full md:max-w-50 h-10 md:h-12 text-sm md:text-md font-bold">
                                                Borrow Book
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    )}


                    <div className="border-b w-full" />

                    {!isLoadingDetailBook && (
                        <div className="flex flex-col w-full gap-4.5">
                            <div className="flex flex-col w-full gap-3">
                                <span className="font-bold text-display-xs md:text-lg">Review</span>
                                <span className="flex w-full gap-2 text-md md:text-xl"><img src={icStar} alt={`Rating ${dataDetailBook?.title}`} /> {dataDetailBook?.rating} ({dataDetailBook?.reviewCount} Ulasan)</span>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col w-full">1</div>
                            </div>
                        </div>
                    )}

                </section>
            </main>

            <Footer className="mb-18 md:mb-0" />
        </>
    )
}

export default DetailBook;