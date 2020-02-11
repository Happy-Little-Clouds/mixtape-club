import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import ConcertListItem from "./ConcertListItem.jsx"
import Hero from './Hero.jsx';
import Footer from './Footer.jsx';



const Concerts = () => {

    const [location, setLocatoin] = useState('houston')
    // const [concerts, setConcerts] = useState(['a'])
    return (
        <div>
            <Hero />
            <div >
                <h1>concert header</h1>
           {/* <Input type='text'/> */}
          {/* {concerts.map(concert => {
              <ConcertListItem concert={concert}/>
          })} */}
            </div>
            <Footer />
        </div>
    )
};

export default Concerts ;