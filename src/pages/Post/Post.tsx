import { Link, useParams, useNavigate } from 'react-router-dom';
import useJsonFetch from '../../hooks/useJsonFetch';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { IPosts } from '../../models/models';
import { useState } from 'react';
import { Deletion } from '../../components/Deletion';

export function Post() {
  const params = useParams();
  const { id } = params;
  const [ data, loading, error, setError ] = useJsonFetch<IPosts>(`http://localhost:3000/posts/${id}`);
  const [deletion, setDeletion] = useState(false);
  const navigate = useNavigate();

  async function deletePost() {
    try {
      setError('');
      setDeletion(true); 
      const response = await fetch(`http://localhost:3000/posts/${id}`, {method: 'DELETE'});

      console.log(response.ok)

      if (!response.ok) {
        setDeletion(false);
        setError(`Ошибка! статус: ${response.status}`);
        return;
      } else {
        navigate('/');
      }

    } catch (e) {
      setDeletion(false)
      const error = new Error(" Ого, ошибка! o_O");
      setError(error.message);
    }
  }

  function isEmpty(obj: IPosts) { 
    for (const x in obj) { return false; }
    return true;
  }

  return (
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
        <button className="post__button post__delete" onClick={deletePost}>Удалить</button>
        <Link to={`/posts/${id}/edit`} className="post__button post__edit">Изменить</Link>
      </div>

      <Link to="/" className="post__close">X</Link>

      { deletion && <Deletion /> }
      { error && <ErrorMessage error={error} /> }
    </div>
    :
    <>
      { loading && <Loader /> }
    </>
  );
}
