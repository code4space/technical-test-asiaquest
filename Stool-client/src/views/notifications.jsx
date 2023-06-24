import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../store/actions/studentAction";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../constant/url";

export default function NotificationPage() {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.StudentReducer.notification);

    async function readNotification() {
        await axios({
            url: baseUrl + `/notification`,
            method: "PATCH",
            headers: { access_token: localStorage.getItem("access_token") },
        })
    }
    useEffect(() => {
        dispatch(getNotification());
        readNotification()
    }, [dispatch]);

    return (
        <div className="task-container notification">
            <h2>Notification</h2>
            <div className="task">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notification.map((el, i) => {
                            return (<tr key={i}>
                                <td>{el.date}</td>
                                <td>{el.description}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}