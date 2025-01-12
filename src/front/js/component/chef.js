import React, { useState, useEffect, useContext } from "react";
import { MenuItem } from "../component/menuItem.js";
import { Context } from "../store/appContext.js";
import homechefBG from "../../img/homechefBG.jpg"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from "react-router-dom";


export const Chef = () => {
    const { store, actions } = useContext(Context);
    const [menuItems, setMenuItems] = useState([]);
    const [menuItemsMap, setMenuItemsMap] = useState({});
    const [showMenuItemForm, setShowMenuItemForm] = useState(false);


    const addMenuItem = (newMenuItem) => {
        setMenuItems((prevItems) => [...prevItems, newMenuItem]);
        setMenuItemsMap((prevMap) => ({
            ...prevMap,
            [newMenuItem.id]: newMenuItem.address
        }));
        setShowMenuItemForm(false);
    };

    const toggleMenuItemForm = () => {
        setShowMenuItemForm(!showMenuItemForm);
    };



    useEffect(() => {
        if (!store.token) return
        actions.getMenuItems()
    }, [store.token]);



    useEffect(() => {
        actions.getMenuItems()
    }, [])



    const [alignment, setAlignment] = React.useState('chef');
    const navigate = useNavigate();
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };



    const handleClick = (value) => {
        console.log(`Button ${value} clicked!`);
        if (value === "home") {
            navigate("/");
        } else if (value === "diner") {
            navigate("/diner");
        } else {
            navigate("/chef");
        }
    };



    const toggleButton = () => {
        if (alignment === 'home') {
            return <Home />;
        } else if (alignment === 'diner') {
            return <Diner />;
        } else {
            return <Chef />;
        }
    };



    return (
        <div style={{
            backgroundImage: `url(${homechefBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}><br />

            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                className="Toggle d-flex justify-content-center"
            >

                {/* <ToggleButton className="bg-light border" value="home" onClick={() => handleClick('home')}>Home</ToggleButton> */}
                <ToggleButton className="bg-light border" value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
                <ToggleButton className="bg-light border" value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
            </ToggleButtonGroup>

            <div className="container"><br></br>
                <h1
                    style={{ width: "85%" }}
                    className="white-title title-font opacity60 d-flex justify-content-center m-auto">Chef</h1><br></br>
                <div
                    style={{ fontSize: "20px", width: "85%" }}
                    className="white-title lower-font opacity60 m-auto p-1 d-flex justify-content-center">Click "Add" to add a menu item:</div>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn white-title oy-button my-2"
                        onClick={toggleMenuItemForm}>Add</button>
                    {showMenuItemForm && <MenuItem addMenuItem={addMenuItem} />}
                </div>

            </div>
            {store.menuItems.map(item => (
                <div key={item.id} className="container card title-font border border-dark"
                    style={{ width: "20rem" }}>
                    <h3>{item.title}</h3>
                    <img src={item.image} alt="Menu Item" />
                    <p>{item.description}</p>
                    <p>{item.ingredients}</p>
                    <p>{item.dietary_preferences}</p>
                    <p>{item.allergen}</p>
                    <p>{item.estimated_time}</p>
                    <p>{item.quantity_available}</p>
                    <p>{menuItemsMap[item.id]}</p> {/* Render the address using the menuItemsMap */}
                    <p>{item.street}</p>
                    <p>{item.city}</p>
                    <p>{item.state}</p>
                </div>
            ))}
        </div>
    );
}