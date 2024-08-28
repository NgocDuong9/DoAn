import type {Variant, Variants} from "framer-motion";

const animateVariant: Variant = {
	opacity: 1,
	height: "fit-content",
	padding: "1rem 0",
	transition: {
		duration: 0.1
	}
};

export const popoverVariants: Variants = {
	animate: animateVariant,
	initial: {
		...animateVariant,
		opacity: 0,
	},
};
