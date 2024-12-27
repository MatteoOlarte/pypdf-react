import { useContext, useId, useState } from "react";

import { TaskContext } from "../../context/TaskContext";

import FilledButton from "../../components/buttons/FilledButton";
import TextButton from "../../components/buttons/TextButton";
import Lightbulb24 from "../../components/icons/Lightbulb24";
import GridLayout from "../../components/layouts/GridLayout";
import Navbar from "../../components/navigation/Navbar";
import MaterialModal from "../../components/modals/MaterialModal";
import FilledSurface from "../../components/surfaces/FilledSurface";
import FileUpload from "../../components/other/FileUpload";
import TabLayout from "../../components/navigation/tabs/TabLayout";
import TabItem from "../../components/navigation/tabs/TabItem";

import styles from "./styles.module.css";

function PDFSplitPage() {
	const taskContext = useContext(TaskContext);
	const sideMenuID = useId();
	const sideMenuLabelID = useId();

	const offcanvasColors = {
		"--bs-offcanvas-bg": "var(--md-color-background)",
		"--bs-offcanvas-padding-x": "0px",
		"--bs-offcanvas-padding-y": "0px",
	};

	const handleDownloadResult = async () => await taskContext.downloadTask();

	const handlePDFSplitRequest = async () => await taskContext.mergePDF();

	return (
		<GridLayout>
			<Navbar />
			<main className={styles.grid}>
				{}

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
										<h4 className="fs-md-RobotoSlab mb-3">Split PDF</h4>

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
											<p className="m-0">
												Easily split PDF files into separate documents with our PDF splitter tool.
											</p>
										</div>
									</FilledSurface>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low" className="flex-grow-1">
								<TabLayout className="layout-divider">
									<TabItem text="Split" icon={<Lightbulb24 />} />
									<TabItem text="Split" icon={<Lightbulb24 />} />
									<TabItem text="Split" icon={<Lightbulb24 />} />
									<TabItem text="Split" icon={<Lightbulb24 />} />
								</TabLayout>
							</FilledSurface>

							<FilledSurface emphasis="low">
								<div className="d-flex flex-column gap-2"></div>
							</FilledSurface>
						</aside>
					</div>
				</div>
			</main>
		</GridLayout>
	);
}

export default PDFSplitPage;
