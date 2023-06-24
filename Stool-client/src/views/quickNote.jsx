import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuickNote } from '../store/actions/noteAction';
import { baseUrl } from '../constant/url';
import axios from 'axios';

function Note({ options = false, id }) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(true);
    const [title, setTitle] = useState('This is title');
    const [content, setContent] = useState('This is my note');
    const [titleTemp, setTitleTemp] = useState('');
    const [contentTemp, setContentTemp] = useState('');

    useEffect(() => {
        if (options) {
            setActive(options.active);
            setTitle(options.title);
            setContent(options.description);
            setTitleTemp(options.title);
            setContentTemp(options.description);
        } else {
            setTitleTemp(title);
            setContentTemp(content);
        }
    }, [options, title, content]);

    async function handleConfirm() {
        setActive(false);

        await axios({
            url: `${baseUrl}/quick-note/${id}`,
            method: 'PATCH',
            headers: { access_token: localStorage.getItem('access_token') },
            data: { title: titleTemp, description: contentTemp },
        });
        dispatch(getQuickNote());
    }

    function cancel() {
        setActive(false);
    }

    function edit() {
        setActive(true);
        setTitleTemp(title);
        setContentTemp(content);
    }

    async function handleDiscard() {
        await axios({
            url: `${baseUrl}/quick-note/${id}`,
            method: 'DELETE',
            headers: { access_token: localStorage.getItem('access_token') },
        });
        dispatch(getQuickNote());
    }

    return (
        <div className={active ? 'note active' : 'note'}>
            {active ? (
                <>
                    <input
                        type="text"
                        className="h2"
                        placeholder="write your title"
                        value={titleTemp}
                        onChange={(e) => setTitleTemp(e.target.value)}
                    />
                    <textarea
                        className="p"
                        placeholder="write your note here.."
                        value={contentTemp}
                        onChange={(e) => setContentTemp(e.target.value)}
                    />
                    <div className="button">
                        <div className="left">
                            <button className="cancel" onClick={cancel}>
                                Cancel
                            </button>
                            <button className="confirm" onClick={handleConfirm}>
                                Confirm
                            </button>
                        </div>
                        <button className="discard" onClick={handleDiscard}>
                            <DeleteIcon />
                            Discard
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2>
                        {title}
                        <b onClick={edit}>&#9998;</b>
                    </h2>
                    <p>{content}</p>
                </>
            )}
        </div>
    );
}

export default function QuickNotePage() {
    const dispatch = useDispatch();
    const quickNote = useSelector(state => state.NoteReducer.quickNote);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getQuickNote());
    }, [dispatch]);

    useEffect(() => {
        setOptions(quickNote);
        setIsLoading(false);
    }, [quickNote]);

    async function handleAdd() {
        await axios({
            url: `${baseUrl}/quick-note`,
            method: 'POST',
            headers: { access_token: localStorage.getItem('access_token') },
            data: { title: 'write your title', description: 'write your note here..' }
        });
        dispatch(getQuickNote());
    }

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="quicknote-container">
                {options.map((el, i) => (
                    <Note id={el.id} key={i} options={el} />
                ))}
                <button className="add" onClick={handleAdd}>
                    add +
                </button>
            </div>
        );
    }
}
