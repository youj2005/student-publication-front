import Title from '../components/Title';
import MainLayout from '../layouts/MainLayout';
import { db } from '../firebase-config';
import { useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, query, orderByChild, limitToFirst, get } from "firebase/database";

const Home = () => {
  const articlesRef = collection(db, 'articles');
  const [articles, setArticles] = useState();
  const [articlesTop, setArticlesTop] = useState();
  const viewsDatabase = getDatabase();

  useEffect(() => {
    const getArticles = async () => {
      const allArticles = await getDocs(articlesRef);
      let articleList = allArticles.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setArticles(articleList);
      const topUserPostsRef = await get(query(ref(viewsDatabase, 'views/'), orderByChild('count'), limitToFirst(10)));
      let list = [];
      topUserPostsRef.forEach((doc) => {
        list.push({ id: doc.key, ...articleList.find(item => item.id == doc.key)});
      });
      list = list.reverse();
      setArticlesTop(list);
    };

    getArticles();
  }, []);

  if (!articles || !articlesTop) {
    return (
      <div class="d-flex justify-content-center" style={{height: "100vh"}}>
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
        <div className='col-lg-8'>
          <div className='row'>
            <div className='h3'>Most Recent</div>
          </div>
          {articles.map(article => {
            return (
              <>
                <div class="flex-row d-flex">
                  <img src={article.image} class="flex-shrink-0 mx-3 img-thumbnail h-100" alt="..." style={{width: "200px"}}/>
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
        <div className='col-lg-4'>
          <div>
            <div className='h3'>Most Popular</div>
          </div>
          <div className='row'>
          {articlesTop.map(article => {
            return (
              <>
                <div class="flex-row d-flex">
                  <img src={article.image} class="mx-3 img-thumbnail" alt="..." style={{width: "200px"}}/>
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
        </div>
      </div>
    </MainLayout >
  );
}

export default Home;