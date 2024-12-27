import { createContext, useEffect, useState } from "react";
import api from "../services/ihate-pypdf/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [currentTask, setCurrentTask] = useState([]);
	const [files, setFiles] = useState([]);
	const [proccessMessage, setProccessMessage] = useState(null);
	const [isDownloadReady, setIsDownloadReady] = useState(false);
	const [proccessFailed, setProccessFailed] = useState(false);

	const startTask = async () => {
		try {
			let response = await api.post("/tasks/start");

			setCurrentTask(response.data);
			return true;
		} catch (error) {
			setCurrentTask(null);
			return false;
		}
	};

	const cancelTask = async () => {
		try {
			let taskID = currentTask.pk;
			let response = await api.put(`/tasks/cancel/${taskID}`);

			setCurrentTask(response.data);
			return true;
		} catch (error) {
			return false;
		}
	};

	const downloadTask = async () => {
		try {
			let taskID = currentTask.pk;
			let response = await api.get(`/tasks/download/${taskID}`, { responseType: "blob" });
			let filename = currentTask.result?.full_name ?? "result-pdf.pdf";
			let link = createDownloadLink(response.data, filename);

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			return true;
		} catch (error) {
			return false;
		}
	};

	const finishTask = async () => {
		let taskStatus = currentTask.status.name;

		if (taskStatus == "task_completed") {
			clearFiles();
			startTask();
		}
	};

	const uploadFile = async (file) => {
		try {
			let taskID = currentTask.pk;
			let formData = new FormData();
			let response;

			formData.append("file", file);
			response = await api.post(`/files/?task_id=${taskID}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setFiles((f) => [...f, response.data]);
			return true;
		} catch (error) {
			return false;
		}
	};

	const clearFiles = () => setFiles([]);

	const hasFiles = () => files.length > 0;

	const mergePDF = async () => {
		setProccessFailed(false);

		try {
			let taskID = currentTask.pk;
			let response = await api.post(`/pdf-utilities/merge?task_id=${taskID}`);

			setCurrentTask(response.data);
			setIsDownloadReady(true);
			return true;
		} catch (error) {
			let xError = error.response.headers["x-error"];

			console.log(error);
			setProccessFailed(true);
			setProccessMessage(xError);
			return false;
		}
	};

	const lockPDF = async (password1, password2) => {
		setProccessFailed(false);

		if (password1.length < 8 || password2.length < 8) {
			setProccessFailed(true);
			setProccessMessage("PdfLockError");
			return false;
		}
		if (password1 != password2) {
			setProccessFailed(true);
			setProccessMessage("PdfLockError");
			return false;
		}

		try {
			let taskID = currentTask.pk;
			let response = await api.post(`/pdf-utilities/lock?task_id=${taskID}&password=${password1}`);

			setCurrentTask(response.data);
			setIsDownloadReady(true);
			return true;
		} catch (error) {
			let xError = error.response.headers["x-error"];

			console.log(error);
			setProccessFailed(true);
			setProccessMessage(xError);
			return false;
		}
	};

	const unlockPDF = async (password) => {
		setProccessFailed(false);

		if (password != null && password.length == 0) {
			setProccessFailed(true);
			return false;
		}

		try {
			let taskID = currentTask.pk;
			let response = await api.post(`/pdf-utilities/unlock?task_id=${taskID}&password=${password}`);

			setCurrentTask(response.data);
			setIsDownloadReady(true);
			return response;
		} catch (error) {
			let xError = error.response.headers["x-error"];

			setProccessFailed(true);
			setProccessMessage(xError);
			return false;
		}
	};

	useEffect(() => {
		// clearFiles();
		// startTask();
	}, []);

	useEffect(() => {
		console.log(currentTask);
	}, [currentTask]);

	const values = {
		currentTask,
		cancelTask,
		downloadTask,
		finishTask,
		files,
		setFiles,
		uploadFile,
		clearFiles,
		hasFiles,
		proccessFailed,
		proccessMessage,
		isDownloadReady,
		mergePDF,
		lockPDF,
		unlockPDF,
	};

	return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

const createDownloadLink = (data, filename) => {
	let url = window.URL.createObjectURL(new Blob([data]));
	let link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", filename);
	return link;
};
