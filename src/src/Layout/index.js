import React, { useEffect , useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
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
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/study">
            <StudyCard/>
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
