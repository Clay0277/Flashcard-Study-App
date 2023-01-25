import React, { useEffect , useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Common/Header";
import Home from "./Common/Home";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import StudyDeck from "./Decks/StudyDeck";
import Deck from "./Decks/Deck";
import EditCard from "./Cards/EditCard";
import AddCard from "./Cards/AddCard.js";
import StudyCard from "./Decks/StudyCard";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";

function Layout() {

 const [decks, setDecks] = useState([]);

 useEffect(() => {

  setDecks([]);
  
  const abortController = new AbortController();

  async function loadDecks() {
    try {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }
  loadDecks();
  return() => abortController.abort();
 }, []);
  
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
        <Route path="/" element={<Home decks={decks}/>}/>
        <Route path={"/decks/new"} element={<CreateDeck />} />
        <Route path={"/decks/:deckId/cards/:cardId/edit"} element={<EditCard />}/>
        <Route path={"/decks/:deckId/cards/:cardId/study"} element={<StudyCard/>} />
        <Route path={"/decks/:deckId/cards/new"} element={<AddCard />}/>
        <Route path={"/decks/:deckId/edit"} element={<EditDeck />}/>
        <Route path={"/decks/:deckId/study"} element={<StudyDeck />}/>
        <Route path={"/decks/:deckId"} element={<Deck />}/>
        <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
