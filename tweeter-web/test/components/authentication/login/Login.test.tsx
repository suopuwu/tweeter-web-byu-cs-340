import { MemoryRouter } from 'react-router-dom'
import Login from '../../../../src/components/authentication/login/Login'
import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { LoginPresenter } from '../../../../src/presenter/LoginPresenter'
import { instance, mock, verify } from 'ts-mockito'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { act } from 'react-dom/test-utils'

library.add(fab)

describe('Login Component: sign in button', () => {
    async function typeInFields(
        user: UserEvent,
        aliasField: HTMLElement,
        passwordField: HTMLElement,
        alias: string = 'a',
        password: string = 'b'
    ) {
        await act(async () => {
            await user.type(aliasField, alias)
            await user.type(passwordField, password)
        })
    }

    it('start disabled', () => {
        const { signInButton } = renderLoginAndGetElement('/')

        expect(signInButton).toBeDisabled()
    })

    it('enabled when both the alias and password fields have text.', async () => {
        const { signInButton, aliasField, user, passwordField } = renderLoginAndGetElement('/')
        await typeInFields(user, aliasField, passwordField)
        expect(signInButton).toBeEnabled()
    })

    it('disabled if either the alias or password field is cleared.', async () => {
        const { signInButton, aliasField, user, passwordField } = renderLoginAndGetElement('/')

        await typeInFields(user, aliasField, passwordField)

        expect(signInButton).toBeEnabled()

        await act(async () => {
            await user.clear(aliasField)
        })
        expect(signInButton).toBeDisabled()

        await act(async () => {
            await user.type(aliasField, 'a')
        })
        expect(signInButton).toBeEnabled()

        await act(async () => {
            await user.clear(passwordField)
        })
        expect(signInButton).toBeDisabled()
    })

    it("presenter's login method is called with correct parameters when the sign-in button is pressed.", async () => {
        const mockPresenter = mock<LoginPresenter>()
        const mockPresenterInstance = instance(mockPresenter)
        const originalUrl = 'https://google.com'
        const { signInButton, aliasField, user, passwordField } = renderLoginAndGetElement(originalUrl, mockPresenterInstance)

        const alias = 'testUsername'
        const password = 'testPassword'

        await typeInFields(user, aliasField, passwordField, alias, password)
        await act(async () => {
            await user.click(signInButton)
        })

        verify(mockPresenter.doLogin(alias, password, originalUrl)).once()
    })
})

function renderLogin(originalUrl: string, presenter?: LoginPresenter) {
    return render(
        <MemoryRouter>
            {!!presenter ? <Login originalUrl={originalUrl} presenter={presenter} /> : <Login originalUrl={originalUrl} />}
        </MemoryRouter>
    )
}

function renderLoginAndGetElement(originalUrl: string, presenter?: LoginPresenter) {
    const user = userEvent.setup()

    renderLogin(originalUrl, presenter)
    const signInButton = screen.getByRole('button', { name: /Sign in/i })
    const aliasField = screen.getByLabelText(/Alias/i)
    const passwordField = screen.getByLabelText(/Password/i)
    return { signInButton, aliasField, passwordField, user }
}
