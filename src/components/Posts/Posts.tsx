import { Link } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage';
import { Loader } from '../Loader';
import { Post } from '../Post';
import useJsonFetch from '../../hooks/useJsonFetch';
import { IPosts } from '../../models/models';

export function Posts() {
  const [ data, loading, error ] = useJsonFetch<IPosts[]>('http://localhost:3000/posts');

  return (
    <div className="posts">
      <Link to="/posts/new" className="posts__button posts__button--new">Создать пост</Link>
      
      {
        data !== null && data.length > 0 
        ? data.map(post => <Post key={post.id} content={post.content} created={post.created} id={post.id} />)
        : <div className="posts__message">
            { loading && <Loader /> }
            { error && <ErrorMessage error={error} /> }
          </div>
      }
    </div>
  );
}
