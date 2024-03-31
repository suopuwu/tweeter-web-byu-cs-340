import { MemoryRouter } from 'react-router-dom'
import PostStatus from '../../../src/components/postStatus/PostStatus'
import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { PostStatusPresenter } from '../../../src/presenter/PostStatusPresenter'
import { anything, instance, mock, verify } from 'ts-mockito'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { act } from 'react-dom/test-utils'
import useUserInfo from '../../../src/components/userInfo/UserInfoHook'
import { AuthToken, User } from 'tweeter-shared'

library.add(fab)

jest.mock('../../../src/components/userInfo/UserInfoHook', () => ({
    ...jest.requireActual('../../../src/components/userInfo/UserInfoHook'),
    __esModule: true,
    default: jest.fn(),
}))

describe('PostStatus Component', () => {
    const loggedInUser = new User('first', 'last', 'alias', 'imageurl')
    const authToken = new AuthToken('test', Date.now())

    beforeAll(() => {
        ;(useUserInfo as jest.Mock).mockReturnValue({
            currentUser: loggedInUser,
            authToken: authToken,
        })
    })

    it('Post Status and Clear buttons both start disabled.', () => {
        const { postButton, clearButton } = renderPostStatusAndGetElement()

        expect(postButton).toBeDisabled()
        expect(clearButton).toBeDisabled()
    })

    it('Both buttons are enabled when the text field has text.', async () => {
        const { postButton, clearButton, postField, user } = renderPostStatusAndGetElement()
        await act(async () => {
            await user.type(postField, 'text')
        })
        expect(postButton).toBeEnabled()
        expect(clearButton).toBeEnabled()
    })

    it('Both buttons are disabled when the text field is cleared.', async () => {
        const { postButton, clearButton, postField, user } = renderPostStatusAndGetElement()
        await act(async () => {
            await user.type(postField, 'text')
            expect(postButton).toBeEnabled()
            expect(clearButton).toBeEnabled()
        })

        await act(async () => {
            await user.click(clearButton)
        })
        expect(postButton).toBeDisabled()
        expect(clearButton).toBeDisabled()
    })

    it("The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.", async () => {
        const mockPresenter = mock<PostStatusPresenter>()
        const mockPresenterInstance = instance(mockPresenter)
        const { postButton, postField, user } = renderPostStatusAndGetElement(mockPresenterInstance)

        await act(async () => {
            await user.type(postField, 'text')
            await user.click(postButton)
        })

        verify(mockPresenter.submitPost(anything(), authToken, loggedInUser)).once()
    })
})

function renderPostStatus(presenter?: PostStatusPresenter) {
    return render(<MemoryRouter>{!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}</MemoryRouter>)
}

function renderPostStatusAndGetElement(presenter?: PostStatusPresenter) {
    const user = userEvent.setup()

    renderPostStatus(presenter)
    const postButton = screen.getByRole('button', { name: /Post Status/i })
    const clearButton = screen.getByRole('button', { name: /Clear/i })
    const postField = screen.getByPlaceholderText(/What's on your mind?/i)
    return { postButton, clearButton, postField, user }
}
