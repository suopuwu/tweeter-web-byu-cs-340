import { AuthToken, User } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import { BasePresenter, BaseView, MessageView } from './BasePresenter'

export interface UserInfoView extends MessageView {
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

export class UserInfoPresenter extends BasePresenter<UserInfoView> {
    private service
    constructor(view: UserInfoView) {
        super(view)
        this.service = new UserService()
    }

    async setIsFollowerStatus(authToken: AuthToken, currentUser: User, displayedUser: User) {
        this.tryWithReporting('determine follower status', async () => {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false)
            } else {
                this.view.setIsFollower(await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!))
                console.log('obtained from service')
            }
        })
    }

    async setNumbFollowees(authToken: AuthToken, displayedUser: User) {
        this.tryWithReporting('get followees count', async () => {
            this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser))
        })
    }

    async setNumbFollowers(authToken: AuthToken, displayedUser: User) {
        this.tryWithReporting('get followers count', async () => {
            this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser))
        })
    }

    async followDisplayedUser(event: React.MouseEvent) {
        event.preventDefault()
        this.tryWithReporting('follow user', async () => {
            this.view.displayInfoMessage(`Adding ${this.view.displayedUser!.name} to followers...`, 0)

            let [followersCount, followeesCount] = await this.follow(this.view.authToken!, this.view.displayedUser!, this.view.currentUser!)

            this.view.clearLastInfoMessage()

            this.view.setIsFollower(true)
            this.view.setFolloweesCount(followersCount)
            this.view.setFolloweesCount(followeesCount)
        })
    }

    async follow(authToken: AuthToken, userToFollow: User, user: User): Promise<[followersCount: number, followeesCount: number]> {
        this.service.followUser(authToken, userToFollow.alias, user)

        let followersCount = await this.service.getFollowersCount(authToken, userToFollow)
        let followeesCount = await this.service.getFolloweesCount(authToken, userToFollow)

        return [followersCount, followeesCount]
    }

    async unfollowDisplayedUser(event: React.MouseEvent): Promise<void> {
        event.preventDefault()

        this.tryWithReporting('unfollow user', async () => {
            this.view.displayInfoMessage(`Removing ${this.view.displayedUser!.name} from followers...`, 0)

            let [followersCount, followeesCount] = await this.unfollow(
                this.view.authToken!,
                this.view.displayedUser!,
                this.view.currentUser!
            )

            this.view.clearLastInfoMessage()

            this.view.setIsFollower(false)
            this.view.setFolloweesCount(followersCount)
            this.view.setFolloweesCount(followeesCount)
        })
    }

    async unfollow(authToken: AuthToken, userToUnfollow: User, user: User): Promise<[followersCount: number, followeesCount: number]> {
        this.service.unfollowUser(authToken, userToUnfollow.alias, user)

        let followersCount = await this.service.getFollowersCount(authToken, userToUnfollow)
        let followeesCount = await this.service.getFolloweesCount(authToken, userToUnfollow)

        return [followersCount, followeesCount]
    }
}
