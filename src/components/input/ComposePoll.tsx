export function ComposePoll () {

    return (
        <div className="w-full h-full flex flex-col gap-2 p-2">

        <input
            className="w-full border border-twitterBorder focus:outline-none focus:ring-0 rounded-xl px-2 h-16"
            placeholder="Choice 1"
        />
        <input
            className="w-full border border-twitterBorder focus:outline-none focus:ring-0 rounded-xl px-2 h-16"
            placeholder="Choice 2"
        />

        </div>
    )

}