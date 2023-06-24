import { useEffect, useState } from "react"
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

function DetailActivity({ setActive, active }) {
    const [comment, setComment] = useState("")
    return (
        <div className={active ? "detail-container active" : "detail-container"}>
            <div className="blur" onClick={() => setActive(!active)}></div>
            <div className="content">
                <input type="text" className="h2" placeholder="Untitled" />
                <div className="detail">
                    <span className="detail-title"><DateRangeOutlinedIcon />Date Created</span>
                    <span className="detail-content">25 March 2023, 16:00</span>
                </div>
                <div className="detail">
                    <span className="detail-title"><DirectionsRunOutlinedIcon />Status</span>
                    <select name="" className="detail-content" id="">
                        <option value="">To Do</option>
                        <option value="">Doing</option>
                        <option value="">Done</option>
                    </select>
                </div>
                <div className="comment">
                    <h3>Comment</h3>
                    <textarea className="p" placeholder="add a comment..." />
                </div>
                <div className="button">
                    <div className="left">
                        <button className="cancel">
                            Cancel
                        </button>
                        <button className="confirm">
                            Confirm
                        </button>
                    </div>
                    <button className="discard">
                        <DeleteIcon />
                        Discard
                    </button>
                </div>
            </div>
        </div>
    )
}


export default function TodoPage() {
    const [activity, setActivity] = useState([
        { task: 'Brush teeth', comment: "", status: "todo" },
        { task: '', comment: "", status: "todo" },
        { task: 'Brush teeth', comment: "", status: "todo" },
        { task: 'do homework', comment: "", status: "doing" },
        { task: 'run 5km', comment: "", status: "done" },
    ])
    const [todo, setTodo] = useState([])
    const [doing, setDoing] = useState([])
    const [done, setDone] = useState([])
    const [activeDetail, setActiveDetail] = useState(false)

    useEffect(() => {
        const updateStatusArrays = () => {
            const todoArr = [];
            const doingArr = [];
            const doneArr = [];

            activity.forEach((item) => {
                switch (item.status) {
                    case 'todo':
                        todoArr.push(item);
                        break;
                    case 'doing':
                        doingArr.push(item);
                        break;
                    case 'done':
                        doneArr.push(item);
                        break;
                    default:
                        break;
                }
            });

            setTodo(todoArr);
            setDoing(doingArr);
            setDone(doneArr);
        };

        updateStatusArrays();
    }, [activity]);

    function buttonNew(status) {
        let temp = [...activity]
        temp.push({ task: '', comment: '', status })
        setActivity(temp)
    }

    function seeDetail() {
        setActiveDetail(true)
    }


    return (
        <>
            <div className="todo-container">
                <div className="todo-content">
                    <div className="activity">
                        <div className="left pink">
                            <p>To Do</p>
                            <span>0</span>
                        </div>
                        <div className="right">
                            <span className="icon">&#43;
                                <span className="desc">create new</span>
                            </span>
                        </div>
                    </div>
                    {todo.map((el, i) => {
                        return (
                            <div key={i} className="content" onClick={seeDetail}>
                                {el.task}
                                {!el.task.length && <span>Untitled</span>}
                            </div>
                        )
                    })}
                    <button className="pre-content" onClick={() => buttonNew('todo')}>+ new</button>
                </div>
                <div className="todo-content">
                    <div className="activity">
                        <div className="left yellow">
                            <p>Doing &#128170;</p>
                            <span>0</span>
                        </div>
                        <div className="right">
                            <span className="icon">&#43;
                                <span className="desc">create new</span>
                            </span>
                        </div>
                    </div>
                    {doing.map((el, i) => {
                        return (
                            <div key={i} className="content" onClick={seeDetail}>
                                {el.task}{!el.task.length && <span>Untitled</span>}
                            </div>
                        )
                    })}
                    <button className="pre-content" onClick={() => buttonNew('doing')}>+ new</button>
                </div>
                <div className="todo-content">
                    <div className="activity">
                        <div className="left green">
                            <p>Done &#127937;</p>
                            <span>0</span>
                        </div>
                        <div className="right">
                            <span className="icon">&#43;
                                <span className="desc">create new</span>
                            </span>
                        </div>
                    </div>
                    {done.map((el, i) => {
                        return (
                            <div key={i} className="content" onClick={seeDetail}>
                                {el.task}{!el.task.length && <span>Untitled</span>}
                            </div>
                        )
                    })}
                    <button className="pre-content" onClick={() => buttonNew('done')}>+ new</button>
                </div>
            </div>
            <DetailActivity setActive={setActiveDetail} active={activeDetail} />
        </>

    )
}