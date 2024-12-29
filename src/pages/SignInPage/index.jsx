import { useId, useState, useContext } from "react";
import { useNavigate  } from "react-router-dom";
import FilledButton from "../../components/buttons/FilledButton";
import EmailInput from "../../components/inputs/EmailInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import { ApplicationContext } from "../../context/ApplicationContext";
import styles from "./styles.module.css";

function SignInPage({}) {
	const emailID = useId();
	const applicationContext = useContext(ApplicationContext);
	const passwordID = useId();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		let isSuccess = await applicationContext.loginUser(email, password);

		if (isSuccess == true) {
			navigate("/");
		}
	};

	return (
		<div className={styles["signup-form"]}>
			<div className={styles["from-dialog"]}>
				<div className={styles["dialog-content"]}>
					<div className={styles["content-header"]}>
						<h1 className={styles["content-title"]}>iHate PyPDF</h1>
						<p className={styles["content-subtitle"]}>Login to your account</p>
					</div>

					<form onSubmit={handleOnSubmit}>
						<div className={styles["content-header"]}>
							<EmailInput
								id={emailID}
								label={"Email"}
								className="mb-3"
								placeholder="example@gmail.com"
								required
								onChange={handleEmailChange}
							/>
							<PasswordInput
								id={passwordID}
								label={"Password"}
								className="mb-5"
								required
								onChange={handlePasswordChange}
							/>
						</div>

						<div className={styles["content-footer"]}>
							<FilledButton className="ms-auto" text="Log In" type="submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignInPage;
