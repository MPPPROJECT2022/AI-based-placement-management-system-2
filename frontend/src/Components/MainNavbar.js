import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink exact to='/' activeStyle>
			Home
		</NavLink>
		<NavLink exact to='/codepractice' activeStyle>
			Code Practice
		</NavLink>
		<NavLink exact to='/aptitude' activeStyle>
			Aptitude Practice
		</NavLink>
		<NavLink exact to='/Module3' activeStyle>
			Technical Round
		</NavLink>
		<NavLink exact to='/Module4' activeStyle>
			Group Descussion
		</NavLink>
		<NavLink exact to='/Admin' activeStyle>
			Admin
		</NavLink>
		<NavLink exact to='/Result' activeStyle>
			My Results
		</NavLink>
		
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
