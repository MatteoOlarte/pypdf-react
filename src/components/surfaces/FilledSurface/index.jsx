import "../common.css";
import "./styles.css";

function FilledSurface({ className, children, emphasis = "low", ...props }) {
	const fullClassName = `surface surface-filled surface-${emphasis} ${className ? className : ""}`;
	return <div className={fullClassName} {...props}>{children}</div>;
}

export default FilledSurface;
