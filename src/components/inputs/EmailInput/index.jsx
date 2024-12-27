import "../common.css";

function EmailInput({ id, className, label, placeholder, required, name, onChange }) {
	return (
		<div className={className}>
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<input
				id={id}
				type="email"
				name={name}
				className="form-control"
				placeholder={placeholder}
				required={required ? true : false}
				onChange={onChange}
			/>
		</div>
	);
}

export default EmailInput;
