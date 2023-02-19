import Card from "../Card/Card";
import "./Board.css";
import * as ReactDOM from "react-dom";

export default function Board({
  board,
  addCardState,
  setAddCard,
  deleteCard,
  deleteBoard,
  moveCardToBoard,
}) {
  function addTime(startTime) {
    let end = new Date().getTime();
    let start = new Date(startTime).getTime();
    let timeAdd = end - start;
    timeAdd = timeAdd / 1000; // second
    let time = "";

    if (timeAdd / 604800.02 > 4) {
      time = `${Math.floor(timeAdd / 2629800)} months ago`;
    } else if (timeAdd / 86400 >= 7) {
      time = `${Math.floor(timeAdd / 604800.02)} weeks ago`;
    } else if (timeAdd / 3600 >= 24) {
      time = `${Math.floor(timeAdd / 86400)} days ago`;
    } else if (timeAdd / 60 >= 60) {
      time = `${Math.floor(timeAdd / 3600)} hours ago`;
    } else if (timeAdd >= 60) {
      time = `${Math.floor(timeAdd / 60)} minutes ago`;
    } else if (timeAdd < 60) {
      time = `${Math.floor(timeAdd)} seconds ago`;
    } else {
      time = "sorry";
    }
    return time;
  }

  return (
    <div className="board" key={board.id}>
      <div className="board__header">
        <h3 className="board__header__title">{board.title}</h3>
        <div className="board__header__buttons">
          <button
            className="board__header__button"
            onClick={() => {
              deleteBoard(board.id);
            }}
          >
            del
          </button>
          <button
            className="board__header__button"
            onClick={() => setAddCard((addCardState = board.id))}
          >
            add
          </button>
        </div>
      </div>

      <div className="board__list">
        {board.list.length === 0 && (
          <div className="board__no-list" data-key="-1" draggable="true">
            There are no tasks yet
          </div>
        )}
        {board.list.map((card) => (
          <div
            className="card"
            draggable="true"
            data-key={card.id}
            key={card.id}
          >
            <Card
              card={card}
              deleteCard={deleteCard}
              addTime={addTime}
              boardId={board.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
