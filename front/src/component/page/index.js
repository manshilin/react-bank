// front/src/component/page/index.js
import "./index.css"

export default function Page({children}) {
    return (
        <div className="page">
            {children}
        </div>
    )
}