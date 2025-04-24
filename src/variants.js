export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
            opacity: 0,  // Ensure opacity starts at 0 for smooth fade-in
        },
        show: {
            y: direction === 'up' || direction === 'down' ? 0 : undefined,
            x: direction === 'left' || direction === 'right' ? 0 : undefined,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 0.9,
                delay: delay,
                ease: 'easeInOut',
            }
        },
    }
}