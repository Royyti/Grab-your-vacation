import { setVacationListAction, removeVacationAction, updateVacationAction, addVacationAction } from './vacations.actions';

function setVacationListReducer(state = [], payload) {
    return [...state || [], payload]
}
function addVacationReducer(state = [], payload) {
    return [...state || [], payload]
}
function removeVacationReducer(state = [], payload) {
    return (state || []).filter((vacation, idx) => idx !== payload);
}
function updateVacationReducer(state = {}, payload) {
    return (state || []).filter((vacation) => vacation.v_id !== payload.v_id).push(payload);
}

export function vacationsListReducer(state = [], action) {
    switch (action.type) {
        case setVacationListAction:
            return setVacationListReducer(state, action.payload);
        case addVacationAction:
            return addVacationReducer(state, action.payload);
        case removeVacationAction:
            return removeVacationReducer(state, action.payload);
        case updateVacationAction:
            return updateVacationReducer(state, action.payload);
        default:
            return state
    }
}





