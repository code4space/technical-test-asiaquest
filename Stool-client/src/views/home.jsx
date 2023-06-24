import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../store/actions/teacherAction";


export default function HomePage() {

    // Test Redux
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => {
        return state.TeacherReducer.pokemon;
    });

    // console.log(pokemon)

    useEffect(() => {
        dispatch(getPokemon());
    }, []);

    return (
        <div className="home">
            <h1>You have no assignments at this time</h1>
            <p>
                If you find yourself with nothing to do, you can either work on
                completing your existing to-do list or create a new one.
            </p>
        </div>
    );
}
