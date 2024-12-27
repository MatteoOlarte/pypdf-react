import { useContext, useState, useId } from "react";
import ReactModal from "react-modal";
import { TaskContext } from "../../../context/TaskContext";
import Upload24 from "../../icons/Upload24";
import Settings24 from "../../icons/Settings24";
import FilledButton from "../../buttons/FilledButton";
import TextButton from "../../buttons/TextButton";
import PDFFile24 from "../../icons/PDFFile24";
import OutlinedButton from "../../buttons/OutlinedButton";
import MaterialModal from "../../modals/MaterialModal";
import "./styles.css";

function FileUpload({ sideMenuID }) {
	const taskContext = useContext(TaskContext);
	const inputID = useId();
	const [modalOpen, setModalOpen] = useState(false);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		let form = event.target;
		let file = form.fileupload.files[0];

		if (file != null) {
			taskContext.uploadFile(file);
			closeFileUploadDialog();
		}
	};
	const openFileUploadDialog = () => {
		setModalOpen(true);
	};
	const closeFileUploadDialog = () => {
		setModalOpen(false);
	};

	return (
		<div className="h-100">
			<form onSubmit={handleFormSubmit}>
				<MaterialModal
					title="Upload a File"
					positiveButton={<SubmitButton />}
					negativeButton={<CloseButton onclick={closeFileUploadDialog} />}
					visible={modalOpen}
				>
					<div>
						<label htmlFor={inputID} className="form-label">
							PDF File
						</label>
						<input
							id={inputID}
							accept="application/pdf"
							type="file"
							name="fileupload"
							className="form-control"
							required
						/>
					</div>
				</MaterialModal>
			</form>

			<div className="fileupload-container">
				<form onSubmit={handleFormSubmit}>
					<div className="button-container">
						<FilledButton text="Upload File" icon={<Upload24 />} onclick={openFileUploadDialog} />
						<a
							href={`#${sideMenuID}`}
							data-bs-toggle="offcanvas"
							role="button"
							aria-controls={sideMenuID}
							className="d-lg-none"
						>
							<OutlinedButton text="Open Menu" icon={<Settings24 />} />
						</a>
					</div>
				</form>

				<div className="file-container">
					{taskContext.files.map((file) => (
						<FileUploadCard key={file.pk} file={file} />
					))}
				</div>
			</div>
		</div>
	);
}

const FileUploadCard = ({ file }) => {
	return (
		<div className="fileupload-card">
			<div className="card-inner">
				<PDFFile24 />
			</div>

			<span className="card-name">{file.full_name}</span>
		</div>
	);
};

const SubmitButton = ({ onclick }) => {
	return <TextButton type="submit" text="Upload File" onclick={onclick} />;
};

const CloseButton = ({ onclick }) => {
	return <TextButton type="button" text="Cancel" onclick={onclick} />;
};

export default FileUpload;
