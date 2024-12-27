import { useRoutes, BrowserRouter } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext";
import { TaskProvider } from "./context/TaskContext";
import { SplitContextProvider } from "./context/SplitContext";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import PDFMergePage from "./pages/PDFMergePage";
import PDFSplitPage from "./pages/PDFSplitPage";
import PDFLockPage from "./pages/PDFLockPage";
import PDFUnlockPage from "./pages/PDFUnlockPage";

const ProccessNames = {
	PDFMerge: "pdf-merge",
	PDFSplit: "pdf-split",
	PDFLock: "pdf-lock",
	PDFUnlock: "pdf-unlock",
};

const ApplicationRoutes = () => {
	let routes = useRoutes([
		{ path: "/", element: <HomePage /> },
		{ path: "/sign-in", element: <SignInPage /> },
		{ path: "/sign-up", element: <SignUpPage /> },
		{ path: "/merge-pdf", element: <PDFTask proccess={ProccessNames.PDFMerge} /> },
		{ path: "/split-pdf", element: <PDFTask proccess={ProccessNames.PDFSplit} /> },
		{ path: "/lock-pdf", element: <PDFTask proccess={ProccessNames.PDFLock} /> },
		{ path: "/unlock-pdf", element: <PDFTask proccess={ProccessNames.PDFUnlock} /> },
	]);
	return routes;
};

const App = () => {
	return (
		<ApplicationProvider>
			<BrowserRouter>
				<ApplicationRoutes />
			</BrowserRouter>
		</ApplicationProvider>
	);
};

const PDFTask = ({ proccess }) => {
	switch (proccess) {
		case ProccessNames.PDFMerge:
			return (
				<TaskProvider>
					<PDFMergePage></PDFMergePage>
				</TaskProvider>
			);
		case ProccessNames.PDFSplit:
			return (
				<SplitContextProvider>
					<TaskProvider>
						<PDFSplitPage></PDFSplitPage>
					</TaskProvider>
				</SplitContextProvider>
			);
		case ProccessNames.PDFLock:
			return (
				<TaskProvider>
					<PDFLockPage></PDFLockPage>
				</TaskProvider>
			);
		case ProccessNames.PDFUnlock:
			return (
				<TaskProvider>
					<PDFUnlockPage></PDFUnlockPage>
				</TaskProvider>
			);
		default:
			return null;
	}
};

export default App;
