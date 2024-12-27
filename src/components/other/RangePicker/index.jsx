import { useState, useId } from "react";

function RangePicker({ onChange, ...props }) {
	const startInputID = useId();
	const endInputID = useId();
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);

	const handleStartChange = (value) => {
		setStart(value);
		if (onChange) {
			onChange([value, end]);
		}
	};

	const handleEndChange = (value) => {
		setEnd(value);
		if (onChange) {
			onChange([start, value]);
		}
	};

	return (
		<div className="input-group mb-3" {...props}>
			<input
				id={startInputID}
				type="number"
				className="form-control"
				onChange={(e) => handleStartChange(e.target.value)}
				placeholder="0"
        min={0}
			/>
			<input
				id={endInputID}
				type="number"
				className="form-control"
				onChange={(e) => handleEndChange(e.target.value)}
				placeholder="0"
        min={0}
			/>
		</div>
	);
}

export default RangePicker;
