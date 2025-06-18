type LoadMoreForFeedProps = {
    triggerRef: (node?: Element | null) => void
}

export function LoadMoreForFeed ({triggerRef}: LoadMoreForFeedProps) {

    

    return  (
      
    <div className="w-full flex justify-center items-center h-16">
        <div ref={triggerRef} className="h-10" />
        <p className="border-(--color-main) border px-6 py-2 rounded-2xl">End of feed</p>
    </div> 

    )

}