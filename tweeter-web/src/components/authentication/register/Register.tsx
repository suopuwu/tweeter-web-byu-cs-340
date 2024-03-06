import './Register.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ChangeEvent, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthenticationFormLayout from '../AuthenticationFormLayout'
import { Buffer } from 'buffer'
import useToastListener from '../../toaster/ToastListenerHook'
import useUserInfo from '../../userInfo/UserInfoHook'
import { RegisterPresenter, RegisterView } from '../../../presenter/RegisterPresenter'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [alias, setAlias] = useState('')
    const [password, setPassword] = useState('')
    const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array())
    const [imageUrl, setImageUrl] = useState<string>('')

    const navigate = useNavigate()
    const { updateUserInfo } = useUserInfo()
    const { displayErrorMessage } = useToastListener()

    const checkSubmitButtonStatus = (): boolean => {
        return !firstName || !lastName || !alias || !password || !imageUrl
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        presenter.handleImageFile(file)
    }

    const inputFieldGenerator = () => {
        return (
            <>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="firstNameInput"
                        placeholder="First Name"
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="firstNameInput">First Name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="lastNameInput"
                        placeholder="Last Name"
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last Name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="aliasInput"
                        placeholder="name@example.com"
                        onChange={(event) => setAlias(event.target.value)}
                    />
                    <label htmlFor="aliasInput">Alias</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="passwordInput">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="file"
                        className="d-inline-block py-5 px-4 form-control bottom"
                        id="imageFileInput"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="imageFileInput">User Image</label>
                    <img src={imageUrl} className="img-thumbnail" alt=""></img>
                </div>
            </>
        )
    }

    const switchAuthenticationMethodGenerator = () => {
        return (
            <div className="mb-3">
                Algready registered? <Link to="/login">Sign in</Link>
            </div>
        )
    }

    const view: RegisterView = {
        updateUserInfo,
        displayErrorMessage,
        setImageBytes,
        setImageUrl,
    }

    const presenter = new RegisterPresenter(view)
    const doRegister = async () => await presenter.doRegister(firstName, lastName, alias, password, imageBytes)

    return (
        <AuthenticationFormLayout
            headingText="Please Register"
            submitButtonLabel="Register"
            oAuthHeading="Register with:"
            inputFieldGenerator={inputFieldGenerator}
            switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
            setRememberMe={presenter.setRememberMe}
            submitButtonDisabled={checkSubmitButtonStatus}
            submit={doRegister}
        />
    )
}

export default Register
