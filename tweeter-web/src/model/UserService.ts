import { User, AuthToken, FakeData } from 'tweeter-shared'
import { ServerFacade } from '../network/ServerFacade'
import { BaseService } from './BaseService'
import { Buffer } from 'buffer'
export class UserService extends BaseService {
    async login(alias: string, password: string): Promise<[User, AuthToken]> {
        let response = await this.serverFacade.signIn({ username: alias, password: password })
        console.log(response)
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
            userImageBytes: userImageBytes,
        })

        if (response.user === null) {
            throw new Error('Invalid registration')
        }

        return [response.user, response.token!]
    }

    async findUserByAlias(alias: string) {
        let response = await this.serverFacade.getUser(alias)
        if (response.user === null) {
            throw new Error('User not found')
        }
        return response.user
    }

    async getIsFollowerStatus(authToken: AuthToken, user: User, selectedUser: User): Promise<boolean> {
        let response = await this.serverFacade.getUserIsFollowing(user.alias, selectedUser.alias, authToken)
        return response.isFollower
    }

    async getFolloweesCount(authToken: AuthToken, user: User): Promise<number> {
        let response = await this.serverFacade.getFolloweeCount(user.alias, authToken)
        return response.count
    }
    async getFollowersCount(authToken: AuthToken, user: User): Promise<number> {
        let response = await this.serverFacade.getFollowerCount(user.alias, authToken)
        return response.count
    }

    async logout(authToken: AuthToken): Promise<void> {
        await this.serverFacade.signOut(authToken)
    }
}
