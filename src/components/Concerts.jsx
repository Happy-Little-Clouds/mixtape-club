import React, { Component} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import ConcertListItem from "./ConcertListItem.jsx"
import Hero from './Hero.jsx';
import Footer from './Footer.jsx';


class Concerts extends Component{
    constructor(props){
        super(props)

            this.state = {
                location: 'New Orleans',
                spot: '29.9624536,-90.0818585',
                // spot: ''
            }
            this.updateLocation = this.updateLocation.bind(this);
        }
            
            //    const Concerts = (props)=> {

               
                componentDidUpdate() {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log('Geolocation permissions granted');
                        let loci = position.coords.latitude.toString() + ',' + position.coords.longitude.toString()
                        console.log('Latitude:' + position.coords.latitude);
                        console.log('Longitude:' + position.coords.longitude);
                        console.log('spot', position.coords.latitude.toString() + ',' + position.coords.longitude.toString())
                        this.setState({spot: loci},
                        setTimeout(()=> console.log('hi'), 2000)
                        )
                        const script = document.createElement("script");
                    
                        const scriptText = document.createTextNode("complex script with functions i.e. everything that would go inside the script tags");
                        script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js"
                        script.appendChild(scriptText);
                        document.body.appendChild(script);
                      });
                      
    
                }
           

                updateLocation(e){
                    this.setState({location: e.target.value})
                }
                
                render(){
                    
                    return (
                        <div>
            {/* <Hero /> */}
      
      <div className="concerts">
        
       

            <div w-type="event-discovery" w-tmapikey="CR5DEqMYxzHOl6PosvPtI52lZfwVNGHB" w-googleapikey="YOUR_GOOGLE_API_KEY" w-keyword="music" w-theme="oldschool" w-colorscheme="custom" w-width="350" w-height="600" w-size="25" w-border="5" w-borderradius="6" w-postalcode="" w-radius="25" w-city='' w-period="week" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="xxl" w-titlelink="off" w-sorting="groupByName" w-id="id_xxdcq" w-countrycode="US" w-source="" w-branding="Ticketmaster" w-titlecolor="#171a1a" w-titlehovercolor="#ee7a36" w-buybuttonbackgroundhovercolor="#ee7a36" w-buybuttonbackgroundcolor="#17a2b8" w-descriptioncolor="#141414" w-bordercolor="#17a2b8" w-datecolor="#292727" w-latlong={this.state.spot}></div>
           {/* <input type='text' onChange={this.updateLocation}/>
           <Button onClick={()=>console.log(this.state)}/> */}
   

         
          
            
           </div>
            {/* <Footer /> */}
        </div>
    )
}
}




export default Concerts ;