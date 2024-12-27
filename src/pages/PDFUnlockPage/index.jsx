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

function PDFUnlockPage() {
	const taskContext = useContext(TaskContext);
	const sideMenuStyles = {
		"--bs-offcanvas-bg": "var(--md-color-background)",
		"--bs-offcanvas-padding-x": "0px",
		"--bs-offcanvas-padding-y": "0px",
	};
	const sideMenuID = useId();
	const sideMenuLabelID = useId();
	const passwordInputID = useId();
	const [password, setPassword] = useState("");

	const handleDownloadResult = async () => await taskContext.downloadTask();

	const handlePDFUnlockRequest = async () => {
		let password = document.getElementById(passwordInputID).value;

		await taskContext.unlockPDF(password);
	};

	return (
		<GridLayout>
			<Navbar />
			<main className={styles.grid}>
				{taskContext.proccessFailed ? <UnlockErrorDialog /> : null}

				<div
					id={sideMenuID}
					className="offcanvas-lg offcanvas-start h-100"
					tabIndex={-1}
					aria-labelledby={sideMenuLabelID}
					style={sideMenuStyles}
				>
					<div className="offcanvas-body h-100">
						<aside className="p-3 h-100 d-flex flex-column gap-2">
							<FilledSurface emphasis="low">
								<div className="d-flex flex-column">
									<div className="d-flex justify-content-between">
										<h4 className="fs-md-RobotoSlab mb-3">Unlock PDF</h4>

										<button
											type="button"
											className="btn-close d-lg-none"
											data-bs-dismiss="offcanvas"
											aria-label="Close"
											data-bs-target={`#${sideMenuID}`}
										/>
									</div>

									<FilledSurface emphasis="tertiary">
										<div className="d-flex align-items-center">
											<Lightbulb24 className="m-0 me-3" />
											<p className="m-0">
												Unlock password-protected PDFs with our easy-to-use PDF unlocker tool.
											</p>
										</div>
									</FilledSurface>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low" className="flex-grow-1">
								<FilledSurface emphasis="mid" className="mb-3">
									Enter the password to unlock your PDF file
								</FilledSurface>

								<div className="mb-3">
									<label htmlFor={passwordInputID}>Password</label>
									<input
										type="password"
										name="pdfpasword"
										id={passwordInputID}
										className="form-control"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low">
								<div className="d-flex flex-column gap-2">
									<FilledButton
										text="Unlock PDF"
										onclick={handlePDFUnlockRequest}
										disabled={
											!taskContext.hasFiles() || password.length == 0 || taskContext.isDownloadReady
										}
									/>

									{taskContext.isDownloadReady ? (
										<TextButton text="Download PDF" onclick={handleDownloadResult} />
									) : null}
								</div>
							</FilledSurface>
						</aside>
					</div>
				</div>

				<FileUpload sideMenuID={sideMenuID} />
			</main>
		</GridLayout>
	);
}

const UnlockErrorDialog = ({ visible = true }) => {
	const [showDialog, setShowDialog] = useState(visible);
	const handleOnClick = () => {
		setShowDialog(false);
	};
	console.log("modal re draw");

	return (
		<MaterialModal
			title="An Error Occurred"
			positiveButton={<TextButton type="button" text="Close" onclick={handleOnClick} />}
			visible={showDialog}
		>
			<p>
				An error occurred while attempting to unlock the PDF file. This might be due to one of the
				following reasons:
			</p>
			<ul>
				<li>The password you provided is incorrect. Please double-check and try again.</li>
				<li>The file you uploaded is not password-protected or does not require unlocking.</li>
				<li>There was an issue processing the uploaded file. Please try again.</li>
				<li>The file size exceeds the allowed limit. Check the size restrictions and try again.</li>
			</ul>
			<p>
				If the problem persists, please contact support or try refreshing the page and attempting
				the unlock again.
			</p>
		</MaterialModal>
	);
};

export default PDFUnlockPage;
