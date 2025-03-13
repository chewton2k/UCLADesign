import React, { useState, useEffect } from 'react';

const Checklist = () => {
    // State for essential items
    const [items, setItems] = useState(() => {
        const savedItems = window.sessionStorage.getItem('checklistItems');
        return savedItems
            ? JSON.parse(savedItems)
            : [
                  { id: 1, text: 'Bedding (sheets, pillows, blankets)', checked: false },
                  { id: 2, text: 'Electronics (laptop, chargers, powerstrip)', checked: false },
                  { id: 3, text: 'Toiletries (towels, shampoo, etc.)', checked: false },
                  { id: 4, text: 'Laundry supplies (detergent, fabric softener, etc.)', checked: false },
                  { id: 5, text: 'Important documents (ID, insurance, etc.)', checked: false },
                  { id: 6, text: 'School supplies (notebooks, pens, etc.)', checked: false },
              ];
    });

    // State for optional items
    const [optionalItems, setOptionalItems] = useState(() => {
        const savedOptionals = window.sessionStorage.getItem('optionalItems');
        return savedOptionals
            ? JSON.parse(savedOptionals)
            : [
                  { id: 101, text: 'Fan (if no central heating)', checked: false },
                  { id: 102, text: 'Decorative items (posters, plants, etc.)', checked: false },
                  { id: 103, text: 'Mini fridge (if not renting a microfridge)', checked: false },
                  { id: 104, text: 'Extra storage bins or organizers', checked: false },
                  { id: 105, text: 'Extra clothing (for different weather)', checked: false },
              ];
    });

    // State for user input in the "add item" field
    const [newItem, setNewItem] = useState('');

    // State to toggle between adding to essentials or optionals
    const [isAddingToOptional, setIsAddingToOptional] = useState(false);

    // Save changes to session storage whenever items or optionalItems change
    useEffect(() => {
        window.sessionStorage.setItem('checklistItems', JSON.stringify(items));
        window.sessionStorage.setItem('optionalItems', JSON.stringify(optionalItems));
    }, [items, optionalItems]);

    // Toggle the "checked" state of an item
    const toggleCheck = (id, isOptional) => {
        const setItems = isOptional ? setOptionalItems : setItems;
        const currentItems = isOptional ? optionalItems : items;

        const updatedItems = currentItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );

        setItems([...updatedItems].sort((a, b) => a.checked - b.checked)); 
    };

    const addItem = () => {
        if (newItem.trim()) {
            const setItems = isAddingToOptional ? setOptionalItems : setItems;
            const currentItems = isAddingToOptional ? optionalItems : items;

            const newEntry = { id: Date.now(), text: newItem, checked: false };
            setItems([...currentItems, newEntry]); 
            setNewItem(''); 
        }
    };

    const deleteItem = (id, isOptional) => {
        const setItems = isOptional ? setOptionalItems : setItems;
        const currentItems = isOptional ? optionalItems : items;

        setItems(currentItems.filter(item => item.id !== id));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">College First-Day Checklist</h1>

            {/* Input section for adding new items */}
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    placeholder="Add new item..."
                    className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                    onChange={e => setIsAddingToOptional(e.target.value === 'optional')}
                    className="ml-2 p-2 border rounded-md"
                >
                    <option value="essential">Essential</option>
                    <option value="optional">Optional</option>
                </select>
                <button
                    onClick={addItem}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            {/* Display essentials checklist */}
            <div className="max-h-100 overflow-y-auto">
                <h2 className="text-xl font-semibold mt-4">Essentials</h2>
                <ul>
                    {items.map(item => (
                        <li
                            key={item.id}
                            className={`flex items-center justify-between p-2 border-b ${item.checked ? 'opacity-50' : ''}`}
                        >
                            <span>{item.text}</span>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => toggleCheck(item.id, false)}
                                    className="ml-2 h-5 w-5 cursor-pointer"
                                />
                                <button
                                    onClick={() => deleteItem(item.id, false)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Display optional items checklist */}
                <h2 className="text-xl font-semibold mt-4">Optional Items</h2>
                <ul>
                    {optionalItems.map(item => (
                        <li
                            key={item.id}
                            className={`flex items-center justify-between p-2 border-b ${item.checked ? 'opacity-50' : ''}`}
                        >
                            <span>{item.text}</span>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => toggleCheck(item.id, true)} // Toggle for Optionals
                                    className="ml-2 h-5 w-5 cursor-pointer"
                                />
                                <button
                                    onClick={() => deleteItem(item.id, true)} // Delete for Optionals
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Checklist;
