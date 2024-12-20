import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostDetail() {
	const navigate = useNavigate();
	const { slug } = useParams();
	const [Detail, setDetail] = useState(null);

	//삭제버튼 클릭시 실행할 함수
	const handleDelete = () => {
		if (!window.confirm('게시글을 삭제하겠습니가?')) return;
		axios

		//http://localhost:8000
		//https://post-1htn.onrender.com/
			.delete(`https://post-1htn.onrender.com/posts/${slug}/`)
			.then(res => {
				console.log(res);
				//글 삭제 완료시 포스트목록 컴포넌트로 강제 이동
				navigate('/post');
			})
			.catch(err => console.log(err));
	};

	//상세페이지 마운트시 자동으로 상세데이터 가져옴
	useEffect(() => {		
		//http://localhost:8000
		//https://post-1htn.onrender.com/
		axios.get(`https://post-1htn.onrender.com/posts/${slug}`).then(res => {
			setDetail(res.data);
		});
	}, []);

	return (
		<Layout title='Posts Detail'>
			
			<div className="postdetail">
			<section classname='detailsection'>
				<h3 calssname='detailh3'>{Detail?.title}</h3>
				<p calssname ='detailp'>{Detail?.body}</p>
				<span className='detailspan'>Created : {Detail?.created.split('T')[0]}</span>
			</section>

			<button classname='detailbtn'>
				<Link to={`/post-edit/${slug}`}>Edit</Link>
			</button>
			<button onClick={handleDelete}>Delete</button>
			</div>
		</Layout>
	);
}