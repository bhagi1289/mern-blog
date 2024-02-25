import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'; 

export default function signin() {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  const {loading, error:errorMessage } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleChnage = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim() });

    console.log(formData);
  }

  const handleSubmit = async (e)=>{
     e.preventDefault();

     if(!formData.email || !formData.password){
      // return setErrorMessage("Please fill out all fields.")
      return dispatch(signInFailure('Please fill out all fields'));
     }

     try {
      // setLoading(true);
      // setErrorMessage(null);

      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });

     const data = await res.json();
     if(data.success == false){
        // setLoading(false);
        // return setErrorMessage(data.message);

        dispatch(signInFailure(data.message));
     }

    //  setLoading(false);
     if(res.ok){
      dispatch(signInSuccess(data))
      navigate('/');
     }

     } catch (error) {
        // setErrorMessage(error.message);
        // setLoading(false);

        dispatch(signInFailure(error.message));
     }

  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    {/* {left} */}
      <div className='flex-1'>
      <Link to="/" className='font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-4xl'>Bhagya's</span>Blog
        </Link>
        <p className='text-sm mt-5'>
          This is a simple blog. You can sign in with your email and password or with Google.
        </p>
      </div>
      {/* {right} */}
      <div className='flex-1'>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <Label value="Your email" />
          <TextInput
            type='email'
            placeholder='name@company.com'
            id='email' 
            onChange={handleChnage}
          />
        </div>

        <div>
          <Label value="Your password" />
          <TextInput
            type='password'
            placeholder='Password'
            id='password' 
            onChange={handleChnage}
          />
        </div>

        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
        {
          loading ? (
            <>

            <Spinner size='sm' />
            <span className='pl-3'> Loading....</span>
            </>

          ): "Sign In"
        }      
         </Button>

      </form>

      <div className='flex gap-2 text-sm mt-5'>
        <span> Don't Have and account</span>

        <Link to='/sign-up' className='text-blue-500'>
          Sign Up
        </Link>
      </div>

      {
        errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )
      }
      </div>

     </div>
    </div>
  )
}
