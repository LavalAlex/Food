export default function ButtonRender ({valor, func, text}){
    return (
        <div>

        <button className="btn-filter" value={valor} onClick={e => func(valor)}>{text}</button>
        </div>
        )
}