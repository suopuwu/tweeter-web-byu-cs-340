import { User, AuthToken, FakeData } from 'tweeter-shared'
import { BaseService } from './BaseService'
import { Buffer } from 'buffer'
export class UserService extends BaseService {
    async login(alias: string, password: string): Promise<[User, AuthToken]> {
        let response = await this.serverFacade.signIn({ username: alias, password: password })
        if (response.user === null) {
            throw new Error('Invalid alias or password')
        }

        return [response.user, response.token!]
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
        let response = await this.serverFacade.register({
            firstName: firstName,
            lastName: lastName,
            alias: alias,
            password: password,
            imageStringBase64: imageStringBase64,
        })

        if (response.user === null) {
            throw new Error('Invalid registration')
        }

        return [response.user, response.token!]
    }

    async findUserByAlias(alias: string) {
        let response = await this.serverFacade.getUser({ username: alias })
        if (response.user === null) {
            throw new Error('User not found')
        }
        return response.user
    }

    async getIsFollowerStatus(authToken: AuthToken, user: User, selectedUser: User): Promise<boolean> {
        let response = await this.serverFacade.getUserIsFollowing(user.alias, selectedUser.alias, {
            followerUsername: user.alias,
            followeeUsername: selectedUser.alias,
            authToken: authToken,
        })
        return response.isFollower
    }

    async getFolloweesCount(authToken: AuthToken, user: User): Promise<number> {
        let response = await this.serverFacade.getFolloweeCount(user.alias, { user: user, authToken: authToken })
        return response.count
        return 0
    }
    async getFollowersCount(authToken: AuthToken, user: User): Promise<number> {
        let response = await this.serverFacade.getFollowerCount(user.alias, { user: user, authToken: authToken })
        return response.count
        return 0
    }

    async logout(authToken: AuthToken): Promise<void> {
        await this.serverFacade.signOut({ authToken: authToken })
    }

    async followUser(authToken: AuthToken, usernameToFollow: string, user: User): Promise<void> {
        await this.serverFacade.follow({ usernameToToggle: usernameToFollow, authToken: authToken, user: user })
    }

    async unfollowUser(authToken: AuthToken, usernameToUnfollow: string, user: User): Promise<void> {
        await this.serverFacade.unfollow({ usernameToToggle: usernameToUnfollow, authToken: authToken, user: user })
    }
}
