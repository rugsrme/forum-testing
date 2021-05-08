import React from 'react';
import Nav from '../Nav/Nav';
import Fetch  from '../Fetch/Fetch';
import Footer from '../Footer/Footer';
const Body = (props) => {
  const style= {width: '50px'};
    return (
        <div className="container-fluid">    
            <div className='row'>
              <div className='col-sm-2'>
              <Nav/>
              </div>
          <div className='col-sm-8'>
            <div className="main-div">
              <div className="card-deck">

              <div className="card m2">
                <div className="card-header">
    <h1>Welcome the Site</h1>
                </div>
                <div className="card-body" style={{style}}>
               <Fetch/> 
                </div>
                </div>

              </div>
             
            </div>
            </div>
              <div className='col-sm-2'> Left side     </div>

      </div>
          <div className="row">
            <Footer/>
          </div>
  </div>
    )
}   
export default Body;

