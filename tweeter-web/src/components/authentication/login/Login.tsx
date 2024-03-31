import './Login.css'
import 'bootstrap/dist/css/bootstrap.css'

import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthenticationFormLayout from '../AuthenticationFormLayout'
import useToastListener from '../../toaster/ToastListenerHook'
import AliasPasswordFields from '../AliasPasswordFields'
import useUserInfo from '../../userInfo/UserInfoHook'
import { LoginPresenter, LoginView } from '../../../presenter/LoginPresenter'

interface Props {
    originalUrl?: string
    presenter?: LoginPresenter
}

const Login = (props: Props) => {
    const [alias, setAlias] = useState('')
    const [password, setPassword] = useState('')

    const { displayErrorMessage } = useToastListener()
    const { updateUserInfo } = useUserInfo()

    const checkSubmitButtonStatus = (): boolean => {
        return !alias || !password
    }

    const inputFieldGenerator = () => {
        return <AliasPasswordFields setAlias={setAlias} setPassword={setPassword}></AliasPasswordFields>
    }

    const switchAuthenticationMethodGenerator = () => {
        return (
            <div className="mb-3">
                Not registered? <Link to="/register">Register</Link>
            </div>
        )
    }

    const doLogin = async () => await presenter.doLogin(alias, password, props.originalUrl)

    const view: LoginView = {
        updateUserInfo: updateUserInfo,
        displayErrorMessage: displayErrorMessage,
    }
    const presenter = props.presenter ?? new LoginPresenter(view)
    return (
        <AuthenticationFormLayout
            headingText="Please Sign In"
            submitButtonLabel="Sign in"
            oAuthHeading="Sign in with:"
            inputFieldGenerator={inputFieldGenerator}
            switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
            setRememberMe={presenter.setRememberMe}
            submitButtonDisabled={checkSubmitButtonStatus}
            submit={doLogin}
        />
    )
}

export default Login
