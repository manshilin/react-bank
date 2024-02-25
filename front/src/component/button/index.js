// front/src/component/button/index.js
import "./index.css"

export default function Button({text, type, onClick, className}) {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick}>{text}</button>
    )
}

