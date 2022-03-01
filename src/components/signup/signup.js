
import React from 'react'
import ButtonField from '../shared components/Button/Button';
import Input from '../shared components/Input/Input';

const signup = () => {
  return (
    
      <>
      
     <div className="flex-row">
          <div className='flex justify-start '  >
            
          </div>
          
          <div className='flex justify-end mr-12'>
          <form className='flex flex-col justify-center items-center ' action=''>
          <div>
              
              <Input type="text"  name='username'  label="Name" ></Input>
          </div>
          <br></br>
          <div>
             
              <Input type="email"  name='email' label="Email" ></Input>
          </div>
          <br></br>
          <div>
              
              <Input type="phone"  name='phone'  label="Contact Number"></Input>
          </div>
          <br></br>
          <div>
            
              <Input type="password"  name='password'  label='Password'></Input>
          </div>
          <br></br>
          <ButtonField>Create Account</ButtonField>
          

      </form>
      </div>
      </div>

          
      
      
      </>
    
  )
}

export default signup;
