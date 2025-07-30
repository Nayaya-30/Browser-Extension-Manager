import { useState } from 'react';
import data from '../data/data.json';

function Card() {
    const [filter, setFilter] = useState('all');
    const [removedItems, setRemovedItems] = useState([]);  // renamed for clarity
    const [isDark, setIsDark] = useState(false);

    const handleIsDark = () => {
        setIsDark(prev => !prev);
    };

    const handleRemoved = (id) => {
        setRemovedItems(prev => [...prev, id]);
    };

    const filteredData = data.filter(item =>
        filter === 'all' ? true : item.isActive === filter
    );

    return (
        <>
            {/* Navbar */}
            <div
                className={`
          flex flex-row justify-between items-center rounded-xl mx-15 mt-8 p-2
          ${isDark ? 'bg-neutral-900 text-neutral-100' : 'bg-neutral-100 text-black'}
          transition-colors duration-500
        `}
            >
                <img src={'assets/images/logo.svg'} alt={'Logo'} />
                <button onClick={handleIsDark} type='button'>
                    <img
                        src={isDark ? 'assets/images/icon-sun.svg' : 'assets/images/icon-moon.svg'}
                        alt='Theme toggle'
                    />
                </button>
            </div>

            {/* Main content */}
            <div
                className={`
          p-15 flex flex-col gap-10
          ${isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-black'}
          transition-colors duration-500
        `}
            >
                <div className='flex flex-row justify-between items-center'>
                    <h2 className={`text-4xl ${isDark ? 'text-neutral-100' : 'text-black'} transition-colors duration-500`}>
                        Extensions List
                    </h2>
                    <span className='flex gap-2'>
            <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'font-bold underline' : ''}`}>
              All
            </button>
            <button onClick={() => setFilter(true)} className={`${filter === true ? 'font-bold underline' : ''}`}>
              Active
            </button>
            <button onClick={() => setFilter(false)} className={`${filter === false ? 'font-bold underline' : ''}`}>
              Inactive
            </button>
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
                ${removedItems.includes(item.id) ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
              `}
                        >
                            <div className='flex gap-4'>
                                <img src={item.logo} alt='Logo' />
                                <span className='flex flex-col gap-2'>
                  <h3 className='text-lg'>{item.name}</h3>
                  <p className='text-sm text-neutral-500'>{item.description}</p>
                </span>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <button onClick={() => handleRemoved(item.id)}>Remove</button>
                                <label>
                                    <input type='checkbox' />
                                    <span className='checkbox'></span>
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
