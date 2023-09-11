import { Link } from 'react-router-dom';
import { useState } from 'react';

export function NewPost() {
  const [value, setValue] = useState("");
  const created = 'Vlad Biryukov';
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  async function addPost() {
    await fetch(`http://localhost:3000/posts`, {
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
  }

  return (
    <div className="post">
      <div className="post__body">
        <textarea className="post__textarea" value={value} onChange={handleChange} name="content" id="content"></textarea>
      </div>

      <div className="post__footer">
        <Link to="/" className="post__button post__edit" onClick={addPost}>Опубликовать</Link>
      </div>

      <Link to="/" className="post__close">X</Link>
    </div>
  );
}
