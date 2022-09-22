import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth
 } from "../../utils/firebase/firebase.utils"

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
const Authentication = () => {
    return (
        <div>
            <h1>Sign In page</h1>
            <SignUpForm />
            <SignInForm />
        </div>
    )
}

export default Authentication;