import { AuthToken, Status, User } from 'tweeter-shared'

export interface PostStatusView {
    post: string
    setPost: React.Dispatch<React.SetStateAction<string>>
    displayErrorMessage: (message: string, bootstrapClasses?: string | undefined) => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void
    clearLastInfoMessage: () => void
}

export class PostStatusPresenter {
    private view
    constructor(view: PostStatusView) {
        this.view = view
    }
    async submitPost(event: React.MouseEvent, authToken: AuthToken | null, currentUser: User | null) {
        event.preventDefault()

        try {
            this.view.displayInfoMessage('Posting status...', 0)

            let status = new Status(this.view.post, currentUser!, Date.now())

            await this.postStatus(authToken!, status)

            this.view.clearLastInfoMessage()
            this.view.setPost('')
            this.view.displayInfoMessage('Status posted!', 2000)
        } catch (error) {
            this.view.displayErrorMessage(`Failed to post the status because of exception: ${error}`)
        }
    }

    clearPost(event: React.MouseEvent) {
        event.preventDefault()
        this.view.setPost('')
    }

    checkButtonStatus(post: string, authToken: AuthToken | null, currentUser: User | null) {
        return !post.trim() || !authToken || !currentUser
    }
}
