import { Status } from 'tweeter-shared'
import { useState, useRef, useEffect, ReactNode } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useToastListener from '../toaster/ToastListenerHook'
import useUserInfo from '../userInfo/UserInfoHook'
import { PagedListPresenter, PagedListView } from '../../presenter/PagedListPresenter'

export const PAGE_SIZE = 10

interface Props {
    presenterGenerator: (view: PagedListView<any>) => PagedListPresenter<any, any>
    itemComponentGenerator: (item: any, key: number) => ReactNode
}

const ItemScroller = (props: Props) => {
    const { displayErrorMessage } = useToastListener()
    const [items, setItems] = useState<Status[]>([])

    // Required to allow the addItems method to see the current value of 'items'
    // instead of the value from when the closure was created.
    const itemsReference = useRef(items)
    itemsReference.current = items

    const view: PagedListView<Status> = {
        addItems: (newItems: Status[]) => setItems([...itemsReference.current, ...newItems]),
        displayErrorMessage: displayErrorMessage,
    }

    const [presenter] = useState(props.presenterGenerator(view))

    const { displayedUser, setDisplayedUser, currentUser, authToken } = useUserInfo()

    // Load initial items
    useEffect(() => {
        loadMoreItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function loadMoreItems() {
        await presenter.loadMoreItems(authToken!, displayedUser!)
    }

    return (
        <div className="container px-0 overflow-visible vh-100">
            <InfiniteScroll
                className="pr-0 mr-0"
                dataLength={items.length}
                next={loadMoreItems}
                hasMore={presenter.hasMoreItems}
                loader={<h4>Loading...</h4>}
            >
                {items.map((item, index) => props.itemComponentGenerator(item, index))}
            </InfiniteScroll>
        </div>
    )
}
export default ItemScroller
