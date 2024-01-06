import {createContext, useReducer} from 'react'

export const TutorialContext = createContext()

export const tutorialReducer = (state, action) => {
    switch(action.type){
        case 'INC':
            return {stage: state.stage + 1}
        case 'DEC':
            return {stage: state.stage - 1}
        default:
            return state
    }
}

export const TutorialProvider = ({children}) => {
    const [state, dispatch ] = useReducer(tutorialReducer, {stage: 0})

    return(
    <TutorialContext.Provider value = {{...state, dispatch}}>
        {children}
    </TutorialContext.Provider>
    )
}