import React from 'react'

const HomeFilterList = () => {


    return (
        <div>
            <h3>Filters</h3>
            <ul>
                <div className='mb-3'>
                    <h4>Periods</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>

                            <input type='checkbox' />
                            <span className='px-3'>Medieval</span>

                        </li>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Medieval</span>
                        </li>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Medieval</span>
                        </li>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Medieval</span>
                        </li>

                    </ul>
                </div>
                <div className='mb-3'>
                    <h4>Type</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Oil</span>
                        </li>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Oil</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>Location</h4>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Europe</span>
                        </li>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Europe</span>
                        </li>
                        <li className='list-group-item'>
                            <input type='checkbox' />
                            <span className='px-3'>Europe</span>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    )
}

export default HomeFilterList