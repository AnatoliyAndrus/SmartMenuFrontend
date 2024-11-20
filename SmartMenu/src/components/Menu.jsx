import { useState, useEffect } from "react";
import { getAllMenuItems } from "../services/menu-service";
import "./Menu.css"

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);

    const fetchData = () =>
        getAllMenuItems().then((response) => setMenuItems(response.data));

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="menu-item-container mt-4">
                <h1 className="text-center">Menu</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                        <div
                            key={item.menuItemId}
                            className="menu-card p-4 shadow-lg rounded-lg border"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="menu-img rounded-md"
                            />
                            <div className="flex flex-col mt-2">
                                <div className="title-price flex justify-between">
                                    <h5 className="font-bold">{item.name}</h5>
                                    <small className="text-gray-600">Price: ${item.price}</small>
                                </div>
                                <p className="menu-description text-gray-700 text-sm mt-1">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
