import { User, AuthToken } from 'tweeter-shared'
import { UserService } from '../model/UserService'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { Buffer } from 'buffer'
import { BasePresenter, BaseView } from './BasePresenter'
import { AuthenticationPresenter, AuthenticationView } from './AuthenticationPresenter'

export interface RegisterView extends AuthenticationView {
    setImageBytes: React.Dispatch<React.SetStateAction<Uint8Array>>
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
}

export class RegisterPresenter extends AuthenticationPresenter<RegisterView> {
    async doRegister(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array) {
        this.attemptAuthentication(async () => await this.service.register(firstName, lastName, alias, password, imageBytes))
    }

    handleImageFile(file: File | undefined) {
        if (file) {
            this.view.setImageUrl(URL.createObjectURL(file))

            const reader = new FileReader()
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imageStringBase64 = event.target?.result as string

                // Remove unnecessary file metadata from the start of the string.
                const imageStringBase64BufferContents = imageStringBase64.split('base64,')[1]

                const bytes: Uint8Array = Buffer.from(imageStringBase64BufferContents, 'base64')

                this.view.setImageBytes(bytes)
            }
            reader.readAsDataURL(file)
        } else {
            this.view.setImageUrl('')
            this.view.setImageBytes(new Uint8Array())
        }
    }
}
