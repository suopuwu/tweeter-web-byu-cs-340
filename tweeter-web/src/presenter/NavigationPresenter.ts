import { AuthToken, User } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import useUserInfo from '../components/userInfo/UserInfoHook'

export interface NavigationView {
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void
    setDisplayedUser: (user: User) => void
    currentUser: User | null
    authToken: AuthToken | null
}

export class NavigationPresenter {
    private view
    private service: UserService
    constructor(view: NavigationView) {
        this.view = view
        this.service = new UserService()
    }

    async navigateToUser(alias: string): Promise<void> {
        try {
            let user = await this.service.findUserByAlias(alias)

            if (!!user) {
                if (this.view.currentUser!.equals(user)) {
                    this.view.setDisplayedUser(this.view.currentUser!)
                } else {
                    this.view.setDisplayedUser(user)
                }
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`)
        }
    }

    extractAlias(value: string): string {
        let index = value.indexOf('@')
        return value.substring(index)
    }
}
