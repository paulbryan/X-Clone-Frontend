import ProfilePic from "../UIComponent/ProfilePic";
import { FaRegCalendar } from "react-icons/fa6";


function ProfilePageOverview () {

    return (
            <div className="h-fit">

                <div className="w-full h-40 relative">

                    <div>
                        <img className="h-32 opacity-100 w-full" src="https://cdn.discordapp.com/attachments/1138945433759141959/1376918461606793298/1500x500.png?ex=683712bf&is=6835c13f&hm=62027369c0eba028de20dbc8583523a69b5d839043c83575e56bd772162700a2&"/>
                    </div>

                    <div className="absolute w-20 h-10 left-5 bottom-10 rounded-full">
                        <ProfilePic/>
                    </div>

                    <div className="w-full h-12 flex justify-end items-center px-4">
                        <div className="w-28 h-auto flex items-center justify-center align-middle rounded-2xl border border-(--text-main) text-(--text-main)">
                            <p>Follow</p>
                        </div>
                    </div>



                </div>

                <div className="w-full h-full px-4 text-(--text-main) flex flex-col">

                    <div className="w-full h-12 mt-1 mb-3 flex flex-col">
                        <p className="font-bold text-xl">Jokerhut</p>
                        <p className="text-(--twitter-text)">@TheJokerHut</p>
                    </div>

                    <div className="flex w-full h-fit gap-0.5 flex-col">

                        <div>
                            <p className="text-(--text-main)">
                            21 year old on my web development journey. Main languages are Java and ReactJS.
                            </p>
                        </div>
                        
                        <div className="h-fit w-full text-(--twitter-text)">
                            <div className="flex items-center gap-2">
                            <FaRegCalendar />
                            <p>Joined December 2024</p>
                            </div>
                        </div>

                        <div className="h-fit w-full flex items-center gap-4 mb-0.5 text-(--twitter-text)">
                            <div className="flex">
                                <p> <span className="font-bold text-(--text-main)">5</span> Followers</p>
                            </div>
                            <div className="flex">
                                <p> <span className="font-bold text-(--text-main)">0</span> Following</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
    )

}

export default ProfilePageOverview;