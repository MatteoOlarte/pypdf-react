import { useId, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useContext } from "react";
import FilledButton from "../../components/buttons/FilledButton";
import TextInput from "../../components/inputs/TextInput";
import EmailInput from "../../components/inputs/EmailInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import { ApplicationContext } from "../../context/ApplicationContext";
import styles from "./styles.module.css";

function SignUpPage() {
	const applicationContext = useContext(ApplicationContext);
	const inputIDs = [useId(), useId(), useId(), useId()];
	const [firstName, setFirstName] = useState();
	const [lastName, setLastname] = useState();
	const [userEmail, setUserEmail] = useState();
	const [password1, setPassword1] = useState();
	const [password2, setPassword2] = useState();
	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		if (password1 === password2 && password1.length > 8) {
			let wasSuccessfull = await applicationContext.createUser(
				userEmail,
				firstName,
				lastName,
				password1
			);

			if (wasSuccessfull) {
				await applicationContext.loginUser(userEmail, password1);
				navigate("/");
			}
		}
	};

	return (
		<div className={styles["signup-form"]}>
			<div className={styles["from-dialog"]}>
				<div className={styles["dialog-content"]}>
					<div className={styles["content-header"]}>
						<h1 className={styles["content-title"]}>iHate PyPDF</h1>
						<p className={styles["content-subtitle"]}>Create new account</p>
					</div>

					<form onSubmit={handleOnSubmit}>
						<div className={styles["content-header"]}>
							<TextInput
								id={inputIDs[0]}
								name="fname"
								label={"First Name"}
								className="mb-3"
								required
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<TextInput
								id={inputIDs[1]}
								name="lname"
								label={"Last Name"}
								className="mb-3"
								required
								onChange={(e) => setLastname(e.target.value)}
							/>
							<EmailInput
								id={inputIDs[2]}
								label={"Email"}
								className="mb-3"
								placeholder="example@gmail.com"
								required
								onChange={(e) => setUserEmail(e.target.value)}
							/>
							<PasswordInput
								id={inputIDs[3]}
								label={"Password"}
								className="mb-3"
								required
								onChange={(e) => setPassword1(e.target.value)}
							/>
							<PasswordInput
								id={inputIDs[4]}
								label={"Confirm Password"}
								className="mb-5"
								required
								onChange={(e) => setPassword2(e.target.value)}
							/>
						</div>

						<div className={styles["content-footer"]}>
							<FilledButton className="ms-auto" text="Create Account" type="submit" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;
