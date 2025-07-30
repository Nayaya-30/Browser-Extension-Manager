import { useState } from 'react';
import data from './data/data.json';

function Card() {
    const [filter, setFilter] = useState('all');

    const filteredData = data.filter(item =>
        filter === 'all' ? true : item.status === filter
    );

    return (
        <div>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('inactive')}>Inactive</button>
            </div>

            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>{item.name} ({item.status})</li>
                ))}
            </ul>
        </div>
    );
}

export default Card;
