import React from "react";

const TextGradiant = ({children, className, disableGradiant = false}: {
	children: React.ReactNode,
	className?: string,
	disableGradiant?: boolean
}) => {
	return (
		<div style={!disableGradiant ? {
			position: 'relative',
			textAlign: 'center',
			borderRadius: '7px',
			background: 'white',
			backgroundImage:
				"linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)",
			backgroundClip: 'text',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent',
		} : undefined}
		     className={className}
		>
			{children}
		</div>
	)
}

export default TextGradiant
