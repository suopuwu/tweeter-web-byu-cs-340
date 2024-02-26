import { AuthToken, Status, User } from 'tweeter-shared'
import { useState, useRef, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useToastListener from '../toaster/ToastListenerHook'
import StatusItem from '../statusItem/StatusItem'
import useUserInfo from '../userInfo/UserInfoHook'
import { StatusListPresenter, StatusListView } from '../../presenter/StatusListPresenter'

export const PAGE_SIZE = 10

interface Props {
    loadFunction: (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ) => Promise<[Status[], boolean]>
}

const StatusItemScroller = (props: Props) => {
    const { displayErrorMessage } = useToastListener()
    const [items, setItems] = useState<Status[]>([])

    // Required to allow the addItems method to see the current value of 'items'
    // instead of the value from when the closure was created.
    const itemsReference = useRef(items)
    itemsReference.current = items

    const view: StatusListView = {
        addItems: (newItems: Status[]) => setItems([...itemsReference.current, ...newItems]),
        displayErrorMessage: displayErrorMessage,
    }

    const presenter = new StatusListPresenter(view, props.loadFunction)
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
                {items.map((item, index) => (
                    <StatusItem key={index} status={item}></StatusItem>
                ))}
            </InfiniteScroll>
        </div>
    )
}
export default StatusItemScroller
