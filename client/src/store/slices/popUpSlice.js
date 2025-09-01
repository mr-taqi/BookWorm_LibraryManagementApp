import { createSlice } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const popupSlice = createSlice ({
    name: "popup",
    initialState: {
        settingPopup: false,
        addBookPopup: false,
        readBookPopup: false,
        recordBookkPopup: false,
        returnBookPopup: false,
        addNewAdminPopup: false,
    },

    reducers: {
        toggleSettingPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        toggleAddBookPopup(state) {
            state.addBookPopup = !state.addBookPopup;
        },
        toggleReadBookPopup(state) {
            state.readBookPopup = !state.readBookPopup;
        },
        toggleRecordBookPopup(state) {
            state.recordBookkPopup = !state.recordBookkPopup;
        },
        togglAddNewAdminPopup(state) {
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        toggleReturnBookPopup(state) {
            state.returnBookPopup = !state.returnBookPopup;
        },
        toggleCloseAllPopup(state) {
            state.addBookPopup = false;
            state.readBookPopup = false;
            state.returnBookPopup = false;
            state.recordBookkPopup = false;
            state.addNewAdminPopup = false;
            state.settingPopup = false;
        },
    },

});

export const {
    toggleSettingPopup,
    toggleAddBookPopup,
    toggleReadBookPopup,
    toggleRecordBookPopup,
    toggleReturnBookPopup,
    togglAddNewAdminPopup,
    toggleCloseAllPopup
} = popupSlice.actions;
export default popupSlice.reducer;