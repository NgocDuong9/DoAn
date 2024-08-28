import type {ReactNode} from "react";

export type PopoverData = {
	title?: string; // must have if not have jsx
	content?: string // must have if not have jsx
	jsx?: ReactNode; // if have jsx, then render by jsx, not title
	onClick?: () => void;
}

export interface PopoverProps {
	data: PopoverData[];
	header?: ReactNode;
	footer?: ReactNode;
	isOpen?: boolean; // control the open
	onClose?: () => void;
	onOpen?: () => void;
	loading?: boolean;
	className?: string;
	classNames?: {
		popover?: string;
		popoverTitle?: string;
		popoverContent?: string;
		popoverHeader?: string;
		popoverFooter?: string;
	}
}
