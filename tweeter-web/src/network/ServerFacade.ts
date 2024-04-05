import {
    AuthenticateResponse,
    AuthToken,
    LoginRequest,
    TweeterRequest,
    TweeterResponse,
    NoRequestBody,
    GetCountResponse,
    GetStatusListRequest,
    GetStatusListResponse,
    GetUserIsFollowingResponse,
    GetUserListResponse,
    GetUserResponse,
    PostStatusResponse,
    RegisterRequest,
    ToggleFollowRequest,
    ToggleFollowResponse,
    GetUserListRequest,
    PostStatusRequest,
} from 'tweeter-shared'
import { ClientCommunicator } from './ClientCommunicator'

export class ServerFacade {
    private SERVER_URL = 'https://a18dq1m8oj.execute-api.us-west-2.amazonaws.com/testing'

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL)

    private async useCommunicator<RequestType extends TweeterRequest, ResponseType extends TweeterResponse>(
        endpoint: string,
        request: RequestType,
        method: string,
        authToken: AuthToken | undefined
    ): Promise<ResponseType> {
        const response = await this.clientCommunicator.sendRequest<RequestType>(request, endpoint, method, authToken)
        const parsedResponse: ResponseType = JSON.parse(response)
        console.log(parsedResponse)
        if (!parsedResponse.success)
            throw new Error(
                parsedResponse.message ?? `Response from ${endpoint} has no success value. The server probably sent an invalid response.`
            )
        return parsedResponse
    }

    private async postFunction<RequestType extends TweeterRequest, ResponseType extends TweeterResponse>(
        endpoint: string,
        request: RequestType,
        authToken: AuthToken | undefined = undefined
    ): Promise<ResponseType> {
        return await this.useCommunicator<RequestType, ResponseType>(endpoint, request, 'post', authToken)
    }

    private async getFunction<ResponseType extends TweeterResponse>(
        endpoint: string,
        authToken: AuthToken | undefined = undefined
    ): Promise<ResponseType> {
        return await this.useCommunicator<NoRequestBody, ResponseType>(endpoint, {}, 'get', authToken)
    }
    //todolist
    //3. finish creating all the lambdas which return fake data and uploading them, as well as hooking them up with the api gateway.
    //4. Create automated tests
    //5. create uml diagrams

    signIn = async (request: LoginRequest) => await this.postFunction<LoginRequest, AuthenticateResponse>('/auth/sign-in', request)

    register = async (request: RegisterRequest) => await this.postFunction<RegisterRequest, AuthenticateResponse>('/auth/register', request)

    signOut = async (authToken: AuthToken) => await this.postFunction<NoRequestBody, AuthenticateResponse>('/auth/sign-out', {}, authToken)

    postStatus = async (request: PostStatusRequest, authToken: AuthToken) =>
        await this.postFunction<PostStatusRequest, PostStatusResponse>('/content/post-status', request, authToken)

    follow = async (request: ToggleFollowRequest, usernameToFollow: string, authToken: AuthToken) =>
        await this.postFunction<ToggleFollowRequest, ToggleFollowResponse>(`/u/${usernameToFollow}/follow`, request, authToken)

    unfollow = async (request: ToggleFollowRequest, usernameToUnfollow: string, authToken: AuthToken) =>
        await this.postFunction<ToggleFollowRequest, ToggleFollowResponse>(`/u/${usernameToUnfollow}/unfollow`, request, authToken)

    //ones that use get do not have a request body
    getUser = async (username: string) => await this.getFunction<GetUserResponse>(`/u/${username}`)

    getFolloweeCount = async (username: string, authToken: AuthToken) =>
        await this.getFunction<GetCountResponse>(`/u/${username}/count/followees`, authToken)

    getFollowerCount = async (username: string, authToken: AuthToken) =>
        await this.getFunction<GetCountResponse>(`/u/${username}/count/followers`, authToken)

    getUserIsFollowing = async (username: string, comparisonUsername: string, authToken: AuthToken) =>
        await this.getFunction<GetUserIsFollowingResponse>(`/u/${username}/is-following/${comparisonUsername}`, authToken)

    //these ones must use post to have a request body, even if get may appear to fit better
    getFeed = async (request: GetStatusListRequest, authToken: AuthToken) =>
        await this.postFunction<GetStatusListRequest, GetStatusListResponse>('/content/feed', request, authToken)

    getStory = async (request: GetStatusListRequest, authToken: AuthToken) =>
        await this.postFunction<GetStatusListRequest, GetStatusListResponse>('/content/story', request, authToken)

    getFollowees = async (request: GetUserListRequest, authToken: AuthToken) =>
        await this.postFunction<GetUserListRequest, GetUserListResponse>('/content/followees', request, authToken)

    getFollowers = async (request: GetUserListRequest, authToken: AuthToken) =>
        await this.postFunction<GetUserListRequest, GetUserListResponse>('/content/followers', request, authToken)
}
