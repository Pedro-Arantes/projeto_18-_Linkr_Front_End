import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataContext } from "../../context/auth";
import pfpic from "../assets/cat.jpg";
import { CreateConfig } from "../../service/config"; 

export default function HomeHeader() {
	const [foldButton, setFoldButton] = useState(false);
	const { setUserObj,userObj } = useContext(DataContext);
	const navigate = useNavigate();
	const { token } = useContext(DataContext)
	const config = CreateConfig()
	const profileImg = userObj.profile_picture
	useEffect( () => {
		const tratarSucesso = (res) => {
			setUserObj(res.data) 
		  	console.log(res.data.profile_picture)
		}
	
		const tratarErro = (res) => {
			console.log(res)
			alert(res.message)
			//navigate("/")
			//window.location.reload()
		}
		const requisicao =  axios.get(`${process.env.REACT_APP_API}/user`, config);
		requisicao.then(tratarSucesso)
		requisicao.catch(tratarErro)
		
	}, [token])

	function handleLogout() {
		axios
			.delete(`${process.env.REACT_APP_API}/logout`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(
				(e) =>
					toast.success(e.data.message, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					}),
				localStorage.removeItem("token"),
				navigate("/")
			);
	}


	

	return (
		<>
			<Header>
				<div>
					<Link to="/home">
					<h1> linkr </h1>
					</Link>
				</div>
				<div>
					{foldButton === false ? (
						<UpArrow onClick={() => setFoldButton(!foldButton)} />
					) : (
						<DownArrow onClick={() => setFoldButton(!foldButton)} />
					)}
					<img src={profileImg} alt="profile_picture" />
				</div>
			</Header>
			{foldButton === true && (
				<LogOutButton onClick={() => handleLogout()}> Logout </LogOutButton>
			)}
		</>
	);
}

const Header = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;

	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100vw;
	height: 72px;
	background: #151515;
	div {
		display: flex;
		align-items: center;
		gap: 10px;
		padding-right: 15px;
	}
	h1 {
		font-family: "Passion One";
		font-weight: 700;
		font-size: 49px;
		line-height: 54px;
		letter-spacing: 0.05em;
		color: #ffffff;
		padding-left: 30px;
	}
	img {
		width: 53px;
		height: 53px;
		border-radius: 26.5px;
	}
	a{
		text-decoration: none;
	}
`;
const UpArrow = styled(IoIosArrowUp)`
	width: 25px;
	height: 25px;
	color: #ffffff;
	cursor: pointer;
`;
const DownArrow = styled(IoIosArrowDown)`
	width: 25px;
	height: 25px;
	color: #ffffff;
	cursor: pointer;
`;
const LogOutButton = styled.button`
	position: fixed;
	right: -20px;
	top: 72px;

	width: 150px;
	height: 47px;
	border-radius: 0px 0px 20px 20px;
	background: #171717;

	font-family: "Lato";
	font-weight: 700;
	font-size: 17px;
	line-height: 20px;
	letter-spacing: 0.05em;
	color: #fff;
	padding-right: 20px;
`;