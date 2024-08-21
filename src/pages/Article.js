import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import MainLayout from '../layouts/MainLayout';
import { getDatabase, get, ref, set } from "firebase/database";


const Article = () => {
    let { id } = useParams();
    const [article, setArticle] = useState();
    const realtimeDB = getDatabase();
    const viewDatabase = ref(realtimeDB, 'views/' + id + '/count');
    const docRef = doc(db, 'articles', id);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                let views;
                // Fetch article data based on the id from the URL
                get(viewDatabase).then(async (snapshot) => {
                    if (snapshot.exists()) {
                        views = snapshot.val();
                        const doc = await getDoc(docRef);
                        setArticle(doc.data());
                        set(ref(realtimeDB, 'views/' + id), {
                            count: views + 1,
                        });
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };


        fetchArticle();
    }, [id]);

    if (!article) {
        return (
            <div class="d-flex justify-content-center" style={{ height: "100vh" }}>
                <div class="spinner-border my-auto" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <MainLayout>
            <div class='container-fluid px-5 my-5'>
                <div class='m-5'>
                    <img src={article.image} class='img-fluid' />
                </div>
                <h1>{article.title}</h1>
                <a class='h5 my-5' href={'mailto:' + article.email}>By {article.author}</a>
                <p class='p my-5'>{article.content}</p>
            </div>
        </MainLayout>
    );
};

export default Article;