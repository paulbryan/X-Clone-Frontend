
function AboutPage () {

    return (

        <div className="flex w-full h-full gap-4 flex-col px-4">

            <div className="w-full flex flex-col">
                <p>About the project</p>
            </div>

            <div className="w-full gap-2 flex flex-col">
                <p className="font-bold underline text-white text-xl">Why X?</p>
                <p className="text-twitterText">I chose to make a twitter/X clone due to it being a text-focused platform that also has a user friendly desktop version</p>
            </div>

            <div className="w-full gap-2 flex flex-col">
                <p className="font-bold underline text-white text-xl ">What tools?</p>
                <p className="text-twitterText">On the frontend, I used React, Tailwind CSS, and Typescript. On the backend, I used Java and Sprint Boot. For the Database, i'm using MySQL.</p>
            </div>

            <div className="w-full gap-2 flex flex-col">
                <p className="font-bold underline text-white text-xl">Known Issues</p>

            </div>
        
        </div>

    )

}

export default AboutPage;