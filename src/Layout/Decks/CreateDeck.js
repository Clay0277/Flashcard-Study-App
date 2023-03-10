import React, { useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import CreateDeckForm from "./CreateDeckForm";
import NavBar from "../Common/NavBar";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {

    const initialFormState = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState({...initialFormState})
    const navigation = useNavigation();

    //set form data 
    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    //create new deck 
    const handleSubmit = (event) => {
        event.preventDefault();
        
        async function deckCreate() {
            try {
                const newDeck = await createDeck(formData);
                navigation.push(`/decks/${newDeck.id}`);
            } catch (error) {
                if (error===!"AbortError") {
                    throw error;
                }
            }
        }
        deckCreate();
    }

    return (
        <div>
             <NavBar link={`/decks/new`} pageName={"Create Deck"} />
            <div>
                <h1>Create Deck</h1>
                <br/>
                        <CreateDeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
                        <br />
                        <br />
                        <Link to="/"><button className="btn btn-secondary mr-1">Cancel</button></Link> 
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
        </div>
    )
}

export default CreateDeck;