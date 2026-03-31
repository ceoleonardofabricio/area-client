import "./card.css";

function Card({ title, value }) {
    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <h2 className="card-value">{value}</h2>
        </div>
    );
}

export default Card;