import { Link, useParams } from 'react-router-dom';
import useJsonFetch from '../../hooks/useJsonFetch';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { IPosts } from '../../models/models';

export function Post() {
  const params = useParams();
  const { id } = params;
  const [ data, loading, error ] = useJsonFetch<IPosts>(`http://localhost:3000/posts/${id}`);

  async function deletePost() {
    await fetch(`http://localhost:3000/posts/${id}`, {method: 'DELETE'});
  }

  function isEmpty(obj: IPosts) { 
    for (const x in obj) { return false; }
    return true;
  }

  return (
    <>
    {
      data !== null && !isEmpty(data)
      ?
      <div className="post">
        <div className="post__header">
          <div className="post__img-wrap">
            <img className="post__img" src="https://i.pravatar.cc/50" alt="Avatar" />
          </div>
          <div className="post__created">{data.created}</div>
        </div>

        <div className="post__body">
          <p className="post__content">{data.content}</p>
        </div>

        <div className="post__footer">
          <Link to="/" className="post__button post__delete" onClick={deletePost}>Удалить</Link>
          <Link to={`/posts/${id}/edit`} className="post__button post__edit">Изменить</Link>
        </div>
      </div>
      :
      <>
        { loading && <Loader /> }
        { error && <ErrorMessage error={error} /> }
      </>
    }
    </>
  );
}
