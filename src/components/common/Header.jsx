import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useZustandStore } from '../../hooks/useZustand';

export default function Header() { 
	//해당 컴포넌트는 setMemuToggle이라는 전역상태변경함수가 호출시에만 리랜더링 되도록 선택적 상태구독 처리
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

	const gnbArr = ['Brand', 'product', 'manual' ,'youtube', 'contact', 'post'];
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const { pathname } = useLocation();

	return (
		<>
			<header className={`header ${pathname === '/' && 'main'}`}>
				<h1>
					<Link to={'/'}>AVALLION</Link>
				</h1>

				<nav>
					<ul className='gnb'>
						{gnbArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === '/' + data ? 'on' : ''}>
									<Link to={'/' + data}>{data.toUpperCase()}</Link>
								</li>
							);
						})}
					</ul>

 
				<ul className='sns'>
  {snsArr.map((Data, idx) => (
    <li key={idx}>
      <a 
        href={
          idx === 0 ? '/contact' :
          idx === 1 ? '/post' :
          idx === 2 ? '/youtube' : '#'
        } 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <Data />
      </a>
    </li>
  ))}
</ul>
				</nav>

				<span className='btnMobile' onClick={setMenuToggle}>
					<FaBars />
				</span>
			</header>
		</>
	);
}