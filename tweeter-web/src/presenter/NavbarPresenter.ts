import { AuthToken } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import { BasePresenter, BaseView, MessageView } from './BasePresenter'

export interface NavbarView extends MessageView {
    clearUserInfo: () => void
    navigateToLogin: () => void
}

export class NavbarPresenter extends BasePresenter<NavbarView> {
    private _service
    constructor(view: NavbarView) {
        super(view)
        this._service = new UserService()
    }

    get service() {
        return this._service
    }

    async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage('Logging Out...', 0)

        this.tryWithReporting('log user out', async () => {
            await this.service.logout(authToken)

            this.view.clearLastInfoMessage()
            this.view.clearUserInfo()
            this.view.navigateToLogin()
        })
    }
}
