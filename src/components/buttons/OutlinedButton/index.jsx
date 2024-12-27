import { useId } from "react";
import "../button.css";
import "./styles.css";

function OutlinedButton({
	id,
	text,
	onclick,
	icon,
	className,
	disabled,
	emphasis = "button-primary",
	type = "button",
	...props
}) {
	const fullClassName = `material-button outlined-button ${emphasis} ${className} ${
		icon ? "icon-button" : ""
	}`;
	const textID = useId();

	return (
		<button
			id={id}
			className={fullClassName}
			onClick={onclick}
			type={type}
			aria-labelledby={textID}
      disabled={disabled ? true : false}
			{...props}
		>
			{icon}
			<span id={textID} className="text">
				{text}
			</span>
		</button>
	);
}

export default OutlinedButton;
