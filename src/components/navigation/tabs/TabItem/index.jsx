function TabItem({ icon, text, onClick, active = false }) {
	const className = `mdc-tabitem${active ? ' active' : ''}`;

	return (
		<div className={className} onClick={onClick}>
			{icon}
			<span className="tabitem-text">{text}</span>
		</div>
	);
}

export default TabItem;
