import { Link } from 'react-router-dom';
import { IPosts } from '../../models/models';

export function Post({ id, content, created }: IPosts) {
  return (
    <Link to={`/posts/${id}`} className="post">
      <div className="post__header">
        <div className="post__img-wrap">
          <img className="post__img" src="https://i.pravatar.cc/50" alt="Avatar" />
        </div>
        <div className="post__created">{created}</div>
      </div>

      <div className="post__body">
        <p className="post__content">{content}</p>
      </div>
    </Link>
  );
}
