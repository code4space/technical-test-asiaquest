import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutine } from '../store/actions/noteAction';
import axios from 'axios';
import { baseUrl } from '../constant/url';

function Note({ options = false, id }) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(true);
    const [title, setTitle] = useState('This is title');
    const [content, setContent] = useState([]);
    const [titleTemp, setTitleTemp] = useState('');
    const [contentTemp, setContentTemp] = useState([]);

    async function handleConfirm() {
        await axios({
            url: `${baseUrl}/routine/${id}`,
            method: 'PATCH',
            headers: { access_token: localStorage.getItem('access_token') },
            data: { title: titleTemp, list: contentTemp }
        });
        dispatch(getRoutine());
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
            url: `${baseUrl}/routine/${id}`,
            method: 'DELETE',
            headers: { access_token: localStorage.getItem('access_token') },
        });
        dispatch(getRoutine());
    }

    function handleChange(e, index) {
        const temp = [...contentTemp];
        temp[index].desc = e.target.value;
        setContentTemp(temp);
    }

    function deleteOption(index) {
        const temp = [...contentTemp];
        temp.splice(index, 1);
        setContentTemp(temp);
    }

    function addOption() {
        const temp = [...contentTemp];
        temp.push({ desc: 'todo', status: false });
        setContentTemp(temp);
    }

    async function checked(e, index) {
        let temp = [...content]
        temp[index].status = !temp[index].status
        await axios({
            url: `${baseUrl}/routine/${id}`,
            method: 'PATCH',
            headers: { access_token: localStorage.getItem('access_token') },
            data: {title: title, list: temp}
        });
        dispatch(getRoutine());
    }

    useEffect(() => {
        if (options) {
            setActive(options.active);
            setTitle(options.title);
            setContent(options.list);
            setTitleTemp(options.title);
            setContentTemp(options.list);
        } else {
            setTitleTemp(title);
            setContentTemp(content);
        }
    }, [options]);

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
                    {contentTemp.map((el, i) => (
                        <div className="checkbox" key={i}>
                            <input
                                type="text"
                                value={el.desc}
                                style={{ marginLeft: '25px' }}
                                onChange={(e) => handleChange(e, i)}
                            />
                            <DeleteIcon onClick={() => deleteOption(i)} />
                        </div>
                    ))}
                    <button onClick={addOption} className="add-routine">add +</button>
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
                    {content.map((el, i) => (
                        <div className="checkbox" key={i}>
                            <input type="checkbox" name={el.desc} id={el.desc} checked={el.status}
                                onChange={(e) => checked(e, i)} />
                            <label htmlFor={el.desc}>{el.desc}</label>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

function RoutinePage() {
    const [options, setOptions] = useState([]); // Changed to array from object
    const dispatch = useDispatch();
    const routine = useSelector((state) => state.NoteReducer.routine);

    useEffect(() => {
        dispatch(getRoutine());
    }, [dispatch]);

    useEffect(() => {
        setOptions(routine);
    }, [routine]);

    async function handleAdd() {
        await axios({
            url: `${baseUrl}/routine`,
            method: 'POST',
            headers: { access_token: localStorage.getItem('access_token') },
            data: { title: 'write your title', list: [{ desc: 'My list', status: false }] }
        });
        dispatch(getRoutine());
    }

    function discardNote(id) {
        const temp = [...options];
        temp.splice(id, 1);
        setOptions(temp);
    }

    return (
        <div className="quicknote-container">
            {options.map((el, i) => (
                <Note
                    id={el.id}
                    key={i}
                    options={el}
                    discardNote={discardNote}
                />
            ))}
            <button className="add" onClick={handleAdd}>
                add +
            </button>
        </div>
    );
}

export default RoutinePage;
