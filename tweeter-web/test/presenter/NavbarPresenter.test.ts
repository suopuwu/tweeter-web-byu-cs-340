import { anything, capture, instance, mock, spy, verify, when } from 'ts-mockito'
import { NavbarPresenter, NavbarView } from '../../src/presenter/NavbarPresenter'
import { AuthToken } from 'tweeter-shared'
import { UserService } from '../../src/model/UserService'
describe('NavbarPresenter', () => {
    let mockNavbarView: NavbarView
    let navbarPresenter: NavbarPresenter
    let mockUserService: UserService

    const authToken = new AuthToken('test', Date.now())

    beforeEach(() => {
        mockNavbarView = mock<NavbarView>()
        const mockNavbarViewInstance = instance(mockNavbarView)

        const navbarPresenterSpy = spy(new NavbarPresenter(mockNavbarViewInstance))
        navbarPresenter = instance(navbarPresenterSpy)

        mockUserService = mock<UserService>()
        const mockUserServiceInstance = instance(mockUserService)

        when(navbarPresenterSpy.service).thenReturn(mockUserServiceInstance)
    })

    it('tells view to display logging out message', async () => {
        await navbarPresenter.logOut(authToken)
        verify(mockNavbarView.displayInfoMessage('Logging Out...', 0)).once()
    })

    it('calls logout on the user service with the correct auth token', async () => {
        await navbarPresenter.logOut(authToken)
        verify(mockUserService.logout(anything())).once()
        let [capturedAuthToken] = capture(mockUserService.logout).last()
        expect(capturedAuthToken).toEqual(authToken)
    })

    it('tells the view to clear the last info message, clear the user info, and navigate to the login page', async () => {
        await navbarPresenter.logOut(authToken)

        verify(mockNavbarView.clearLastInfoMessage()).once()
        verify(mockNavbarView.clearUserInfo()).once()
        verify(mockNavbarView.navigateToLogin()).once()
    })
    it('displays an error message and does not clear the message, clear user info, or navigate to login on a failed logout', async () => {
        const error = new Error('example error')
        when(mockUserService.logout(authToken)).thenThrow(error)
        await navbarPresenter.logOut(authToken)

        verify(mockNavbarView.displayErrorMessage('Failed to log user out because of exception: example error'))
        verify(mockNavbarView.clearLastInfoMessage()).never()
        verify(mockNavbarView.clearUserInfo()).never()
        verify(mockNavbarView.navigateToLogin()).never()
    })
})
