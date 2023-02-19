import { useEffect, useState } from "react";
import "./App.css";
import Boards from "./components/Boards/Boards";

function App() {
  let [boardData, setBoard] = useState(
    JSON.parse(localStorage?.getItem("boardData")) || dataFromAPI
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
    // if (!currentCard) {
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
    // }
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
      />
    </div>
  );
}

const dataFromAPI = [
  {
    id: 1,
    title: "To do",
    list: [
      {
        id: 1432,
        title: "doing excersices",
        date: "2023-02-18T16:26:58.633Z",
      },
      {
        id: 2346,
        title: "doing home work",
        date: "2023-02-18T16:26:58.633Z",
      },
    ],
  },
  {
    id: 2,
    title: "Doing",
    list: [
      {
        id: 343,
        title: "watch serial",
        date: "2023-02-18T16:26:58.633Z",
      },
      {
        id: 5,
        title: "clean home",
        date: "2023-02-18T16:26:58.633Z",
      },
    ],
  },
  {
    id: 3,
    title: "Blocked",
    list: [
      {
        id: 8654,
        title: "listen music",
        date: "2023-02-18T16:26:58.633Z",
      },
      {
        id: 6335,
        title: "call to mom",
        date: "2023-02-18T16:26:58.633Z",
      },
    ],
  },
  {
    id: 4,
    title: "Done",
    list: [
      {
        id: 557,
        title: "go to the park",
        date: "2023-02-13T16:26:58.633Z",
      },
      {
        id: 15551,
        title: "sleep",
        date: "2023-02-11T16:26:58.633Z",
      },
      {
        id: 1537,
        title: "cooking food",
        date: "2023-02-08T16:26:58.633Z",
      },
    ],
  },
];

export default App;
