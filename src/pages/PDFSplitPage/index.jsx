import { useContext, useId, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import FilledButton from "../../components/buttons/FilledButton";
import OutlinedButton from "../../components/buttons/OutlinedButton";
import TextButton from "../../components/buttons/TextButton";
import Lightbulb24 from "../../components/icons/Lightbulb24";
import Layers24 from "../../components/icons/Layers24";
import ArrowRange24 from "../../components/icons/ArrowRange24";
import FullGridLayout from "../../components/layouts/FullGridLayout";
import Navbar from "../../components/navigation/Navbar";
import MaterialModal from "../../components/modals/MaterialModal";
import FilledSurface from "../../components/surfaces/FilledSurface";
import FileUpload from "../../components/other/FileUpload";
import TabLayout from "../../components/navigation/tabs/TabLayout";
import TabItem from "../../components/navigation/tabs/TabItem";
import Add24 from "../../components/icons/Add24";
import RangePicker from "../../components/other/RangePicker";
import { SplitContext } from "../../context/SplitContext";
import Checkbox from "../../components/inputs/Checkbox";
import PagesPicker from "../../components/other/PagesPicker";
import styles from "./styles.module.css";

function PDFSplitPage() {
	const taskContext = useContext(TaskContext);
	const splitContext = useContext(SplitContext);
	const sideMenuID = useId();
	const sideMenuLabelID = useId();
	const [activeViewIndex, setActiveViewIndex] = useState(0);

	const offcanvasColors = {
		"--bs-offcanvas-bg": "var(--md-color-background)",
		"--bs-offcanvas-padding-x": "0px",
		"--bs-offcanvas-padding-y": "0px",
	};

	const tabLayoutStyles = {
		borderRadius: "15px 15px 0px 0px",
	};

	const handleOnChange = (index) => setActiveViewIndex(index);

	const renderConfigView = () => {
		switch (activeViewIndex) {
			case 0:
				return <RangesConfig />;
			case 1:
				return <PagesConfig />;
			default:
				return <RangesConfig />;
		}
	};

	const handleDownloadResult = async () => await taskContext.downloadTask();

	const handlePDFSplitRequest = async () => {
		let merge = splitContext.mergeAfter;
		
		if (activeViewIndex === 0) {
			await taskContext.splitRangePDF(splitContext.ranges, merge);
		}
		if (activeViewIndex === 1) {
			await taskContext.splitPagesPDF(splitContext.pages, merge);
		}
	};

	return (
		<FullGridLayout>
			<Navbar />
			<main className={`${styles.grid} h-100 w-100`}>
				{taskContext.proccessFailed ? <SplitErrorDialog /> : null}

				<div
					id={sideMenuID}
					className="offcanvas-lg offcanvas-start overflow-auto"
					tabIndex={-1}
					aria-labelledby={sideMenuLabelID}
					style={offcanvasColors}
				>
					<div className="offcanvas-body h-100">
						<aside className="d-flex flex-column gap-2 mh-100 h-100 w-100 p-3">
							<FilledSurface emphasis="low flex-shrink-0">
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
								<div className="d-flex flex-column h-100 gap-2">
									<TabLayout
										className="layout-divider flex-shrink-0"
										style={tabLayoutStyles}
										onChange={handleOnChange}
									>
										<TabItem text="Range" icon={<ArrowRange24 />} />
										<TabItem text="Pages" icon={<Layers24 />} />
									</TabLayout>

									<div className={`flex-grow-1 overflow-auto ${styles.scrollview}`}>
										{renderConfigView()}

										<div className="px-3 ">
											<Checkbox id={1} text="Merge after" onChange={(e) => splitContext.setMergeAfter(e.target.checked)} />
										</div>
									</div>
								</div>
							</FilledSurface>

							<FilledSurface emphasis="low flex-shrink-0">
								<div className="d-flex flex-column gap-2">
									<FilledButton
										text="Split PDF"
										onclick={handlePDFSplitRequest}
										disabled={!taskContext.hasFiles() || taskContext.isDownloadReady}
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

				<FileUpload sideMenuID={sideMenuID} />
			</main>
		</FullGridLayout>
	);
}

const RangesConfig = () => {
	const splitContext = useContext(SplitContext);
	const [ranges, setRanges] = useState([[0, 0]]);

	const handleAddClick = () => {
		setRanges([...ranges, [0, 0]]);
	};

	const handleChange = (index, value) => {
		let [start, end] = value;
		let old = ranges;
		old[index] = [start, end];
		setRanges(old);
		splitContext.setRanges(ranges);
	};

	return (
		<div className="container pt-3 pb-2">
			<div className="mb-4">
				{ranges.map((_, index) => (
					<RangePicker key={index} onChange={(value) => handleChange(index, value)} />
				))}
			</div>

			<div className="d-grid">
				<OutlinedButton text="Add Range" icon={<Add24 />} onclick={handleAddClick} />
			</div>
		</div>
	);
};

const PagesConfig = () => {
	const splitContext = useContext(SplitContext);
	const [pages, setPages] = useState([0]);

	const handleAddClick = () => {
		setPages([...pages, 0]);
	};

	const handleChange = (index, value) => {
		let old = pages;
		old[index] = value;
		setPages(old);
		splitContext.setPages(pages);
	};

	return (
		<div className="container pt-3 pb-2">
			<div className="mb-4">
				{pages.map((_, index) => (
					<div className="input-group">
						<PagesPicker
							index={index + 1}
							key={index}
							onChange={(value) => handleChange(index, value)}
						/>
					</div>
				))}
			</div>
			<div className="d-grid">
				<OutlinedButton text="Add Page" icon={<Add24 />} onclick={handleAddClick} />
			</div>
		</div>
	);
};

const SplitErrorDialog = ({ visible = true }) => {
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
				An error occurred while attempting to split the PDF file. This might be due to one of the
				following reasons:
			</p>
			<ul>
				<li>
					You have not provided a valid range. Ensure that the ranges are in the correct format
					(e.g., "1-3,5,7-9").
				</li>
				<li>The uploaded file is not a valid PDF. Ensure the file is a proper PDF document.</li>
				<li>
					There was an issue processing the file. Try re-uploading it or check for file corruption.
				</li>
				<li>
					The file size exceeds the allowed limit. Verify the size restrictions and try again with a
					smaller file.
				</li>
			</ul>
			<p>
				If the problem persists, please contact support or refresh the page and attempt the split
				operation again.
			</p>
		</MaterialModal>
	);
};

export default PDFSplitPage;
