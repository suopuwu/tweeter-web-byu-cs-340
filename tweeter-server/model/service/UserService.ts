import { User, AuthToken, FakeData } from 'tweeter-shared'
export class UserService {
    async login(alias: string, password: string): Promise<[User, AuthToken]> {
        // TODO: Replace with the result of calling the server
        let user = FakeData.instance.firstUser

        if (user === null) {
            throw new Error('Invalid alias or password')
        }

        return [user, FakeData.instance.authToken]
    }
    async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        let imageStringBase64: string = Buffer.from(userImageBytes).toString('base64')

        // TODO: Replace with the result of calling the server
        let user = FakeData.instance.firstUser

        if (user === null) {
            throw new Error('Invalid registration')
        }

        return [user, FakeData.instance.authToken]
    }

    async findUserByAlias(alias: string) {
        //todo make throw if not found
        return FakeData.instance.findUserByAlias(alias)!
    }

    async getIsFollowerStatus(authToken: AuthToken, userAlias: string, selectedUserAlias: string): Promise<boolean> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower()
    }

    async getFolloweesCount(authToken: AuthToken, user: User): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweesCount(user)
    }
    async getFollowersCount(authToken: AuthToken, user: User): Promise<number> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowersCount(user)
    }
    //todo create follow and unfollow functions
    async logout(authToken: AuthToken): Promise<void> {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000))
    }
}
