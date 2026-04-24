import { imgTmpProfilePic } from "@/assets/asset";
import { Button } from "@/components/ui/button";

interface pageProps {
    name: string;
    email: string;
    phone: string;
    imgUrl: string;
    className?: string;
}

const ProfileTab = ({ name, email, phone, imgUrl, className }: pageProps) => {

    return (
        <div className={`flex flex-col w-full gap-6 max-w-139.25 ${className}`}>
            <h1 className="text-left font-bold text-display-xs md:text-display-sm">Profile</h1>

            <div className="flex flex-col w-full rounded-xl gap-3 p-5 bg-white shadow-sm">
                <img src={imgUrl ?? imgTmpProfilePic} alt="profile-pic" className="w-16 h-16" />
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2">
                        <div className="flex ">Name</div>
                        <div className="text-right font-bold">{name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex ">Email</div>
                        <div className="text-right font-bold">{email}</div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex ">Nomor Handphone</div>
                        <div className="text-right font-bold">{phone}</div>
                    </div>
                </div>
                <Button asChild className="w-full rounded-full h-12"><a href="/updateprofile">Update Profile</a></Button>
            </div>
        </div>
    )
}

export default ProfileTab;