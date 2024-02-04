import { ProfileIcon } from "./ProfileIcon";

export function AppBar({name}){
    return (
        <div className=" bg-slate-50  shadow-sm grid grid-cols-12 px-4 py-5">
            <div className="col-span-8">
                <h1 className="text-2xl font-semibold">Paytm App</h1>
            </div>

            <div className="col-span-4 md">
                <div className="flex md:justify-end">
                    <div className="p-1 mr-3 ">
                        <h1 className="font-medium ">Hello, {name}</h1>
                    </div>

                    <div className="w-12 h-12 md:w-8 md:h-8">
                        <ProfileIcon label={name[0].toUpperCase()}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}