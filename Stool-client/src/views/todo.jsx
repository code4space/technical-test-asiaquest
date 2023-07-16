import { useEffect, useState } from "react";
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "../store/actions/noteAction";
import axios from "axios";
import { baseUrl } from "../constant/url";

function DetailActivity({ createdAt, discard, setActive, active, setComment, comment, setStatus, status, setTask, task, confirm }) {
    return (
        <div className={active ? "detail-container active" : "detail-container"}>
            <div className="blur" onClick={() => setActive(!active)}></div>
            <div className="content">
                <input type="text" className="h2" placeholder="Untitled" value={task} onChange={(e) => setTask(e.target.value)} />
                <div className="detail">
                    <span className="detail-title"><DateRangeOutlinedIcon />Date Created</span>
                    <span className="detail-content">{createdAt}</span>
                </div>
                <div className="detail">
                    <span className="detail-title"><DirectionsRunOutlinedIcon />Status</span>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="detail-content">
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="comment">
                    <h3>Comment</h3>
                    <textarea className="p" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="add a comment..." />
                </div>
                <div className="button">
                    <div className="left">
                        <button className="cancel" onClick={() => setActive(!active)}>
                            Cancel
                        </button>
                        <button className="confirm" onClick={confirm}>
                            Confirm
                        </button>
                    </div>
                    <button className="discard" onClick={discard}>
                        <DeleteIcon />
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TodoPage() {
    const [activity, setActivity] = useState([]);
    const [comment, setComment] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [task, setTask] = useState("");
    const [id, setId] = useState("");
    const [status, setStatus] = useState("Doing");
    const [todo, setTodo] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);
    const [activeDetail, setActiveDetail] = useState(false);
    const dispatch = useDispatch();
    const todoSelector = useSelector(state => state.NoteReducer.todo);

    const confirm = async () => {
        await axios.patch(`${baseUrl}/todo/${id}`, { task, status, comment }, { headers: { access_token: localStorage.getItem('access_token') } });
        dispatch(getTodo());
        setActiveDetail(false)
    };

    const discard = async () => {
        await axios.delete(`${baseUrl}/todo/${id}`, { headers: { access_token: localStorage.getItem('access_token') } });
        dispatch(getTodo());
        setActiveDetail(false)
    };

    useEffect(() => {
        dispatch(getTodo());
    }, [dispatch]);

    useEffect(() => {
        const updateStatusArrays = () => {
            const todoArr = [];
            const doingArr = [];
            const doneArr = [];

            todoSelector.forEach((item) => {
                switch (item.status) {
                    case 'To Do':
                        todoArr.push(item);
                        break;
                    case 'Doing':
                        doingArr.push(item);
                        break;
                    case 'Done':
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
    }, [todoSelector]);

    const buttonNew = async (status) => {
        await axios({
            url: `${baseUrl}/todo`,
            method: 'POST',
            headers: { access_token: localStorage.getItem('access_token') },
            data: { status: status, task: "", comment: "" },
        });
        dispatch(getTodo())
    };

    const seeDetail = (id) => {
        setActiveDetail(true);
        const temp = todoSelector.find(el => el.id === id);
        setComment(temp.comment);
        setStatus(temp.status);
        setTask(temp.task);
        setCreatedAt(temp.createdAt);
        setId(id);
    };

    return (
        <>
            <div className="todo-container">
                <div className="todo-content">
                    <div className="activity">
                        <div className="left pink">
                            <p>To Do</p>
                            <span>{todo.length}</span>
                        </div>
                        <div className="right">
                            <span className="icon">&#43;
                                <span className="desc">create new</span>
                            </span>
                        </div>
                    </div>
                    {todo.map((el, i) => (
                        <div key={i} className="content" onClick={() => seeDetail(el.id)}>
                            {el.task || <span>Untitled</span>}
                        </div>
                    ))}
                    <button className="pre-content" onClick={() => buttonNew('To Do')}>+ new</button>
                </div>
                <div className="todo-content">
                    <div className="activity">
                        <div className="left yellow">
                            <p>Doing &#128170;</p>
                            <span>{doing.length}</span>
                        </div>
                        <div className="right">
                            <span className="icon">&#43;
                                <span className="desc">create new</span>
                            </span>
                        </div>
                    </div>
                    {doing.map((el, i) => (
                        <div key={i} className="content" onClick={() => seeDetail(el.id)}>
                            {el.task || <span>Untitled</span>}
                        </div>
                    ))}
                    <button className="pre-content" onClick={() => buttonNew('Doing')}>+ new</button>
                </div>
                <div className="todo-content">
                    <div className="activity">
                        <div className="left green">
                            <p>Done &#127937;</p>
                            <span>{done.length}</span>
                        </div>
                        <div className="right">
                            <span className="icon">&#43;
                                <span className="desc">create new</span>
                            </span>
                        </div>
                    </div>
                    {done.map((el, i) => (
                        <div key={i} className="content" onClick={() => seeDetail(el.id)}>
                            {el.task || <span>Untitled</span>}
                        </div>
                    ))}
                    <button className="pre-content" onClick={() => buttonNew('Done')}>+ new</button>
                </div>
            </div>
            <DetailActivity
                setStatus={setStatus}
                status={status}
                comment={comment}
                setComment={setComment}
                setActive={setActiveDetail}
                active={activeDetail}
                setTask={setTask}
                task={task}
                discard={discard}
                confirm={confirm}
                createdAt={createdAt}
            />
        </>
    );
}
