import { useId, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ApplicationContext } from "../../../context/ApplicationContext";
import Offcanvas from "../../layouts/Offcanvas";
import FilledButton from "../../buttons/FilledButton";
import TextButton from "../../buttons/TextButton";
import User24 from "../../icons/User24";
import "./styles.css";

function Navbar() {
	const offcanvasID = useId();
	const applicationContext = useContext(ApplicationContext);
	const currentUser = applicationContext.currentUser;

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container auto">
				<NavLink
					to="/"
					className="navbar-brand"
				>
					iHate PyPDF
				</NavLink>

				<button
					type="button"
					className="navbar-toggler"
					data-bs-toggle="offcanvas"
					data-bs-target={`#${offcanvasID}`}
					aria-controls={offcanvasID}
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<Offcanvas id={offcanvasID} title="iHate PyPDF" orientation="end">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<NavLink 
								to="/" 
								className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
							>
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								to="/merge-pdf"
								className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
							>
								Merge PDF
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								to="/lock-pdf"
								className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
							>
								Lock PDF
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								to="/unlock-pdf"
								className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
							>
								Unlock PDF
							</NavLink>
						</li>
						<li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
							<div className="vr d-none d-lg-flex h-100 mx-lg-2"></div>
							<hr className="d-lg-none my-2" />
						</li>

						<li className="nav-item">
							{currentUser ? <ProfileCard currentUser={currentUser} /> : <AuthButtons />}
						</li>
					</ul>
				</Offcanvas>
			</div>
		</nav>
	);
}

const AuthButtons = () => {
	return (
		<div className="d-lg-block d-flex flex-column">
			<NavLink to="/sign-in">
				<TextButton text="Sing in" className="mx-lg-1 mb-lg-0 mb-2"></TextButton>
			</NavLink>
			<NavLink to="/sign-up">
				<FilledButton text="Sing up" className="mx-lg-1"></FilledButton>
			</NavLink>
		</div>
	);
};

const ProfileCard = ({ currentUser }) => {
	return (
		<div className="profile-card">
			<User24 className="profile-photo"></User24>
			<span className="profile-username">{currentUser.email}</span>
		</div>
	);
};

export default Navbar;
