import { useState } from "react";
import Card from "../Card/Card";
import "./Board.css";

export default function Board({
  board,
  addCardState,
  setAddCard,
  deleteCard,
  deleteBoard,
  sort,
}) {
  let [sortType, setSortType] = useState(
    JSON.parse(localStorage?.getItem(`sortType ${board}`)) || ""
  );

  function addTime(startTime) {
    let end = new Date().getTime();
    let start = new Date(startTime).getTime();
    let timeAdd = end - start;
    timeAdd = timeAdd / 1000;
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
            className="board__header__buttons-item"
            onClick={() => {
              deleteBoard(board.id);
            }}
          >
            delete board
          </button>
          <button
            className="board__header__button-item"
            onClick={() => setAddCard((addCardState = board.id))}
          >
            add task
          </button>
        </div>
      </div>

      {board.list.length !== 0 && (
        <div className="board__sort">
          <fieldset className="board__sort">
            <legend>Sort:</legend>
            <div className="radiobuttons">
              <div className="radiobutton">
                <input
                  type="radio"
                  id="newest"
                  name="sort"
                  value="newest"
                  onChange={(event) => {
                    setSortType((sortType = event.target.value));
                    sort(sortType, board.id);
                  }}
                />
                <label for="newest">Newest</label>
              </div>
              <div className="radiobutton">
                <input
                  type="radio"
                  id="older"
                  name="sort"
                  value="older"
                  onChange={(event) => {
                    setSortType((sortType = event.target.value));
                    sort(sortType, board.id);
                  }}
                />
                <label for="older">Older</label>
              </div>
            </div>
          </fieldset>
        </div>
      )}

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
