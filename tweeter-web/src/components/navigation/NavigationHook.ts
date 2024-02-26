import useToastListener from '../toaster/ToastListenerHook'
import useUserInfo from '../userInfo/UserInfoHook'
import { UserService } from '../../model/UserService'
import { NavigationPresenter, NavigationView } from '../../presenter/NavigationPresenter'

interface Navigation {
    navigateToUser: (event: React.MouseEvent) => Promise<void>
}

const useNavToUser = (): Navigation => {
    const { displayErrorMessage } = useToastListener()
    const { setDisplayedUser, currentUser, authToken } = useUserInfo()
    const view: NavigationView = { displayErrorMessage, setDisplayedUser, currentUser, authToken }

    const presenter = new NavigationPresenter(view)

    return {
        navigateToUser: async (event: React.MouseEvent): Promise<void> => {
            event.preventDefault()
            presenter.navigateToUser(presenter.extractAlias(event.target.toString()))
        },
    }
}

export default useNavToUser
