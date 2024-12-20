import { useEffect, useRef } from 'react';
import { FaCircle } from 'react-icons/fa'; // fa-circle 아이콘 
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import useShortenText from '../../hooks/useShortenText';
import useCombineText from '../../hooks/useCombineText';
import { Link } from 'react-router-dom';
import Content from '../common/Content';
import { useYoutubeQuery } from '../../hooks/useYoutube';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
// import Modal from '../common/Modal'; // 모달 컴포넌트 가져오기

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function Youtube() {
	const shortenText = useShortenText();
	const combineText = useCombineText();
	const { data: Vids, isPending } = useYoutubeQuery({ type: 'B' });


	
	// 버튼과 스와이퍼 인스턴스 참조 생성
	const btnStartRef = useRef(null);
	const btnStopRef = useRef(null);
	const swiperRef = useRef(null);

	useEffect(() => {
		// 컴포넌트가 렌더링된 후 이벤트 리스너를 설정
		const btnStart = btnStartRef.current;
		const btnStop = btnStopRef.current;

		const startAutoplay = () => swiperRef.current.autoplay.start();
		const stopAutoplay = () => swiperRef.current.autoplay.stop();

		if (btnStart) btnStart.addEventListener("click", startAutoplay);
		if (btnStop) btnStop.addEventListener("click", stopAutoplay);

		// 컴포넌트 언마운트 시 이벤트 리스너를 정리
		return () => {
			if (btnStart) btnStart.removeEventListener("click", startAutoplay);
			if (btnStop) btnStop.removeEventListener("click", stopAutoplay);
		};
	}, []);


	
	return (
		<Layout title={''}>


		<div className="wrap2">
					<h2>YOUTUBE <span>VIDEOS</span> </h2>
		<ul className="auto">
			<li ref={btnStartRef} className="btnStart"><i className="fas fa-play"></i></li>
			<li ref={btnStopRef} className="btnStop"><i className="fas fa-pause"></i></li>
		</ul>

		<Swiper
		onSwiper={(swiper)=>{swiperRef.current =swiper;}}
			modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
			loop={true}
			spaceBetween={0}
			slidesPerView="auto"
			centeredSlides={true}
			grabCursor={true}
			speed={1000}
			effect="coverflow"
			coverflowEffect={{
				rotate: 50,
				stretch: -100,
				depth: 400,
				modifier: 1,
				slideShadows: false
			}}
			autoplay={{ delay: 1000, disableOnInteraction: true }}
			pagination={{ el: ".swiper-pagination", type: "fraction" }}
			navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
			className="swiper-wrapper"
			breakpoints={{
				// 반응형 설정
				999: {  // 태블릿 이상 크기에서 여러 슬라이드 보이기
					slidesPerView: "auto",
				},
				599: {  // 모바일에서 하나의 슬라이드만 중앙에 보이기
					slidesPerView: 1,
					centeredSlides: true,
				},
			}}
		>
		
			<SwiperSlide className="swiper-slide">
			<a href="https://youtu.be/0XPfwjw0z-Q?si=n7z9YK4bfkZoo7dL" target="_blank" rel="noopener noreferrer">
				<div className="inner">
					<div className="con">
						<img src="/thumb1.png" alt="AVALLION" />
						<h4>AVALLION</h4>
						<p>STEP INTO POSSIBILITIES</p>
					</div>
				</div>
				</a>
			</SwiperSlide>
 
			<SwiperSlide className="swiper-slide">
 
				<div className="inner">
					<div className="con">
					<a href=" https://youtu.be/0XPfwjw0z-Q?si=n7z9YK4bfkZoo7dL"></a>
						<img src="/thumb2.png" alt="PERFUME DESIGNER" />
						<h4>CREMA NERA</h4>
						<p>HIGH-PRECISION SKIN REVIVAL</p>
					</div>
				</div>
 
			</SwiperSlide>

			<SwiperSlide className="swiper-slide">
 
				<div className="inner">
					<div className="con">
 						<img src="/thumb3.png" alt="LIMITLESS" />
						<h4>LIMITLESS POTENTIAL</h4>
						<p>FIRST FRAGRANCE</p>
									</div>
				</div>
 
			</SwiperSlide>
			<SwiperSlide className="swiper-slide">
 				<div className="inner">
					<div className="con">
 						<img src="/thumb4.png" alt="AVALLION" />
						<h4>AVALLION</h4>
						<p>FIRST FRAGRANCE</p>
					</div>
				</div>
 
			</SwiperSlide>
			<SwiperSlide className="swiper-slide">
 				<div className="inner">
					<div className="con">
						<img src="/thumb5.png" alt="STEP INTO POSSIBILITIES" />
						<h4>STEP INTO POSSIBILITIES</h4>
						<p>BRAND STORY</p>
					</div>
				</div>
 			</SwiperSlide>
		</Swiper>

		{/* 네비게이션 및 페이지네이션 요소 */}
		<div className="swiper-button-next"></div>
		<div className="swiper-button-prev"></div>
		<div className="swiper-pagination"></div>
	</div>
 


<div className="videobox">
	<Content delay={1}>
    {isPending && <p>Loading...</p>}
    <div className="video-grid">
        {Vids?.slice(0, 8).map((vid, idx) => (
            <Link to={`/youtube/${vid.id}`} key={idx} className="video-card">
					 
                <article className="content-wrapper">
                    <div className="round">
                        <FaCircle />
                    </div>
                    <h3>{shortenText(vid.snippet.title, 40)}</h3>
                    <div className="txt">
                        <p>{shortenText(vid.snippet.description, 90)}</p>
                        <span>{combineText(vid.snippet.publishedAt.split('T')[0], '-', '.')}</span>
                    </div>
                    <Pic className="thumb" src={vid.snippet.thumbnails.high.url} />
                </article>
            </Link>
        ))}
    </div>
</Content>





</div>

</Layout>
);
}