export default function HomePage() {
    return (
        <div className="home">
            {localStorage.getItem('role') === 'student' ?
                <>
                    <h1>Don't be afraid to grow</h1>
                    <p>
                    Embrace challenges as opportunities for growth. Every setback is a chance to learn and improve.
                    </p></> :
                <>
                    <h1>Our power to make a good impact</h1>
                    <p>
                    Have the power to make a lasting impact on students' lives. Our guidance and support can shape their future.
                    </p></>}
        </div>
    );
}
