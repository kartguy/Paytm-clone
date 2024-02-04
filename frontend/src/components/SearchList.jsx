import { ProfileIcon } from "./ProfileIcon";

export function SearchResults({onClick,fName,lName ,tag}){
    return (
        <div className="shadow-xl rounded-xl m-2">
            <div className="grid grid-cols-12">

                <div className="col-span-10 flex p-2">
                    <div className="w-8 h-8">
                    <ProfileIcon label={tag} />
                    </div>

                    <div className="ml-4">
                        <h1 className="text-xl font-semibold">{fName} {lName}</h1>
                    </div>
                    
                </div>

                <div className="col-span-2">
                    <div className="p-2">
                        <button className="bg-black w-full h-10 rounded-lg text-white text-md font-sans"
                        onClick={onClick}
                        >Send Money</button>
                    </div>
                </div>


            </div>
        </div>
    )
}