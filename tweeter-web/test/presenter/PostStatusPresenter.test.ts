import { anything, capture, instance, mock, spy, verify, when } from 'ts-mockito'
import { PostStatusPresenter, PostStatusView } from '../../src/presenter/PostStatusPresenter'
import { AuthToken, Status, User } from 'tweeter-shared'
import { StatusService } from '../../src/model/StatusService'
import React from 'react'

describe('PostStatusPresenter.submitPost', () => {
    let mockPostStatusView: PostStatusView
    let postStatusPresenter: PostStatusPresenter
    let mockStatusService: StatusService
    let mockEventInstance: React.MouseEvent
    let currentUser = new User('first', 'last', 'alias', 'imageurl')

    const authToken = new AuthToken('test', Date.now())

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>()
        const mockPostStatusViewInstance = instance(mockPostStatusView)

        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance))
        postStatusPresenter = instance(postStatusPresenterSpy)

        mockStatusService = mock<StatusService>()
        const mockStatusServiceInstance = instance(mockStatusService)

        mockPostStatusViewInstance.post = 'example post text'

        when(postStatusPresenterSpy.service).thenReturn(mockStatusServiceInstance)

        const mockEvent = mock<React.MouseEvent>()
        mockEventInstance = instance(mockEvent)
    })

    it('Tells the view to display a posting status message.', async () => {
        await postStatusPresenter.submitPost(mockEventInstance, authToken, currentUser)
        verify(mockPostStatusView.displayInfoMessage('Posting status...', 0)).once()
    })

    it('Calls postStatus on the post status service with the correct status string and auth token.', async () => {
        await postStatusPresenter.submitPost(mockEventInstance, authToken, currentUser)
        verify(mockPostStatusView.displayInfoMessage('Posting status...', 0)).once()

        verify(mockStatusService.postStatus(anything(), anything())).once()
        let [capturedAuthToken, capturedStatus] = capture(mockStatusService.postStatus).last()
        expect(capturedAuthToken).toEqual(authToken)
        expect(capturedStatus.post).toEqual('example post text')
    })

    it('Tells the view to clear the last info message, clear the post, and display a status posted message.', async () => {
        await postStatusPresenter.submitPost(mockEventInstance, authToken, currentUser)

        verify(mockPostStatusView.clearLastInfoMessage()).once()
        verify(mockPostStatusView.setPost('')).once()
        verify(mockPostStatusView.displayInfoMessage('Status posted!', 2000)).once()
    })

    it('Tells the view to display an error message and does not tell it to do the following: clear the last info message, clear the post, and display a status posted message.', async () => {
        const error = new Error('example error')
        when(mockStatusService.postStatus(anything(), anything())).thenThrow(error)
        await postStatusPresenter.submitPost(mockEventInstance, authToken, currentUser)

        verify(mockPostStatusView.displayErrorMessage('Failed to post the status because of exception: example error')).once()
        verify(mockPostStatusView.clearLastInfoMessage()).never()
        verify(mockPostStatusView.setPost('')).never()
        verify(mockPostStatusView.displayInfoMessage('Status posted!', 2000)).never()
    })
})
