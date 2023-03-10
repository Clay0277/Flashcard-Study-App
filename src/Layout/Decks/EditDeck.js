import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CreateDeckForm from "./CreateDeckForm";
import NavBar from "../Common/NavBar";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {


    const initialFormState = {
        name: "",
        description: ""
    };

    const [deck, setDeck] = useState({...initialFormState});
    const navigate = useNavigate();
    const { deckId } = useParams();
    
    //loads appropriate deck
    useEffect(() => {
        async function loadDeck() {
            try {
                const loadedDeck = await readDeck(deckId);
                setDeck(loadedDeck);
            } catch (error) {
                if (error.name!=="AbortError") {
                    throw error;
                }
            }
        }
        loadDeck();
    }, [deckId]);
    
    //updates deck
    const handleChange = ({target}) => {
        setDeck({
            ...deck,
            [target.name]: target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function updateDeckData() {
                await updateDeck(deck);
                navigate.push(`/decks/${deck.id}`);
        }
        updateDeckData();
    }

    return (
        <div>
            <NavBar link={`/decks/${deckId}/edit`} linkName={deck.name} pageName={"Edit"} />
            <div className="container">
                <div className="row">
                    <h1>Edit Deck</h1>
                    <br />
                </div>
                <div className="row w-100">
            
                    <CreateDeckForm formData={deck} handleChange={handleChange} handleSubmit={handleSubmit}/>
                    </div>
                    <div className="row">
                    <Link to={`/decks/${deckId}`}><button className="btn btn-secondary mr-1">Cancel</button></Link>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
       
    )
}

export default EditDeck;