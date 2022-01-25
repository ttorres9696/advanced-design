declare const useDashboard: () => {
    isRightDrawerOpened: boolean;
    drawerToggleAction: (side: 'right') => void;
    isDeleteDialogOpen: boolean;
    multiple: boolean;
    onDeleteConfirm: (confirmed: boolean) => void;
    preLoading: boolean;
};
export default useDashboard;
