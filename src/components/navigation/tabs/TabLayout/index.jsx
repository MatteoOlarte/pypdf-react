import React, { useState } from "react";
import "./styles.css";

function TabLayout({ className, children, onChange, ...props }) {
	const fullClassName = `mdc-tablayout ${className}`;

	const [activeIndex, setActiveIndex] = useState(0);

	const handleTabClick = (index) => {
		setActiveIndex(index);

		if (onChange) {
			onChange(index);
		}
	};

	const modifiedChildren = React.Children.map(children, (child, index) => {
		if (!React.isValidElement(child)) return child;
		return React.cloneElement(child, {
			active: index === activeIndex,
			onClick: () => handleTabClick(index),
		});
	});

	return (
		<nav className={fullClassName} {...props}>
			{modifiedChildren}
		</nav>
	);
}

export default TabLayout;
