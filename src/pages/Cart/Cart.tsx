import { imgBookTemp } from "@/assets/asset";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { useAppDispatch, useAppSelector } from "@/redux/3_redux";
import { /* useDelChartData, */ useGetChartData } from "./hooksCart";
import { setCartCount } from "@/redux/1_cartSlice";
import CartItemSkeleton from "@/components/CartItemSkeleton";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
/* import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; */

const Cart = () => {
    const cartState = useAppSelector((state) => state.cart);
    const navigate = useNavigate();
    const [selectedCart, setSelectedCart] = useState<number[]>(cartState.cartSelected);
    /* const { mutate } = useDelChartData(); */

    const [errMsg, setErrMsg] = useState("");
    const [toCheckout, setToCheckOut] = useState(false);
    let selectAllProps: number[] = [];

    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetChartData();

    dispatch(setCartCount({ cartCount: data?.itemCount ?? 0, cartSelected: selectedCart }));

    const handleCardSelect = (id: number, checked: boolean) => {
        const newSelectedCart = checked
            ? [...selectedCart, id]
            : selectedCart.filter((item) => item !== id);

        setSelectedCart(newSelectedCart);

        dispatch(setCartCount({ cartCount: data?.itemCount ?? 0, cartSelected: newSelectedCart }));

        setErrMsg("");
    }

    const handleSelectAll = (checked: boolean) => {
        const newSelectedCart = checked ? selectAllProps : [];

        setSelectedCart(newSelectedCart);

        dispatch(setCartCount({ cartCount: data?.itemCount ?? 0, cartSelected: newSelectedCart }));

        setErrMsg("");
    }

    const allItems = useMemo(() => {
        return data?.items.map(item => item.bookId) || [];
    }, [data]);

    useEffect(() => {
        dispatch(setCartCount({ cartCount: data?.itemCount ?? 0, cartSelected: selectedCart }));
    }, [selectedCart, data?.itemCount, dispatch]);

    const isCheckedAll = selectedCart.length > 0 &&
        selectedCart.length === allItems.length &&
        allItems.every(id => selectedCart.includes(id));

    const handleToCheckout = () => {

        setToCheckOut(true);

        if (cartState.cartCount < 1) {
            setErrMsg("Cart empty");
            setToCheckOut(false);
            return;
        }

        if (cartState.cartCount > 1 && cartState.cartSelected.length < 1) {
            setErrMsg("Select books to checkout");
            setToCheckOut(false);
            return;
        }

        navigate('/checkout');
    }

    const isCartEmpty = data?.itemCount === 0;

    /* const queryCLient = useQueryClient();
    const delCart = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                queryCLient.invalidateQueries({ queryKey: ['cart'] });
                toast('Item deleted');
            },
            onError: (e) =>{
                console.log(e)
            }
        });
    } */

    return (
        <>
            <Navbar />

            <main className=" min-h-screen pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-12 grid mb-5">
                <div className="flex flex-col w-full max-w-250 gap-8">
                    <span className="text-display-xs md:text-display-lg font-bold">My Cart</span>

                    <div className="flex flex-col md:flex-row w-full gap-10">
                        <div className="flex flex-col w-full md:w-2/3 gap-6">

                            {isCartEmpty && (
                                <span>Cart is empty</span>
                            )}

                            {!isCartEmpty && (
                                <div className="flex flex-row w-full gap-2 text-xd items-center">
                                    <Checkbox
                                        checked={isCheckedAll}
                                        onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                                        id="select-all"
                                        name="select-all" />
                                    <FieldLabel htmlFor="select-all" className="text-md">
                                        Select All
                                    </FieldLabel>
                                </div>
                            )}

                            {isLoading && (
                                <CartItemSkeleton />
                            )}

                            {!isLoading && (
                                <>
                                    {
                                        data?.items.map((item, i) => {
                                            selectAllProps = [...selectAllProps, item.bookId];

                                            return (
                                                <>
                                                    {
                                                        i > 0 && (<hr />)
                                                    }
                                                    <div key={item.id} className="flex flex-row w-full items-start gap-2">
                                                        <Checkbox
                                                            checked={selectedCart.includes(item.bookId)}
                                                            onCheckedChange={(checked: boolean) => handleCardSelect(item.bookId, checked)}
                                                            id={item.bookId.toString()}
                                                            name={item.bookId.toString()} />
                                                        <FieldLabel htmlFor={item.bookId.toString()} className="relative flex items-start w-full gap-4 ">
                                                            <img src={item.book.coverImage ?? imgBookTemp} alt="Book Banner" className="max-h-26.5 md:max-h-34.5" />
                                                            <div className="flex flex-col justify-center gap-2">
                                                                <span className="border flex w-fit px-2 rounded-sm text-sm font-bold">{item.book.category.name}</span>
                                                                <span className="text-lg font-bold">{item.book.title}</span>
                                                                <span className="text-md">{item.book.author.name}</span>
                                                            </div>
                                                            {/* <div className="absolute top-0 right-0">
                                                                <Button
                                                                    onClick={() => delCart(item.bookId)}
                                                                    className="flex  w-10 h-10"
                                                                    variant={'ghost'}>
                                                                    X
                                                                </Button>
                                                            </div> */}
                                                        </FieldLabel>
                                                    </div>
                                                </>
                                            )
                                        }
                                        )
                                    }
                                </>
                            )}

                        </div>

                        {!isCartEmpty && (
                            <div className="flex flex-col w-full md:w-1/3 ">
                                <div className="fixed md:relative bg-white shadow border md:border-0 bottom-0 left-0 flex p-4 md:gap-6 md:flex-col w-full justify-between">
                                    <span className="text-lg font-bold md:flex hidden">Loan Summary</span>

                                    <div className=" md:relative flex flex-col md:flex-row justify-between">
                                        <span className="text-md">Total Book</span>
                                        <span className="text-md font-bold">{selectedCart.length ?? 0} Items</span>
                                    </div>

                                    <Button
                                        disabled={toCheckout}
                                        onClick={handleToCheckout}
                                        className="rounded-full w-37.5 md:w-full h-12">{toCheckout && (<Spinner />)}Borrow Book</Button>
                                    {errMsg !== "" && (
                                        <span className="text-md text-accent-red">{errMsg}</span>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </main>

            <Footer className="mb-18" />
        </>
    )
}

export default Cart;