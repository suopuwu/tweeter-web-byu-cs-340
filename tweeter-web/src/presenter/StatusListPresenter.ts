import { AuthToken, Status, User } from 'tweeter-shared'
export const PAGE_SIZE = 10

export interface StatusListView {
    addItems: (items: Status[]) => void
    displayErrorMessage: (message: string) => void
}

export class StatusListPresenter {
    private view: StatusListView
    private loadFunction
    private lastItem: Status | null = null
    hasMoreItems = true

    constructor(
        view: StatusListView,
        loadFunction: (
            authToken: AuthToken,
            user: User,
            pageSize: number,
            lastItem: Status | null
        ) => Promise<[Status[], boolean]>
    ) {
        this.view = view
        this.loadFunction = loadFunction
    }

    async loadMoreItems(authToken: AuthToken, displayedUser: User) {
        try {
            if (this.hasMoreItems) {
                let [newItems, hasMore] = await this.loadFunction(authToken, displayedUser, PAGE_SIZE, this.lastItem)

                this.hasMoreItems = hasMore
                this.lastItem = newItems[newItems.length - 1]
                this.view.addItems(newItems)
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to load items because of exception: ${error}`)
        }
    }
}
