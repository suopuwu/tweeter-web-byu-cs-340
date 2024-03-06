import { AuthToken } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import { BasePresenter, BaseView, MessageView } from './BasePresenter'

export interface NavbarView extends MessageView {
    clearUserInfo: () => void
}

export class NavbarPresenter extends BasePresenter<NavbarView> {
    private service
    constructor(view: NavbarView) {
        super(view)
        this.service = new UserService()
    }

    async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage('Logging Out...', 0)

        this.tryWithReporting('log user out', async () => {
            await this.service.logout(authToken)

            this.view.clearLastInfoMessage()
            this.view.clearUserInfo()
        })
    }
}
