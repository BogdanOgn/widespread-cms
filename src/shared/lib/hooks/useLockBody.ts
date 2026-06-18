import { useEffect } from 'react';

export const useLockBody = (isLocked = false) => {
	useEffect(() => {
		if (!isLocked) {
			return;
		}

		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;
		const scrollBarWidth = window.innerWidth - document.body.clientWidth;

		document.body.style.paddingRight = `${scrollBarWidth}px`;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
		};
	}, [isLocked]);
};
