import { Textarea } from "../components/input";
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';


export default function AskAIPage() {
    return (
        <div className="task-container AI-page">
            <h2>Ask AI</h2>
            <form>
                <textarea placeholder="What is the best daily routine to follow?" required></textarea>
                <button type="submit" clas><SendIcon/></button>
            </form>
            <p><b>AI: </b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit quod, at laudantium eum officia illum nihil ipsa possimus corporis dicta sint placeat accusamus veniam architecto. Quod repudiandae animi tenetur, praesentium eum cum voluptas ipsa culpa nihil sed non repellendus fugiat expedita voluptates similique mollitia asperiores ab deleniti beatae nulla. Optio fugit pariatur dolor magni, modi ipsa. Tenetur vel quia laboriosam aspernatur, velit placeat enim veritatis. Veritatis, voluptatum voluptates corporis laborum a, totam veniam eaque nisi consequatur tempore repellendus cupiditate voluptate ratione! Nesciunt illo blanditiis temporibus explicabo beatae, repudiandae, mollitia ducimus excepturi facilis in officia minima hic repellat veritatis possimus! Aut.</p>
        </div>
    )
}