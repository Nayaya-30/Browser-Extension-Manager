import { useState } from 'react';
import data from '../data/data.json';

function Card() {
    const [filter, setFilter] = useState('all');
    const [isRemoved, setIsRemoved] = useState([]);
    const [isDark, setIsDark] = useState(false);

    const handleIsDark = () => {
        setIsDark(prev => !prev);
    }
    const handleRemoved = (id) => {
        setIsRemoved(prev => [...prev, id]);
    };

    const filteredData = data.filter(item =>
        filter === 'all' ? true : item.isActive === filter
    );

    return (
        <>
        <div className={'flex flex-row justify-between items-center bg-neutral-600 rounded-xl mx-15 mt-8 p-2'}>
            <img src={'assets/images/logo.svg'} alt={'Logo'} />

            <button onClick={handleIsDark} type={'button'}>
               <img src={isDark ? 'assets/images/icon-sun.svg': 'assets/images/icon-moon.svg'} alt={'Logo'} />
            </button>
        </div>

        <div className={'p-15 flex flex-col gap-10'}>
            <div className={'flex flex-row justify-between items-center'}>
                <h2 className={'text-4xl text-neutral-100'}>Extensions List</h2>
                <span className={''}>
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter(true)}>Active</button>
                    <button onClick={() => setFilter(false)}>Inactive</button>
                </span>
            </div>

            <ul className={'list-none grid grid-cols-3 gap-4'}>
                {filteredData.map((item) => (
                    <li key={item.id} className={
                        `bg-neutral-900 rounded-xl flex w-full h-50 flex-col justify-between p-6
                        ${isRemoved.includes(item.id) ? 'hidden' : ''}` }>
                        <div className={'flex gap-4'}>
                            <img src={item.logo} alt={'Logo'} />
                            <span className={'flex flex-col gap-2'}>
                                <h3 className={'text-lg text-neutral-300'}>{item.name}</h3>
                                <p className={'text-sm text-neutral-500'}>{item.description}</p>
                            </span>
                        </div>

                        <div className={'flex flex-row items-center justify-between'}>
                            <button onClick={() => handleRemoved(item.id)}>Remove</button>
                            <label className={''}>
                                <input type={'checkbox'} />
                                <span className={'checkbox'}></span>
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
