import { useId } from "react";
import "./styles.css";

function Offcanvas({ id, title, orientation = "start", children, breakPoint="" }) {
  const labelID = useId()
	const fullclassname = `offcanvas${breakPoint} offcanvas-${orientation}`;

	return (
		<div id={id} className={fullclassname} tabIndex={-1} aria-labelledby={labelID}>
			<div className="offcanvas-header">
        <h5 id={labelID} className="offcanvas-title">{title}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          data-bs-target={`#${id}`}
        >
        </button>
      </div>

			<div className="offcanvas-body">{children}</div>
		</div>
	);
}

export default Offcanvas;