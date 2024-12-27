import { useContext, useState, useId } from "react";
import { TaskContext } from "../../context/TaskContext";
import GridLayout from "../../components/layouts/GridLayout";
import Navbar from "../../components/navigation/Navbar";
import FilledSurface from "../../components/surfaces/FilledSurface";
import FilledButton from "../../components/buttons/FilledButton";
import FileUpload from "../../components/other/FileUpload";
import TextButton from "../../components/buttons/TextButton";
import Lightbulb24 from "../../components/icons/Lightbulb24";
import styles from "./styles.module.css";
import MaterialModal from "../../components/modals/MaterialModal";

function PDFMergePage() {
	const taskContext = useContext(TaskContext);
	const sideMenuID = useId();
	const sideMenuLabelID = useId();
	
	const offcanvasColors = {
		"--bs-offcanvas-bg": "var(--md-color-background)",
		"--bs-offcanvas-padding-x": "0px",
		"--bs-offcanvas-padding-y": "0px",
	};

	const handleDownloadResult = async () => await taskContext.downloadTask();

	const handlePDFMergeRequest = async () => await taskContext.mergePDF();


	return (
		<GridLayout>
			<Navbar />
			<main className={styles.grid}>
				{taskContext.proccessFailed ? <MergeErrorDialog /> : null}

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
										<h4 className="fs-md-RobotoSlab mb-3">Merge PDF</h4>

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
											<p className="m-0">Combine PDFs with an easy to use PDF merger available.</p>
										</div>
									</FilledSurface>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low" className="flex-grow-1">
								{taskContext.files.length < 2 ? (
									<FilledSurface emphasis="mid">
										Please, select more PDF files by clicking again on ’Upload Files’ button.
									</FilledSurface>
								) : null}
							</FilledSurface>

							<FilledSurface emphasis="low">
								<div className="d-flex flex-column gap-2">
									<FilledButton
										text="Merge PDF"
										onclick={handlePDFMergeRequest}
										disabled={taskContext.files.length < 2 || taskContext.isDownloadReady}
									/>

									{taskContext.isDownloadReady ? (
										<TextButton
											text="Dowload PDF"
											onclick={handleDownloadResult}
											disabled={!taskContext.isDownloadReady}
										/>
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

const MergeErrorDialog = ({ visible = true }) => {
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
				An error occurred while attempting to merge the PDF files. This might be due to one of the
				following reasons:
			</p>
			<ul>
				<li>
					You only uploaded a single file. Please ensure you upload at least two files to merge.
				</li>
				<li>One or more files are not in PDF format. Ensure all files are valid PDFs.</li>
				<li>There was an issue processing the uploaded files. Please try again.</li>
				<li>The file size exceeds the allowed limit. Check the size restrictions and try again.</li>
			</ul>
			<p>
				If the problem persists, please contact support or try refreshing the page and attempting
				the merge again.
			</p>
		</MaterialModal>
	);
};

export default PDFMergePage;
