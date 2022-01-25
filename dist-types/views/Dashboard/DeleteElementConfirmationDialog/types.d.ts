export interface DeleteElementConfirmationDialogProps {
    open: boolean;
    callback: (confirmed: boolean) => void;
    multiple?: boolean;
}
