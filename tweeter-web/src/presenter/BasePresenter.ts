export interface BaseView {
    displayErrorMessage: (message: string) => void
}

export interface MessageView extends BaseView {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void
    clearLastInfoMessage: () => void
}

export class BasePresenter<ViewType extends BaseView> {
    protected view

    protected constructor(view: ViewType) {
        this.view = view
    }

    protected async tryWithReporting(operationDescription: string, operation: () => Promise<void>): Promise<void> {
        try {
            await operation()
        } catch (error) {
            console.error(error)
            this.view.displayErrorMessage(`Failed to ${operationDescription} because of exception: ${(error as Error).message}`)
        }
    }
}
