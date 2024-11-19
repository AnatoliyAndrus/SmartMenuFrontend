import { useState, useEffect } from "react";
import { getAllMenuItems } from "../services/menu-service";

export default function Menu(){
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        async function fetchMenuItems(){
            const data = await getAllMenuItems()
            setMenuItems(data)
        }
        fetchMenuItems()
    }, []
    )

    return (<>
        
        <div className='menu-item-container'>
        <h1>Menu</h1>
        {menuItems.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <img src={item.imageUrl} alt='img' className='img' />
              <div className="flex flex-col">
                <div className='title-price'>
                  <h5>{item.name}</h5>
                  <small>{item.price}</small>
                </div>
                <div>
                  <small className='ml-3 w-full'>--------------------------</small>
                  <p className='menu-description'>{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
    </>)
}