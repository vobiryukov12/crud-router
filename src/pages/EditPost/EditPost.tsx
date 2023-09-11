import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPosts } from '../../models/models';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

export function EditPost() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<IPosts | null>(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchData() {
    try {
      setError('');
      setLoading(true); 
      const response = await fetch(`http://localhost:3000/posts/${id}`);

      if (!response.ok) {
        setLoading(false);
        setError(`Ошибка! статус: ${response.status}`);
        return;
      }

      const responseData = await response.json();

      setData(responseData);
      setValue(responseData.content);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      const error = new Error(" Ого, ошибка! o_O");
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  async function savePost() {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH', 
      body: JSON.stringify({
        content: value
      }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
  
  return (
    data !== null 
    ?
    <div className="post">
      <div className="post__header">
        <div className="post__img-wrap">
          <img className="post__img" src="https://i.pravatar.cc/50" alt="Avatar" />
        </div>
        <div className="post__created">{data.created}</div>
      </div>

      <div className="post__body">
        <textarea className="post__textarea" value={value} onChange={handleChange} name="content" id="content"></textarea>
      </div>

      <div className="post__footer">
        <Link to={`/posts/${id}`} className="post__button post__edit" onClick={savePost}>Сохранить</Link>
      </div>

      <Link to={`/posts/${id}`} className="post__close">X</Link>
    </div>
    :
    <>
      { loading && <Loader /> }
      { error && <ErrorMessage error={error} /> }
    </>
  );
}
