import { AuthToken, FakeData, Status, User } from 'tweeter-shared'
import { useState, useRef, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import Post from '../statusItem/Post'
import useToastListener from '../toaster/ToastListenerHook'
import StatusItem from '../statusItem/StatusItem'
import StatusItemScroller from './StatusItemScroller'

export const PAGE_SIZE = 10

const StoryScroller = () => {
    return (
        <StatusItemScroller
            loadFunction={async (
                authToken: AuthToken,
                user: User,
                pageSize: number,
                lastItem: Status | null
            ): Promise<[Status[], boolean]> => FakeData.instance.getPageOfStatuses(lastItem, pageSize)}
        ></StatusItemScroller>
    )
}

export default StoryScroller
