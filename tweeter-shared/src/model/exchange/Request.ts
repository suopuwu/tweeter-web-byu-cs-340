import { AuthToken } from '../domain/AuthToken'
import { Status } from '../domain/Status'
import { User } from '../domain/User'

export interface TweeterRequest {}
export interface AuthenticatedRequest extends TweeterRequest {}
export interface LoginRequest extends TweeterRequest {
    username: string
    password: string
}
export interface NoRequestBody extends TweeterRequest {}
export interface RegisterRequest extends TweeterRequest {
    firstName: string
    lastName: string
    alias: string
    password: string
    userImageBytes: Uint8Array
}

export interface GetStatusListRequest extends TweeterRequest {
    user: User
    pageSize: number
    lastItem: Status | null
}
export interface PostStatusRequest extends TweeterRequest {
    newStatus: Status
}
export interface GetUserListRequest extends TweeterRequest {
    user: User
    pageSize: number
    lastItem: User | null
}

export interface GetCountRequest extends TweeterRequest {
    user: User
}
export interface ToggleFollowRequest extends TweeterRequest {
    user: User
    usernameToToggle: string
}

export interface GetUserIsFollowingRequest extends TweeterRequest {
    followerUsername: string
    followeeUsername: string
}

export interface GetUserRequest extends TweeterRequest {
    username: string
}

export interface LogoutRequest extends TweeterRequest {
    token: AuthToken
}
