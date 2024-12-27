import "./styles.css"

function Checkbox({ id, text, ...props }) {
	return (
		<div className="mdc-checkbox">
			<input id={id} type="checkbox" {...props} />
			<label htmlFor={id}>{text}</label>
		</div>
	);
}

export default Checkbox;
