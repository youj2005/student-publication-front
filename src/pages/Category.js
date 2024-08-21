import Title from '../components/Title';
import MainLayout from '../layouts/MainLayout';
import { db } from '../firebase-config';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    let { name } = useParams();
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where("topic", "==", name));
    const [articles, setArticles] = useState();
    console.log(articles);

    useEffect(() => {
        const getArticles = async () => {
            let data = await getDocs(q);
            setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getArticles();
    }, [name]);

    if (!articles) {
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
            <Title></Title>
            <div className='row mx-4 mt-3'>
                <div className='row'>
                    <div className='h3'>{name}</div>
                </div>
                {articles.map(article => {
                    return (
                        <>
                            <div class="flex-row d-flex" style={{ height: "200px" }}>
                                <img src={article.image} class="flex-shrink-0 mx-3 img-thumbnail h-100" alt="..." />
                                <div>
                                    <Link class="bt-0 h4" to={'/article/' + article.id}>{article.title}</Link>
                                    <p class='crop-text'>{article.content}</p>
                                </div>
                            </div>
                            <hr></hr>
                        </>
                    )
                })}
            </div>
        </MainLayout >
    );
}

export default Category;