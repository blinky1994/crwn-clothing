import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { SignInContainer, ButtonContainer } from './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
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
        dispatch(googleSignInStart());
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email,password));
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
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput label = 'Email' type='email' required onChange={handleChange} name='email' value={email}/>

                    <FormInput label = 'Password' type='password' required onChange={handleChange} name='password' value={password}/>
                    
                    <ButtonContainer>
                    <Button type='submit'>Sign In</Button>  
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                    </ButtonContainer>
                   
                </form>
        </SignInContainer>
    )
}

export default SignInForm;