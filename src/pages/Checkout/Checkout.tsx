import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartItemSkeleton from "@/components/CartItemSkeleton";
import { icCalendar, imgBookTemp } from "@/assets/asset";
import { useAppDispatch, useAppSelector } from "@/redux/3_redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatTanggal } from "@/lib/dayJsUsage";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import dayjs from "dayjs";
import { setCartCount } from "@/redux/1_cartSlice";
import { useGetCheckoutData } from "./hooksCheckout";


const rbDays = [
    {
        id: '3-days',
        value: '3',
        name: '3 Days',
    }, {
        id: '5-days',
        value: '5',
        name: '5 Days',
    }, {
        id: '10-days',
        value: '10',
        name: '10 Days',
    },
];

const Checkout = () => {
    const authState = useAppSelector((state) => state.auth);
    const { data, isLoading } = useGetCheckoutData();
    const currentDate = formatTanggal(new Date(), 'DD MMM YYYY');

    const [selectedDuration, setSelectedDuration] = useState(rbDays[0].value);
    const [acceptDueDate, setAcceptDueDate] = useState(false);
    const [acceptPolicy, setAcceptPolicy] = useState(false);

    const returnDate = dayjs().add(parseInt(selectedDuration), 'day').format('DD MMM YYYY');
   
    const cartState = useAppSelector((state) => state.cart);
    const selectedCart = cartState.cartSelected;
    const dispatch = useAppDispatch();

    dispatch(setCartCount({ cartCount: data?.itemCount ?? 0, cartSelected: selectedCart }));

    return (
        <>
            <Navbar />

            <main className=" min-h-screen pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-12 grid mb-5">
                <div className="flex flex-col w-full max-w-250 gap-8">
                    <span className="text-display-xs md:text-display-lg font-bold">Checkout</span>

                    <div className="flex flex-col md:flex-row w-full gap-14.5">
                        <div className="flex flex-col w-full md:w-1/2 gap-8">

                            <div className="flex flex-col w-full gap-4">
                                <span className="text-lg md:text-display-xs font-bold">User Information</span>
                                <div className="flex justify-between">
                                    <span className="text-sm md:text-md">Name</span>
                                    <span className="text-sm md:text-md font-bold">{authState.user.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm md:text-md">Email</span>
                                    <span className="text-sm md:text-md font-bold">{authState.user.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm md:text-md">Nomor Handphone</span>
                                    <span className="text-sm md:text-md font-bold">{authState.user.phone}</span>
                                </div>
                            </div>

                            <div className="border-b w-full" />

                            <div className="flex flex-col w-full gap-4">

                                <span className="text-lg md:text-display-xs font-bold">Book List</span>

                                {isLoading && (
                                    <CartItemSkeleton />
                                )}

                                {!isLoading && (
                                    <>
                                        {
                                            data?.items
                                            .filter((books) => cartState.cartSelected.includes(books.bookId))
                                            .map(item => (
                                                <>
                                                    <div key={item.id} className="flex flex-row w-full items-center gap-2">
                                                        <img src={item.book.coverImage ?? imgBookTemp} alt="Book Banner" className="max-h-26.5 md:max-h-34.5" />
                                                        <div className="flex flex-col justify-center gap-2">
                                                            <span className="border flex w-fit px-2 rounded-sm text-sm font-bold">{item.book.category.name}</span>
                                                            <span className="text-lg font-bold">{item.book.title}</span>
                                                            <span className="text-md">{item.book.author.name}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )

                                            )
                                        }
                                    </>
                                )}
                            </div>

                        </div>

                        <div className="flex flex-col h-fit w-full md:w-1/2 gap-4 md:gap-6 p-4 md:p-5 rounded-4xl shadow">
                            <span className="text-lg font-bold flex">Complete Your Borrow Request</span>

                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold">Borrow Date</span>
                                <div className="flex justify-between border rounded-xl bg-neutral-100 px-4 py-2">
                                    <span id="borrom-date" className="text-md">{currentDate}</span>
                                    <img src={icCalendar} alt="icon calendar" className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <span className="text-sm md:text-md font-bold">Borrow Duration</span>

                                <RadioGroup
                                    value={selectedDuration}
                                    onValueChange={setSelectedDuration}
                                    id="rb-group-hari"
                                    className="gap-3">
                                    {
                                        rbDays.map(rb => (
                                            <div key={rb.id} className="flex items-center gap-3">
                                                <RadioGroupItem value={rb.value} id={rb.id} />
                                                <Label htmlFor={rb.id}>{rb.name}</Label>
                                            </div>
                                        ))
                                    }

                                </RadioGroup>

                            </div>

                            <div className="flex flex-col p-3 md:p-4 bg-primary-100 rounded-3xl gap-2">
                                <span className="text-sm md:text-md font-bold">Return Date</span>
                                <span className="text-sm md:text-md">
                                    Please return the book no later than
                                    <span id="return-date" className="font-bold text-accent-red"> {returnDate}</span>
                                </span>
                            </div>

                            <div className="flex flex-row w-full gap-2 text-xd items-start">
                                <Checkbox
                                    checked={acceptDueDate}
                                    onCheckedChange={() => setAcceptDueDate(!acceptDueDate)}
                                    id="accept-term-return"
                                    value="accept-term-return"
                                    name="accept-term-return"
                                    className="w-5 h-5" />
                                <FieldLabel htmlFor="accept-term-return" className="text-sm md:text-md">
                                    I agree to return the book(s) before the due date.
                                </FieldLabel>
                            </div>

                            <div className="flex flex-row w-full gap-2 text-xd items-start">
                                <Checkbox
                                    checked={acceptPolicy}
                                    onCheckedChange={() => setAcceptPolicy(!acceptPolicy)}
                                    id="accept-policy"
                                    value="accept-policy"
                                    name="accept-policy"
                                    className="w-5 h-5" />
                                <FieldLabel htmlFor="accept-policy" className="text-sm md:text-md">
                                    I accept the library borrowing policy.
                                </FieldLabel>
                            </div>

                            <Button className="w-full rounded-full h-12">Confirm & Borrow</Button>

                        </div>

                    </div>

                </div>
            </main>

            <Footer className="mb-18" />
        </>
    )
}

export default Checkout;