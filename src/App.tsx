import './App.scss';
import { Post } from './pages/Post';
import { Posts } from './components/Posts';
import { Routes, Route } from 'react-router-dom';
import { EditPost } from './pages/EditPost';
import { NewPost } from './pages/NewPost';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Posts />} />
      <Route path='/posts/:id' element={<Post />} />
      <Route path='/posts/:id/edit' element={<EditPost />} />
      <Route path='/posts/new' element={<NewPost />} />
    </Routes>
  );
}

export default App;
