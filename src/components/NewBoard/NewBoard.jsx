import { useState } from 'react';
import './NewBoard.css'

export default function NewBoard({ addBoardState,  setAddBoard, addBoard }) {

  const [titleItem, setItem] = useState("");
  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {
    setItem("");

    addBoard({
      id: Date.now() + Math.random(),
      title: titleItem,
      list: [],
    });

    event.preventDefault();
    document.forms[0].reset();
    setAddBoard((addBoardState = false));
  };

  return (
    <div className="newBoard">
      <div className="newBoard__content">
      <div className="newBoard__content__header">What is the board name?</div>
        <form action=""  onSubmit={handleSubmit}>
        <input type="text" onChange={handleChangeItem} />
          <div className="newBoard__content__buttons  buttons">
            <button
              type="submit"
              className="newBoard__content__button buttons__add"
            >
              Add board
            </button>
            <button
              type="reset"
              className="newBoard__content__button buttons__cancel"
              onClick={() => setAddBoard((addBoardState = false))}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) 
  
  }