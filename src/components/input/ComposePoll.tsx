export function ComposePoll () {

    return (
        <div className="w-full h-full flex flex-col gap-2 px-4 pt-4 border border-twitterBorder rounded-2xl mb-4">

        <div className="flex flex-col w-full gap-4 mb-4">
        <div className="flex w-full flex-col gap-2">
          <p className="pl-1 text-twitterTextAlt font-bold">
            Choice 1
          </p>
          <input
            className="w-full border border-twitterBorder focus:outline-none focus:ring-0 rounded-xl px-2 h-12"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="pl-1 text-twitterTextAlt font-bold">
            Choice 2
          </p>
          <input
            className="w-full border border-twitterBorder focus:outline-none focus:ring-0 rounded-xl px-2 h-12"
          />
        </div>
        </div>

        <hr className="text-twitterBorder"/>

        <div
        className={`hover:cursor-pointer text-red-500 flex items-center gap-2 justify-center h-10 rounded-full`}
      >
        <p className="">Remove Poll</p>
      </div>

        <div>

        </div>


        </div>
    )

}