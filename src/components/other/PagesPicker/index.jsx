import { useState, useId } from "react";
import styles from "./styles.module.css";

function PagesPicker({ index, onChange, ...props }) {
	const inputID = useId();
	const handleInputChange = (value) => {
		onChange(value);
	};

	return (
		<div className="input-group mb-2">
			{index ? <span className={styles["input-group-text"]}>{index}</span> : null}
			<input
				id={inputID}
				type="number"
				className="form-control"
				onChange={(e) => handleInputChange(e.target.value)}
				placeholder="0"
				{...props}
			/>
		</div>
	);
}

export default PagesPicker;
