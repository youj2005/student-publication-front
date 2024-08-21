import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Post = () => {
    const [image, setImage] = useState();
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [posted, setPosted] = useState(false);
    const [postMessage, setPostMessage] = useState('');


    const storage = getStorage();
    const imagesRef = ref(storage, 'images');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(auth.currentUser);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(auth.currentUser.displayName);
                setEmail(auth.currentUser.email);
            } else {
                navigate('/login');
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        const user = auth.currentUser;
        let url = '';
        try {
            uploadBytes(ref(imagesRef, image.name + auth.currentUser.uid), image)
                .then(function (snapshot) {
                    console.log('Uploaded', snapshot.metadata.size, 'bytes.');
                    console.log('File metadata:', snapshot.metadata);
                    // Let's get a download URL for the file.
                    getDownloadURL(snapshot.ref).then((url) => {
                        console.log('File available at', url);
                        user.getIdToken().then(async (token) => {
                            await axios.post('http://localhost:4000/addarticle', { title: title, content: text, author: name, email: email, idToken: token, image: url })
                                .then((res) => {
                                    console.log(res.data)
                                    setError(false)
                                    setPosted(true)
                                    setPostMessage(res.data.message)
                                }).catch((err) => {
                                    console.log(err);
                                    setError(true)
                                    setPosted(false)
                                    setErrorMessage(err.response.data.message)
                                })
                        })
                    });
                })

        } catch (err) {
            console.log(err);
            setError(true)
            setErrorMessage(err.response.data.message)
        }
    }

    return (
        <MainLayout>
            <div class='h3 ms-5 my-3'>Title</div>
            <div class='mx-5 col-4'>
                <input type="text" value={title} class="form-control ms-5" onChange={e => setTitle(e.target.value)} />
            </div>
            <div class='h3 ms-5 my-3'>Name</div>
            <div class='mx-5 col-4'>
                <input type="text" value={name} class="form-control ms-5" onChange={e => setName(e.target.value)} />
            </div>
            <div class='h3 ms-5 my-3'>Email</div>
            <div class='mx-5 col-4'>
                <input type="text" value={email} class="form-control ms-5" onChange={e => setEmail(e.target.value)} />
            </div>
            <div class='h3 ms-5 my-3'>Cover Image</div>
            <div class='mx-5 col-6'>
                <div class='ms-5'>
                    <div class="input-group">
                        <span class="input-group-text bg-primary" for='file'>Upload</span>
                        <input type="file" id='file' class="form-control" onChange={e => setImage(e.target.files[0])} />
                    </div>
                    <img src={image} />
                </div>
            </div>
            <div class='h3 ms-5 my-3'>Text</div>
            <div class='mx-5 col-4'>
                <textarea class="form-control ms-5" value={text} rows="3" onChange={e => setText(e.target.value)}></textarea>
            </div>
            <Button class='btn-primary mx-5 my-3' onClick={handleSubmit}>Submit</Button>
            {error &&
              <h3 class='row justify-content-center mt-4 '>
                <span class='badge col-4 flex-wrap d-flex text-wrap bg-danger'>{errorMessage} </span>
              </h3>
            }
            {posted &&
                <h3 class='row justify-content-center mt-4'>
                    <span class='badge w-auto bg-success'>Article posted successfully! </span>
                </h3>
            }
        </MainLayout>
    );
};

export default Post;
