import { AuthToken, User } from 'tweeter-shared'

export interface UserItemView {
    addItems: (items: User[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class UserItemPresenter {
    private _view: UserItemView
    protected _hasMoreItems = true
    protected constructor(view: UserItemView) {
        this._view = view
    }

    protected get view() {
        return this._view
    }

    abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void

    get hasMoreItems() {
        return this._hasMoreItems
    }
    protected set hasMoreItems(val) {
        this._hasMoreItems = val
    }
}
