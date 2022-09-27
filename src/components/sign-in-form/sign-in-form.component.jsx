import { useState } from 'react';

import { 
    signInAuthUserWithEmailAndPassword, 
    signInWithGooglePopup } 
    from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use': 
                alert('Email or password is incorrect');
                break;

                case 'auth/wrong-password': 
                alert('Email or password is incorrect');
                break;

                case 'auth/user-not-found': 
                alert('Email does not exist');
                break;

                case 'auth/cancelled-popup-request': 
                break;

                default:
                console.log(error.code);
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput label = 'Email' type='email' required onChange={handleChange} name='email' value={email}/>

                    <FormInput label = 'Password' type='password' required onChange={handleChange} name='password' value={password}/>
                    
                    <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>  
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                    </div>
                   
                </form>
        </div>
    )
}

export default SignInForm;