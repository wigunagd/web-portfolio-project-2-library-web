import { imgBookTemp } from "@/assets/asset";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { useAppDispatch } from "@/redux/3_redux";
import { useGetChartData } from "./hooksCart";
import { setCartCount } from "@/redux/1_cartSlice";
import CartItemSkeleton from "@/components/CartItemSkeleton";

const Cart = () => {
    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetChartData();

    dispatch(setCartCount({ cartCount: data?.itemCount ?? 0 }));

    return (
        <>
            <Navbar />

            <main className=" min-h-screen pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-12 grid mb-5">
                <div className="flex flex-col w-full max-w-250 gap-8">
                    <span className="text-display-xs md:text-display-lg font-bold">My Cart</span>

                    <div className="flex w-full gap-10">
                        <div className="flex flex-col w-full md:w-2/3 gap-6">

                            <div className="flex flex-row w-full gap-2 text-xd items-center">
                                <Checkbox id={`select-all`}
                                    name={`select-all`} />
                                <FieldLabel htmlFor={`select-all`} className="text-md">
                                    Select All
                                </FieldLabel>
                            </div>

                            {isLoading && (
                                <CartItemSkeleton />
                                )}

                            {!isLoading && (
                                <>
                                    {
                                        data?.items.map(item => (
                                            <div key={item.id} className="flex flex-row w-full items-start gap-2 text-xd items-center">
                                                <Checkbox id={`select-item`}
                                                    name={`select-item`} />
                                                <FieldLabel htmlFor={`select-item`} asChild>
                                                    <div className="relative flex w-full gap-4 ">
                                                        <img src={item.book.coverImage ?? imgBookTemp} alt="Book Banner" className="max-h-26.5 md:max-h-34.5" />
                                                        <div className="flex flex-col justify-center gap-2">
                                                            <span className="border flex w-fit px-2 rounded-sm text-sm font-bold">{item.book.category.name}</span>
                                                            <span className="text-lg font-bold">{item.book.title}</span>
                                                            <span className="text-md">{item.book.author.name}</span>
                                                        </div>
                                                        <div className="absolute top-0 right-0">
                                                            <Button
                                                                className="flex  w-10 h-10"
                                                                variant={'ghost'}>
                                                                X
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </FieldLabel>
                                            </div>
                                        ))
                                    }
                                </>
                            )}


                        </div>

                        <div className="flex flex-col w-full md:w-1/3 ">
                            <div className="fixed md:relative bg-white shadow border md:border-0 bottom-0 left-0 flex p-4 md:gap-6 md:flex-col w-full justify-between">
                                <span className="text-lg font-bold md:flex hidden">Loan Summary</span>

                                <div className=" md:relative flex flex-col md:flex-row justify-between">
                                    <span className="text-md">Total Book</span>
                                    <span className="text-md font-bold">2 Items</span>
                                </div>

                                <Button className="rounded-full w-37.5 md:w-full h-12">Borrow Book</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer className="mb-18" />
        </>
    )
}

export default Cart;