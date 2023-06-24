import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment, useEffect, useState } from 'react';

function Note({ options = false, setState, state, id, discardNote }) {
    const [active, setActive] = useState(true);
    const [title, setTitle] = useState('This is title');
    const [content, setContent] = useState(['Drink water']);
    const [titleTemp, setTitleTemp] = useState('');
    const [contentTemp, setContentTemp] = useState(['']);

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
    
    function handleChange (e, index) {
        let temp = [...contentTemp]
        temp[index] = e.target.value;
        setContentTemp(temp)
    }

    function deleteOption (index) {
        let temp = [...contentTemp]
        temp.splice(index, 1)
        setContentTemp(temp)
    }

    function addOption (index) {
        let temp = [...contentTemp]
        temp.push('todo')
        setContentTemp(temp)
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
                    {contentTemp.map((el, i) => {
                        return (
                            <div className='checkbox' key={i}>
                                {/* <input type="checkbox" disabled name={el} id={el} /> */}
                                <input type="text" value={contentTemp[i]} style={{marginLeft: '25px'}} onChange={(e) => handleChange(e, i)}/>
                                <DeleteIcon onClick={() => deleteOption(i)}/>
                                {/* <input type='text' value={state[id].content[i]} onChange={(e) => handleChange(e, i)}>{el}</input> */}
                            </div>
                        )
                    })}
                    <button onClick={addOption}>add +</button>
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
                    {content.map((el, i) => {
                        return (
                            <div className='checkbox' key={i}><input type="checkbox" name={el} id={el} />
                                <label htmlFor={el}>{el}</label></div>
                        )
                    })}
                </>
            )}
        </div>
    );
}

export default function RoutinePage() {
    const [options, setOptions] = useState([
        {
            id: 1,
            title: 'Kegiatan Sore hari',
            content: ['makan', 'minum', 'jajan'],
            active: false
        },
        {
            id: 2,
            title: 'write your title',
            content: ['belajar', 'kerja', 'tidur'],
            active: false
        },
    ]);

    function handleAdd() {
        let temp = [...options];
        temp.push({ title: 'write your title', content: ['my list'], active: true });
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
