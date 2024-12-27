import { useContext, useId, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import GridLayout from "../../components/layouts/GridLayout";
import Navbar from "../../components/navigation/Navbar";
import FilledSurface from "../../components/surfaces/FilledSurface";
import FilledButton from "../../components/buttons/FilledButton";
import FileUpload from "../../components/other/FileUpload";
import TextButton from "../../components/buttons/TextButton";
import Lightbulb24 from "../../components/icons/Lightbulb24";
import MaterialModal from "../../components/modals/MaterialModal";
import styles from "./styles.module.css";

function PDFLockPage() {
	const taskContext = useContext(TaskContext);
	const sideMenuID = useId();
	const sideMenuLabelID = useId();
	
	const password1InputId = useId();
	const password2InputId = useId();

	const offcanvasColors = {
		"--bs-offcanvas-bg": "var(--md-color-background)",
		"--bs-offcanvas-padding-x": "0px",
		"--bs-offcanvas-padding-y": "0px",
	};

	const handleDownloadResult = async () => await taskContext.downloadTask();

	const handlePDFLockRequest = async () => {
		let password1 = document.getElementById(password1InputId).value;
		let password2 = document.getElementById(password2InputId).value;

		await taskContext.lockPDF(password1, password2);
	};

	return (
		<GridLayout>
			<Navbar />

			<main className={styles.grid}>
				{taskContext.proccessFailed ? <LockErrorDialog /> : null}

				<div
					id={sideMenuID}
					className="offcanvas-lg offcanvas-start h-100"
					tabIndex={-1}
					aria-labelledby={sideMenuLabelID}
					style={offcanvasColors}
				>
					<div className="offcanvas-body h-100">
						<aside className="p-3 h-100 d-flex flex-column gap-2">
							<FilledSurface emphasis="low">
								<div className="d-flex flex-column">
									<div className="d-flex justify-content-between">
										<h4 className="fs-md-RobotoSlab mb-3">Lock PDF</h4>
										<button
											type="button"
											className="btn-close d-lg-none"
											data-bs-dismiss="offcanvas"
											aria-label="Close"
											data-bs-target={`#${sideMenuID}`}
										></button>
									</div>

									<FilledSurface emphasis="tertiary">
										<div className="d-flex align-items-center">
											<Lightbulb24 className="m-0 me-3" />
											<p className="m-0">Protect your PDF with a secure password</p>
										</div>
									</FilledSurface>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low" className="flex-grow-1">
								<FilledSurface emphasis="mid" className="mb-3">
									Set a password to protect your PDF file
								</FilledSurface>

								<div className="mb-3">
									<label htmlFor={password1InputId}>Password</label>
									<input
										type="password"
										name="pdfpasword1"
										id={password1InputId}
										className="form-control"
									/>
								</div>

								<div className="mb-3">
									<label htmlFor={password2InputId}>Repeat Password</label>
									<input
										type="password"
										name="pdfpasword2"
										id={password2InputId}
										className="form-control"
									/>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low">
								<div className="d-flex flex-column gap-2">
									<FilledButton
										text="Lock PDF"
										disabled={!taskContext.hasFiles() || taskContext.isDownloadReady}
										onclick={handlePDFLockRequest}
									/>

									{taskContext.isDownloadReady ? (
										<TextButton text="Dowload PDF" onclick={handleDownloadResult} />
									) : undefined}
								</div>
							</FilledSurface>
						</aside>
					</div>
				</div>

				<div>
					<FileUpload sideMenuID={sideMenuID} />
				</div>
			</main>
		</GridLayout>
	);
}

const LockErrorDialog = ({ visible = true }) => {
	const [showDialog, setShowDialog] = useState(visible);
	const handleOnClick = () => {
		setShowDialog(false);
	};

	return (
		<MaterialModal
			title="An Error Occurred"
			positiveButton={<TextButton type="button" text="Close" onclick={handleOnClick} />}
			visible={showDialog}
		>
			<p>
				We encountered an issue while attempting to lock the file. This may be due to one of the
				following reasons:
			</p>
			<ul>
				<li>The passwords you entered do not match. Please ensure both passwords are identical.</li>
				<li>
					The password you entered is too short. Use a password with the required minimum length.
				</li>
				<li>There was an issue processing your request. Please try again.</li>
				<li>Your session may have expired. Refresh the page and try again.</li>
			</ul>
			<p>If the problem persists, please contact support or try reloading the application.</p>
		</MaterialModal>
	);
};

export default PDFLockPage;
