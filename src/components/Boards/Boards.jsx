import Board from "../Board/Board";
import NewBoard from "../NewBoard/NewBoard";
import NewCard from "../NewCard/NewCard";
import "./Boards.css";

export default function Boards({
  boards,
  addCardState,
  setAddCard,
  deleteCard,
  addCard,
  addBoardState,
  setAddBoard,
  addBoard,
  deleteBoard,
  moveCardToBoard,
}) {
  return (
    <>
      <div className="boards">
        <div className="boards__header">
          <h3 className="boards__header__title">Look at your tasks</h3>
          <button
            className="boards__header__button"
            onClick={() => setAddBoard((addBoardState = true))}
          >
            Add new board
          </button>
        </div>
        {boards.length === 0 ? (
          <div className="boards__no-list">You have no boards yet</div>
        ) : (
          <div className="boards__list">
            {boards.map((item) => (
              <div
                key={item.id}
                data-key={item.id}
                className="boards__list__item"
                onDragStart={(event) => {
                  event.target.classList.add(`selected`);
                  event.currentTarget.classList.add("active");
                }}
                onDragEnd={(event) => {
                  event.target.classList.remove(`selected`);
                  event.currentTarget.classList.remove("active");
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const eventEnd = event.currentTarget;
                  const boardsStartId =
                    document.querySelector(".active").dataset.key;
                  const boardsEndId = eventEnd.dataset.key;

                  const activeCard =
                    document.querySelector(".selected") ||
                    document.querySelector(".board__no-list");

                  const currentCard =
                    eventEnd.querySelector(".card") ||
                    document.querySelector(".board__no-list");

                  const boardCards = eventEnd.querySelector(".board__list");

                  const cardId = activeCard.dataset.key || -1;

                  let card;
                  if (cardId != -1) {
                    boards.forEach((board) => {
                      if (board.id == boardsStartId) {
                        board.list.forEach((item) => {
                          if (item.id == cardId) {
                            card = item;
                          }
                        });
                      }
                    });
                    if (!card) {
                      console.log("fail");
                      boards.forEach((board) => {
                        board.list.forEach((item) => {
                          if (item.id == cardId) {
                            card = item;
                          }
                        });
                      });
                      deleteCard(boardsStartId, cardId);
                    }
                  }

                  if (boardsStartId != boardsEndId) {
                    addCard(card, boardsEndId);
                    deleteCard(boardsStartId, cardId);
                  } else {
                    moveCardToBoard(activeCard, currentCard, boardCards);
                  }
                }}
              >
                {" "}
                <Board
                  board={item}
                  addCardState={addCardState}
                  setAddCard={setAddCard}
                  deleteCard={deleteCard}
                  deleteBoard={deleteBoard}
                  moveCardToBoard={moveCardToBoard}
                />
              </div>
            ))}
          </div>
        )}

        {addBoardState && (
          <NewBoard
            addBoardState={addBoardState}
            setAddBoard={setAddBoard}
            addBoard={addBoard}
          />
        )}

        {addCardState !== -1 && (
          <NewCard
            addCardState={addCardState}
            setAddCard={setAddCard}
            addCard={addCard}
          />
        )}
      </div>
    </>
  );
}
