import "./about.css";
import avatarImage from "../../../assets/avi-moyal.jpg";

export function About() {
    return (
        <div className="About">
            <img src={avatarImage} alt="Avi Moyal" />

            <h2>About This Project</h2>
            <p>
                Cryptonite is a React and TypeScript application that displays real-time
                information about popular cryptocurrencies. Users can browse coins, view
                real-time price reports for coins they select, and receive AI-based
                recommendations powered by OpenAI on whether a coin is worth buying.
            </p>

            <h2>About Me</h2>
            <p>
                My name is Avi Moyal. I am a QA Automation transitioning into
                full-stack development through the Full Stack &amp; GenAI course at
                John Bryce. This project was built as part of that course, using React,
                TypeScript, Redux, and integrations with several external APIs.
            </p>
        </div>
    );
}