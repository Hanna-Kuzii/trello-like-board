import { useEffect, useState } from "react";
import "./App.css";
import Boards from "./components/Boards/Boards";
import data from './api/data.json'

function App() {
  let [boardData, setBoard] = useState(
    JSON.parse(localStorage?.getItem("boardData")) || data
  );

  let [addCardState, setAddCard] = useState(-1);
  let [addBoardState, setAddBoard] = useState(false);

  const addBoard = (board) => {
    setBoard((boardData = [...boardData, board]));

    localStorage.setItem("boardData", JSON.stringify(boardData));
  };

  const deleteBoard = (boardId) => {
    boardData = [...boardData.filter((board) => board.id !== boardId)];

    setBoard((boardData = [...boardData]));
    localStorage.setItem("boardData", JSON.stringify(boardData));
  };

  const addCard = (card, boardId) => {
    boardData.forEach((board) => {
      if (board.id == boardId) {
        board.list = [...board.list, card];
      }
    });
    setBoard((boardData = [...boardData]));
    localStorage.setItem("boardData", JSON.stringify(boardData));
  };

  const deleteCard = (boardId, cardId) => {
    if (cardId != -1) {
      boardData.forEach((board) => {
        if (board.id == boardId) {
          board.list = [...board.list.filter((card) => !(card.id == cardId))];
        }
      });

      setBoard((boardData = [...boardData]));
      localStorage.setItem("boardData", JSON.stringify(boardData));
    }
  };

  const moveCardToBoard = (activeCard, currentCard, board) => {
    const isMoveable =
      activeCard !== currentCard && currentCard.classList.contains(`card`);
    if (!isMoveable) {
      return;
    }
    const nextCard =
      currentCard === activeCard.nextElementSibling
        ? currentCard.nextElementSibling
        : currentCard;

    board.insertBefore(activeCard, nextCard);
  };

  const sort = (sortType, boardId) => {
    const boardFilter = boardData.filter((board) => board.id == boardId);

    switch (sortType) {
      case "newest":
        boardFilter[0].list.sort(
          (x, y) => new Date(y.date).getTime() - new Date(x.date).getTime()
        );
        break;
      case "older":
        boardFilter[0].list.sort(
          (x, y) => new Date(x.date).getTime() - new Date(y.date).getTime()
        );
        break;
    }

    setBoard((boardData = [...boardData]));
    localStorage.setItem("boardData", JSON.stringify(boardData));
  };

  return (
    <div className="App">
      <header className="App__header">It's your boards</header>
      <Boards
        boards={boardData}
        setBoard={setBoard}
        addCardState={addCardState}
        setAddCard={setAddCard}
        deleteCard={deleteCard}
        addCard={addCard}
        addBoardState={addBoardState}
        setAddBoard={setAddBoard}
        addBoard={addBoard}
        deleteBoard={deleteBoard}
        moveCardToBoard={moveCardToBoard}
        sort={sort}
      />
    </div>
  );
}

export default App;
