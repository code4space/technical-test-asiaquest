import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

function Note({ options = false, setState, state, id, discardNote }) {
    const [active, setActive] = useState(true);
    const [title, setTitle] = useState('This is title');
    const [content, setContent] = useState('This is my note');
    const [titleTemp, setTitleTemp] = useState('');
    const [contentTemp, setContentTemp] = useState('');

    function handleConfirm() {
        setActive(false);
        let temp = [...state];
        temp[id].title = titleTemp;
        temp[id].content = contentTemp;

        setTitle(titleTemp);
        setContent(contentTemp);
        setState(temp);
    }

    function cancel() {
        setActive(false);
    }

    function edit() {
        setActive(true);
        setTitleTemp(title);
        setContentTemp(content);
    }

    function handleDiscard() {
        discardNote(id); // Call the prop function instead
    }

    useEffect(() => {
        if (options) {
            setActive(options.active);
            setTitle(options.title);
            setContent(options.content);
            setTitleTemp(options.title);
            setContentTemp(options.content);
        } else {
            setTitleTemp(title);
            setContentTemp(content);
        }
    }, []); // Empty dependency array to run the effect only once

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
    const [options, setOptions] = useState([
        {
            id: 1,
            title: 'write your title',
            content: 'write your note here..',
            active: false
        },
        {
            id: 2,
            title: 'write your title',
            content: 'write your note here..',
            active: false
        },
    ]);

    function handleAdd() {
        let temp = [...options];
        temp.push({ title: 'write your title', content: 'write your note here..', active: true });
        setOptions(temp);
    }

    return (
        <div className="quicknote-container">
            {options.map((el, i) => {
                return <Note id={i} key={i} options={el} state={options} setState={setOptions} />;
            })}
            <button className="add" onClick={handleAdd}>
                add +
            </button>
        </div>
    );
}
