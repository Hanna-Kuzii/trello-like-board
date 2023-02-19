import { useState } from "react";
import "./NewCard.css";

export default function NewCard({ setAddCard, addCardState, addCard }) {
  const [titleItem, setItem] = useState("");
  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {
    setItem("");

    addCard({
      id: Date.now() + Math.random(),
      title: titleItem,
      date: new Date(),
    }, addCardState);

    event.preventDefault();
    document.forms[0].reset();
    setAddCard((addCardState = -1));
  };

  return (
    <div className="newCard">
      <div className="newCard__content">
        <div className="newCard__content__header">What is the task name?</div>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" onChange={handleChangeItem} />
          <div className="newCard__content__buttons buttons">
            <button
              type="submit"
              className="newCard__content__button buttons__add"
            >
              Add task
            </button>
            <button
              type="reset"
              className="newCard__content__button buttons__cancel"
              onClick={() => setAddCard((addCardState = -1))}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
