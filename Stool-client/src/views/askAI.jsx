import { Textarea } from "../components/input";
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useState } from "react";
import { baseUrl } from "../constant/url";
import Swal from "sweetalert2";
import axios from "axios";


export default function AskAIPage() {
    const [prompt, setPrompt] = useState('')
    const [answer, setAnswer] = useState('')
    const [isGenerate, setIsGenerate] = useState(false)

    async function generateAnswer(e) {
        e.preventDefault()
        setIsGenerate(true)
        try {
            const response = await axios.post(`${baseUrl}/ask-ai`, {
                prompt
            }, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            });

            if (response.statusText !== "OK") {
                throw new Error("Something went wrong");
            }

            const result = response.data.message;
            setAnswer(result);
            setIsGenerate(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="task-container AI-page">
            <h2>Ask AI</h2>
            <form onSubmit={generateAnswer}>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="What is the best daily routine to follow?" required></textarea>
                <button type="submit"><SendIcon /></button>
            </form>
            <p><b>AI: </b>{answer}{isGenerate && 'generating...'}</p>
        </div>
    )
}