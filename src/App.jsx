import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './components/main/Home';
import Product from './components/sub/Product';
import Manual from './pages/Manual';
import Brand from './components/sub/Brand';
import Youtube from './components/sub/Youtube';
import Contact from './components/sub/Contact';
import Posts from './components/sub/Posts';
import PostsDetail from './components/sub/PostsDetail';
import PostsAdd from './components/sub/PostsAdd';
import PostsEdit from './components/sub/PostsEdit';
import { Route, Routes, useLocation } from 'react-router-dom'; 
import { AnimatePresence } from 'framer-motion';
import MobileMenu from './components/common/MobileMenu';
import { useZustandStore } from './hooks/useZustand'; 
import BackgroundVideo from './components/sub/BackgroundVideo';
import YoutubeDetail from './components/sub/YoutubeDetail';

export default function App() {
	const location = useLocation();
	const IsMenu = useZustandStore(state => state.IsMenu);

	return (
		<>
			<Header />

			<AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Home />} />
					<Route path='/brand' element={<Brand />} />
 					<Route path='/product' element={<Product />} />
					<Route path='/manual' element={<Manual />} />
					<Route path='/youtube' element={<Youtube />} />
					<Route path='/youtube/:id' element={<YoutubeDetail />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/backgroundVideo' element={<BackgroundVideo />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/posts/:slug' element={<PostsDetail />} />
					<Route path='/posts-add' element={<PostsAdd />} />
					<Route path='/posts-edit/:slug' element={<PostsEdit />} />
				</Routes>
			</AnimatePresence>
 
		
			<AnimatePresence>{IsMenu && <MobileMenu />}</AnimatePresence>

			<Footer />
		</>
	);
}
/*
	Color Selector라는 컴포넌트를 통한 실시간 웹페이지 디자인 컬러 테마 변경
	1.현재 기업형 프로젝트에서 키포인트로 활용될 만한 모든 요소의 색상값을 일반 css변수로 치환
	2.키 컬러 선택 컴포넌트 추가후 해당 컴포넌트 컬러 선택 이벤트 발생
	3.사용자 선택할 컬러값으로 css변수값을 변경
*/