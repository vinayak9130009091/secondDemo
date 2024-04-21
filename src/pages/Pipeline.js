import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./pipeline.css";
import BoardsData from "./boardsData";

const CARD_TYPE = "CARD";

const Card = ({ id, userName, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: CARD_TYPE, // Define the type property here
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: "pointer" }}>
      <div className="user-card">
        <div className="cards-title col-12">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              {" "}
              <h5>{userName}</h5>
            </div>
          </div>

          <hr style={{ margin: "10px 0 10px 0" }} />
        </div>

        <div></div>
      </div>
    </div>
  );
};

const Board = ({ title, cards, moveCard }) => {
  const [allCardsLoaded, setAllCardsLoaded] = useState(false);

  const [, drop] = useDrop({
    accept: CARD_TYPE,
    drop: (item, monitor) => {
      moveCard(item.id, title);
    },
  });

  const loadAllCards = () => {
    // Your logic to load all cards goes here
    // For example, you can set allCardsLoaded to true
    setAllCardsLoaded(true);
  };

  return (
    <div ref={drop} className={` board`} style={{ border: "none", width: "214px", flexShrink: 0, borderRadius: "10px", background: "#F0F8FF", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", height: "auto" }}>
      <div className=" board-title" style={{ padding: "0 0 0 10px" }}>
        <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "wrap" }}>{title}</p>
        {cards.length > 0 && <p>({cards.length})</p>}
      </div>
      <hr style={{ margin: "10px" }} />
      <div className=" col-12 board-card-list custom-scroll" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px ", overflowY: "auto", height: "60vh" }}>
        {allCardsLoaded ? cards.map((card, index) => <Card key={card.id} id={card.id} index={index} moveCard={moveCard} userName={card.userName} />) : cards.slice(0, 3).map((card, index) => <Card key={card.id} id={card.id} index={index} moveCard={moveCard} userName={card.userName} />)}
      </div>
      {!allCardsLoaded && cards.length > 3 && (
        <button onClick={loadAllCards} style={{ margin: "10px", padding: "5px 10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Load More
        </button>
      )}
    </div>
  );
};

const Pipeline = () => {
  const [boardData, setBoardData] = useState(BoardsData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/workflow/pipeline/boardsData/66018fc33aa28dc6944585a6");
      const data = await response.json();
      //setTags(data.tags);
      console.log(data.boardsData);
      setBoardData(data.boardsData);
      // console.log(data.pipeline);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const moveCard = (cardId, targetBoard) => {
    // change
    const updatedBoards = [...boardData];
    const cardIndex = updatedBoards.findIndex((board) => board.cards.find((card) => card.id === cardId));
    const card = updatedBoards[cardIndex].cards.find((card) => card.id === cardId);
    if (cardIndex !== -1) {
      updatedBoards[cardIndex].cards = updatedBoards[cardIndex].cards.filter((card) => card.id !== cardId);
      const targetBoardIndex = updatedBoards.findIndex((board) => board.title === targetBoard);
      if (targetBoardIndex !== -1) {
        updatedBoards[targetBoardIndex].cards.push(card);
        //cgange
        setBoardData(updatedBoards);
      }
    }
  };

  return (
    <div className="col-12 pipeline-main" style={{ marginTop: "10px", marginLeft: "15px", height: "90vh", overflowY: "auto" }}>
      <DndProvider backend={HTML5Backend}>
        <div className="pipeline-container col-12" style={{ display: "flex" }}>
          <div className="pipeline col-12 custom-scroll-second" style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: "9px" }}>
            {boardData.map((board) => (
              <Board title={board.title} cards={board.cards} moveCard={moveCard} />
            ))}
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default Pipeline;
