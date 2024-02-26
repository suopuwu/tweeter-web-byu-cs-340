import { AuthToken, User } from 'tweeter-shared'
import { UserService } from '../model/UserService'

export interface UserInfoView {
    displayErrorMessage: (message: string) => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void
    clearLastInfoMessage: () => void
    currentUser: User | null
    authToken: AuthToken | null
    displayedUser: User | null
    setDisplayedUser: (user: User) => void
    isFollower: boolean
    setIsFollower: React.Dispatch<React.SetStateAction<boolean>>
    followeesCount: number
    setFolloweesCount: React.Dispatch<React.SetStateAction<number>>
    followersCount: number
    setFollowersCount: React.Dispatch<React.SetStateAction<number>>
}

export class UserInfoPresenter {
    private view
    private service
    constructor(view: UserInfoView) {
        this.view = view
        this.service = new UserService()
    }

    async setIsFollowerStatus(authToken: AuthToken, currentUser: User, displayedUser: User) {
        try {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false)
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
                )
                console.log('obtained from service')
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to determine follower status because of exception: ${error}`)
        }
    }

    async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
        try {
            this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser))
        } catch (error) {
            this.view.displayErrorMessage(`Failed to get followees count because of exception: ${error}`)
        }
    }

    async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
        try {
            this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser))
        } catch (error) {
            this.view.displayErrorMessage(`Failed to get followers count because of exception: ${error}`)
        }
    }

    async followDisplayedUser(event: React.MouseEvent) {
        event.preventDefault()
        try {
            this.view.displayInfoMessage(`Adding ${this.view.displayedUser!.name} to followers...`, 0)

            let [followersCount, followeesCount] = await this.follow(this.view.authToken!, this.view.displayedUser!)

            this.view.clearLastInfoMessage()

            this.view.setIsFollower(true)
            this.view.setFolloweesCount(followersCount)
            this.view.setFolloweesCount(followeesCount)
        } catch (error) {
            this.view.displayErrorMessage(`Failed to follow user because of exception: ${error}`)
        }
    }

    async follow(authToken: AuthToken, userToFollow: User): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the following message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000))

        // TODO: Call the server

        let followersCount = await this.service.getFollowersCount(authToken, userToFollow)
        let followeesCount = await this.service.getFolloweesCount(authToken, userToFollow)

        return [followersCount, followeesCount]
    }

    async unfollowDisplayedUser(event: React.MouseEvent): Promise<void> {
        event.preventDefault()

        try {
            this.view.displayInfoMessage(`Removing ${this.view.displayedUser!.name} from followers...`, 0)

            let [followersCount, followeesCount] = await this.unfollow(this.view.authToken!, this.view.displayedUser!)

            this.view.clearLastInfoMessage()

            this.view.setIsFollower(false)
            this.view.setFolloweesCount(followersCount)
            this.view.setFolloweesCount(followeesCount)
        } catch (error) {
            this.view.displayErrorMessage(`Failed to unfollow user because of exception: ${error}`)
        }
    }

    async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        // Pause so we can see the unfollowing message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000))

        // TODO: Call the server

        let followersCount = await this.service.getFollowersCount(authToken, userToUnfollow)
        let followeesCount = await this.service.getFolloweesCount(authToken, userToUnfollow)

        return [followersCount, followeesCount]
    }
}
