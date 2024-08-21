import React from 'react';
import Navbar from '../components/Navbar'

const MainLayout = ({ children }) => {
    const topics = ['Politics', 'Sports', 'Arts and Culture', 'Science & Technology', 'Health', 'Business & Finance', 'World', 'Crime', 'Lifestyle']
    
    return (
        <div>
            <Navbar topics={topics}></Navbar>
            <div>{children}</div>
        </div>
    )
};

export default MainLayout;
