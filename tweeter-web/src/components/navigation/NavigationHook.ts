import { AuthToken, FakeData, User } from 'tweeter-shared'
import useToastListener from '../toaster/ToastListenerHook'
import useUserInfo from '../userInfo/UserInfoHook'

interface Navigation {
    navigateToUser: (event: React.MouseEvent) => Promise<void>
}

const useNavToUser = (): Navigation => {
    const { displayErrorMessage } = useToastListener()
    const { setDisplayedUser, currentUser, authToken } = useUserInfo()

    function extractAlias(value: string): string {
        let index = value.indexOf('@')
        return value.substring(index)
    }
    async function getUser(authToken: AuthToken, alias: string): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias)
    }

    return {
        navigateToUser: async (event: React.MouseEvent): Promise<void> => {
            event.preventDefault()

            try {
                let alias = extractAlias(event.target.toString())

                let user = await getUser(authToken!, alias)

                if (!!user) {
                    if (currentUser!.equals(user)) {
                        setDisplayedUser(currentUser!)
                    } else {
                        setDisplayedUser(user)
                    }
                }
            } catch (error) {
                displayErrorMessage(`Failed to get user because of exception: ${error}`)
            }
        },
    }
}

export default useNavToUser
