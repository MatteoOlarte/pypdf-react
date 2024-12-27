import "../common.css";

function PasswordInput({ id, className, label, placeholder, required, name, onChange }) {
	return (
		<div className={className}>
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<input
				id={id}
				type="password"
				className="form-control"
				placeholder={placeholder}
				required={required ? true : false}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
}

export default PasswordInput;
