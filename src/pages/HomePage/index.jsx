import { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { NavLink } from "react-router-dom";
import GridLayout from "../../components/layouts/GridLayout";
import Navbar from "../../components/navigation/Navbar";
import FilledSurface from "../../components/surfaces/FilledSurface";
import AutoMarginLayout from "../../components/layouts/AutoMarginLayout";
import Lightbulb24 from "../../components/icons/Lightbulb24";
import styles from "./styles.module.css";

function HomePage({}) {
	const applicationContext = useContext(ApplicationContext);
	const currentUser = applicationContext.currentUser;

	return (
		<GridLayout>
			<Navbar />
			<div>
				<AutoMarginLayout>
					<FilledSurface emphasis="tertiary" className="m-3 mb-5">
						<div className="d-flex">
							<Lightbulb24 className="m-0 me-3" />
							<p className="m-0">Every tool you need to work with PDFs in one place</p>
						</div>
					</FilledSurface>

					<div className={styles.grid}>
						<ProccessCard
							title="Merge PDF"
							description="Conbine deferent PDFs into one"
							imageURL="..."
							to="/merge-pdf"
						/>
						<ProccessCard
							title="Split PDF"
							description="Separate deferent pages into multiple files"
							imageURL="..."
							to="/split-pdf"
						/>
						<ProccessCard
							title="Lock PDF"
							description="Protect your PDF with a secure password"
							imageURL="..."
							to="/lock-pdf"
						/>
						<ProccessCard
							title="Unlock PDF"
							description="Remove the password from your PDF"
							imageURL="..."
							to="/unlock-pdf"
						/>
					</div>
				</AutoMarginLayout>
			</div>
			<footer></footer>
		</GridLayout>
	);
}

function ProccessCard({ title, description, imageURL, to, onClick }) {
	return (
		<NavLink className="text-decoration-none" to={to} onClick={onClick}>
			<FilledSurface className="h-100">
				<div className={styles.card}>
					<img src={imageURL} alt={title} className={styles["card-image"]} />
					<div className={styles["card-body"]}>
						<h6 className="m-0 textcolor-1">{title}</h6>
						<p className="m-0 textcolor-2">{description}</p>
					</div>
				</div>
			</FilledSurface>
		</NavLink>
	);
}

export default HomePage;
