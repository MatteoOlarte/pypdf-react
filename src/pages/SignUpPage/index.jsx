import { useId } from "react";
import { useContext } from "react";
import FilledButton from "../../components/buttons/FilledButton";
import TextInput from "../../components/inputs/TextInput";
import EmailInput from "../../components/inputs/EmailInput";
import PasswordInput from "../../components/inputs/PasswordInput";
import { ApplicationContext } from "../../context/ApplicationContext";
import styles from "./styles.module.css";

function SignUpPage() {
	const applicationContext = useContext(ApplicationContext);
	const fnameID = useId();
	const lnameID = useId();
	const emailID = useId();
	const passwordID = useId();
	const handleOnSubmit = (e) => {
		e.preventDefault();
		let form = e.target();
		let fname =  form.fname;
		print(fname)
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
							<TextInput id={fnameID} name="fname" label={"First Name"} className="mb-3" required />
							<TextInput id={lnameID} name="lname" label={"Last Name"} className="mb-3" required />
							<EmailInput
								id={emailID}
								label={"Email"}
								className="mb-3"
								placeholder="example@gmail.com"
								required
							/>
							<PasswordInput id={passwordID} label={"Password"} className="mb-5" required />
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
