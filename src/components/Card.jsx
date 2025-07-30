import { useState } from 'react';
import data from '../data/data.json';

function Card() {
    const [filter, setFilter] = useState('all');
    const [removedItems, setRemovedItems] = useState([]);
    const [permanentlyRemoved, setPermanentlyRemoved] = useState([]);
    const [isDark, setIsDark] = useState(false);
    const [items, setItems] = useState(data);

    const handleIsDark = () => {
        setIsDark(prev => !prev);
    };
    const handleRemoved = (id) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            setRemovedItems(prev => [...prev, id]);
            setTimeout(() => {
                setPermanentlyRemoved(prev => [...prev, id]);
            }, 500);
        }
    };
    const handleToggleActive = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isActive: !item.isActive } : item
            )
        );
    };

    const filteredData = items
        .filter(item =>
            filter === 'all' ? true : item.isActive === filter
        )
        .filter(item => !permanentlyRemoved.includes(item.id));

    return (
        <>
            <div className={`
                  flex flex-row justify-between items-center rounded-xl mx-15 mt-8 p-2
                  ${isDark ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-100 text-black'}
                  transition-colors duration-500
            `}>
                <img src={'assets/images/logo.svg'} alt={'Logo'} />
                <button onClick={handleIsDark} type='button'>
                    <img
                        src={isDark ? 'assets/images/icon-sun.svg' : 'assets/images/icon-moon.svg'}
                        alt='Theme toggle'
                    />
                </button>
            </div>

            {/* Main content */}
            <div className={`p-15 flex flex-col gap-10`}>
                <div className='flex flex-row justify-between items-center'>
                    <h2 className={`text-4xl ${isDark ? 'text-neutral-100' : 'text-black'} transition-colors duration-500`}>
                        Extensions List
                    </h2>
                    <span className='flex gap-2'>
                        {['all', true, false].map(value => (
                            <button
                                key={value.toString()}
                                onClick={() => setFilter(value)}
                                className={`
                                px-3 py-1 rounded
                                transform transition-all duration-300
                                ${filter === value
                                    ? 'scale-105 font-bold underline text-red-500'
                                    : 'hover:scale-105'}
                            `}>
                        {value === 'all' ? 'All' : value === true ? 'Active' : 'Inactive'}
                            </button>
                        ))}
                    </span>
                </div>

                <ul className='list-none grid grid-cols-3 gap-4'>
                    {filteredData.map((item, index) => (
                        <li
                            key={item.id ?? index}
                            className={`
                                ${isDark ? 'bg-neutral-800 text-neutral-100' : 'bg-neutral-200 text-black'}
                                rounded-xl flex w-full h-50 flex-col justify-between p-6
                                transition-all duration-500 ease-in-out
                                ${removedItems.includes(item.id) ? 'opacity-0 scale-95 pointer-events-none' 
                                : 'opacity-100 scale-100'}
                        `}>
                            <div className='flex gap-4'>
                                <img src={item.logo} alt='Logo' />
                                <span className='flex flex-col gap-2'>
                                   <h3 className='text-lg'>{item.name}</h3>
                                   <p className='text-sm text-neutral-500'>{item.description}</p>
                                </span>
                            </div>
                            <div className='flex flex-row items-center justify-between mt-4'>
                                <button onClick={() => handleRemoved(item.id)}>Remove</button>

                                {/* Toggle switch */}
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        checked={item.isActive}
                                        onChange={() => handleToggleActive(item.id)}
                                        className='sr-only peer'
                                    />
                                    <div className={`
                                        w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full
                                        peer peer-checked:bg-red-500
                                        dark:bg-gray-700 peer-checked:after:translate-x-full
                                        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                        after:transition-all
                                        dark:border-gray-600
                                        relative
                                    `}>
                                    </div>
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default Card;