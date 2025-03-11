import React, { useState, useEffect } from 'react';

const Checklist = () => {
    const [items, setItems] = useState(() => {
        const savedItems = window.sessionStorage.getItem('checklistItems');
        return savedItems ? JSON.parse(savedItems) : [
            { id: 1, text: 'Bedding (sheets, pillows, blankets)', checked: false },
            { id: 2, text: 'Laptop and charger', checked: false },
            { id: 3, text: 'Toiletries', checked: false },
            { id: 4, text: 'Important documents (ID, insurance, etc.)', checked: false },
            { id: 5, text: 'School supplies (notebooks, pens, etc.)', checked: false }
        ];
    });

    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        window.sessionStorage.setItem('checklistItems', JSON.stringify(items));
    }, [items]);

    const toggleCheck = (id) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems([...updatedItems].sort((a, b) => a.checked - b.checked));
    };

    const addItem = () => {
        if (newItem.trim()) {
            const uncheckedItems = items.filter(item => !item.checked);
            const checkedItems = items.filter(item => item.checked);
            setItems([{ id: Date.now(), text: newItem, checked: false }, ...uncheckedItems, ...checkedItems]);
            setNewItem('');
        }
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">College First-Day Checklist</h1>

            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item..."
                    className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button 
                    onClick={addItem} 
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add
                </button>
            </div>

            <div className="max-h-100 overflow-y-auto">
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
                                    onChange={() => toggleCheck(item.id)}
                                    className="ml-2 h-5 w-5 cursor-pointer"
                                />
                                <button 
                                    onClick={() => deleteItem(item.id)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
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
