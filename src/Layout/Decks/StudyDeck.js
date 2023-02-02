import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {readDeck} from "../../utils/api/index";
import NavBar from "../Common/NavBar";
import StudyCard from "./StudyCard";

function StudyDeck(){
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    //loads the appropriate deck
    useEffect(() => {
    
      async function loadDeck() {
     
        const newDeck = await readDeck(deckId);
        setDeck(newDeck);
        

      };
      loadDeck();

    }, [deckId]);
  
      //displays the deck if 
      if (Object.keys(deck).length) {
        return (
        <div>
        <NavBar link={`/decks/${deckId}`} linkName={deck.name} pageName={"Study"} />
        <div className="row">
          <h2>Study: {deck.name}</h2>
        </div>
        <div className="row">
        <StudyCard cards={deck.cards}/> 
        </div>
        </div>
      )
        }
        else return "Loading deck here..."
    
  }

  export default StudyDeck;