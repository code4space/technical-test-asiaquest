import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemon } from "../store/actions/fetch"


export default function HomePage() {

    // Test Redux
    const dispatch = useDispatch()
    const pokemon = useSelector(state => {
        return state.TeacherReducer.pokemon
    })

    useEffect(() => {
        dispatch(getPokemon())
    }, [])


    return (
        <div>Hallo</div>
    )
}