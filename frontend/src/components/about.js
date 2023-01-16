import React from 'react';
import { Button } from 'react-bootstrap';

 
function About() {
    return (
       <div className='bg-image'>
      <img src='biblio.jpg' className='img-fluid' style={{width:"33.33%" }} alt='Sample' />
      <img src='back.jpg' className='img-fluid' style={{width:"33.33%" }} alt='Sample' />
      <img src='back2.jpg' className='img-fluid' style={{width:"33.33%" }} alt='Sample' />
      <img src='back3.jpg' className='img-fluid' style={{width:"33.33%" }} alt='Sample' />
      <img src='back4.jpg' className='img-fluid' style={{width:"33.33%" }} alt='Sample' />
      <img src='terr.jpg' className='img-fluid' style={{width:"33.33%" }} alt='Sample' />
      <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
        <div className='d-flex justify-content-center align-items-center h-100'>
          <p className='text-white mb-0'>L’UEMF met à la disposition de ses étudiants et 
          de son personnel une infrastructure sur campus qui permet de développer leurs capacités</p>
        </div>
      </div>
      <div>
      <h3 style={{marginLeft:"42%", marginTop:"3%"}}>  Contacter Nous</h3>
      <Button href="https://www.linkedin.com/company/uemf" className="mr-2" style={{marginLeft:"32%"}}>
        <i className="fab fa-twitter"></i> Follow on Linkedin
      </Button>
      <Button href="https://www.facebook.com/UniversiteEuromed/" className="mr-2">
        <i className="fab fa-facebook"></i> Follow on Facebook
      </Button>
      <Button href="https://www.instagram.com/ueuromed_fes/">
        <i className="fab fa-instagram"></i> Follow on Instagram
      </Button>
    </div>
    </div>
    );
};
export default About;