import "./Card.css";

export default function Card({ card, deleteCard, addTime, boardId, keyProp }) {
  return (
    <>
    
      <div className="card__title">
        <div className="card__title-header">{card.title}</div>
        <button
          className="card__title-delete"
          onClick={() => {
            deleteCard(boardId, card.id);
          }}
        >
          del
        </button>
      </div>
      <div className="card__addTime">Changed {addTime(card.date)}</div>
    </>
  );
}
