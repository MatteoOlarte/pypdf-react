import { createContext, useEffect, useState } from "react";

export const SplitContext = createContext();

export const SplitContextProvider = ({ children }) => {
	const [ranges, _setRanges] = useState(null);
	const [pages, _setPages] = useState(null);
	const [mergeAfter, setMergeAfter] = useState(false);

	const setRanges = (value) => _setRanges(value.flat(2));

	const setPages = (value) => _setPages(value);

	useEffect(() => {
		console.log(ranges);
	}, [ranges]);

	return (
		<SplitContext.Provider
			value={{ ranges, setRanges, pages, setPages, mergeAfter, setMergeAfter }}
		>
			{children}
		</SplitContext.Provider>
	);
};
