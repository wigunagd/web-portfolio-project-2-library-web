import { successCheck } from "@/assets/asset";
import { Button } from "@/components/ui/button";

const Success = ({rtnMessage}: {rtnMessage: string}) => {

    return (
        <div className="flex flex-col w-full max-w-159.5 mx-auto items-center gap-6">
            <img src={successCheck} alt="Logo" className="" />
            <div className="flex flex-col w-full">
                <span className="w-full text-center font-bold text-xl md:text-display-sm">Borrowing Successful!</span>
                <span className="w-full text-center text-md md:text-lg">Your book has been successfully borrowed. Please return it by <span className="text-accent-red">{rtnMessage}</span></span>
            </div>

            <Button asChild className="w-full max-w-67 rounded-full h-12"><a href="/profile#borrowedlist">See Borrowed List</a></Button>
        </div>
    )
}

export default Success;