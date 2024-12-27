import TextButton from "../../buttons/TextButton";
import "./styles.css";

function MaterialModal({ title, children, positiveButton, negativeButton, visible }) {
  if (visible == false) {
    return null;
  }
  
	return (
		<div className="material-modal modal-backdrop">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">{title}</h4>
					</div>
					<div className="modal-body">{children}</div>
					<div className="modal-footer">
            {negativeButton}
            {positiveButton}
          </div>
				</div>
			</div>
		</div>
	);
}

export default MaterialModal;
