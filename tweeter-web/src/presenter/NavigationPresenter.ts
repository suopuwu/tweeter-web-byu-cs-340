import { AuthToken, User } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import useUserInfo from '../components/userInfo/UserInfoHook'
import { BasePresenter, BaseView } from './BasePresenter'

export interface NavigationView extends BaseView {
    setDisplayedUser: (user: User) => void
    currentUser: User | null
    authToken: AuthToken | null
}

export class NavigationPresenter extends BasePresenter<NavigationView> {
    private service: UserService
    constructor(view: NavigationView) {
        super(view)
        this.service = new UserService()
    }

    async navigateToUser(alias: string): Promise<void> {
        this.tryWithReporting('get user', async () => {
            let user = await this.service.findUserByAlias(alias)

            if (!!user) {
                if (this.view.currentUser!.equals(user)) {
                    this.view.setDisplayedUser(this.view.currentUser!)
                } else {
                    this.view.setDisplayedUser(user)
                }
            }
        })
    }

    extractAlias(value: string): string {
        let index = value.indexOf('@')
        return value.substring(index)
    }
}
