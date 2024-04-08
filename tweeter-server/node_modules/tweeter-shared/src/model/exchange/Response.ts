import { AuthToken } from '../domain/AuthToken'
import { Status } from '../domain/Status'
import { User } from '../domain/User'

//for responses containing non primitive data types, they must be parsed.
export const responseParser = {
    authenticate: (res: AuthenticateResponse): AuthenticateResponse => {
        if (res.user) res.user = User.fromJson(JSON.stringify(res.user))
        if (res.token) res.token = AuthToken.fromJson(JSON.stringify(res.token))
        return res
    },
    getUser: (res: GetUserResponse): GetUserResponse => {
        if (res.user) res.user = User.fromJson(JSON.stringify(res.user))!
        return res
    },
    getStatusList: (res: GetStatusListResponse): GetStatusListResponse => {
        if (res.statuses) res.statuses = Array.from(res.statuses, (status) => Status.fromJson(JSON.stringify(status))!)
        return res
    },
    getUserList: (res: GetUserListResponse): GetUserListResponse => {
        if (res.users) res.users = Array.from(res.users, (user) => User.fromJson(JSON.stringify(user))!)
        return res
    },
}
export interface TweeterResponse {
    success: boolean
    message: string | null
}

export interface AuthenticateResponse extends TweeterResponse {
    user: User | null
    token: AuthToken | null
}

export interface GetUserResponse extends TweeterResponse {
    user: User
}

export interface GetUserIsFollowingResponse extends TweeterResponse {
    isFollower: boolean
}

export interface GetCountResponse extends TweeterResponse {
    count: number
}

export interface GetStatusListResponse extends TweeterResponse {
    statuses: Status[]
    hasMore: boolean
}

export interface GetUserListResponse extends TweeterResponse {
    users: User[]
    hasMore: boolean
}

export interface PostStatusResponse extends TweeterResponse {}
export interface ToggleFollowResponse extends TweeterResponse {}
