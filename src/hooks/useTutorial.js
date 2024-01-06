import {TutorialContext}  from '../context/TutorialContext'
import {useContext} from 'react'

export const useTutorialContext = () => {
    const context = useContext(TutorialContext)
    if(!context){throw Error('useTutorialContext must be within children function')}
    return context
}