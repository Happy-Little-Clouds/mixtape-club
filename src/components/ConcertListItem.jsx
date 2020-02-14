import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Hero from './Hero.jsx';
import Footer from './Footer.jsx';



const ConcertListItem = () => {

   
    return (
        <div>
            <Hero />
            <div >
         <h1>Concert List Item</h1>
            </div>
            <Footer />
        </div>
    )
};

export default ConcertListItem ;