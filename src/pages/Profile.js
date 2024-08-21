import Button from '../components/Button';
import MainLayout from '../layouts/MainLayout';
import { auth } from '../firebase-config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";

const Profile = (props) => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
          } else {
            navigate('/login');
          }
        });
      });

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <MainLayout>
            <div className='my-3 mx-4'>
                <div class='h1'>Welcome {user.displayName}!</div>
                <Button uri='/post' class='btn-primary border border-dark mx-3'>Post</Button>
                <Button uri='/signout' class='btn-primary border border-dark' onClick={handleSignOut}>Sign Out</Button>
            </div>
        </MainLayout>
    )
}

export default Profile;