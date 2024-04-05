import { AuthToken } from '../domain/AuthToken'
import { Status } from '../domain/Status'
import { User } from '../domain/User'

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
