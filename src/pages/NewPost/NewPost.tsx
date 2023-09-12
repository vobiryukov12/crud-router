import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Saving } from '../../components/Saving';

export function NewPost() {
  const [value, setValue] = useState("");
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const created = 'Vlad Biryukov';
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  async function addPost() {
    try {
      setError('');
      setSaving(true);

      const response = await fetch(`http://localhost:3000/posts`, {
        method: 'POST', 
        body: JSON.stringify({
          id: 0,
          content: value,
          created: created
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        setSaving(false);
        setError(`Ошибка! статус: ${response.status}`);
        return;
      } else {
        navigate('/');
      }

    } catch (e) {
      setSaving(false)
      const error = new Error(" Ого, ошибка! o_O");
      setError(error.message);
    }
  }

  return (
    <div className="post">
      <div className="post__body">
        <textarea className="post__textarea" value={value} onChange={handleChange} name="content" id="content"></textarea>
      </div>

      <div className="post__footer">
        <button className="post__button post__edit" onClick={addPost}>Опубликовать</button>
      </div>

      { saving && <Saving /> }
      { error && <ErrorMessage error={error} /> }

      <Link to="/" className="post__close">X</Link>
    </div>
  );
}
