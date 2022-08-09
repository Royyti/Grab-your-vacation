import { setUserAction, removeUserAction } from "./user.actions";

function setUserReducer(state = {}, payload) {
    return { ...payload }
}

function removeUserReducer(state = {}, payload) {
    return (payload);
}

export function userSettingsReducer(state = {}, action) {
    switch (action.type) {
        case setUserAction:
            return setUserReducer(state, action.payload);
        case removeUserAction:
            return removeUserReducer(state, action.payload);
        default:
            return state
    }
}