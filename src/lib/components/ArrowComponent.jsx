
export const ArrowSvgComponent = ({ svgSource, svgColor }) => {
    if(svgSource === 'left') {
         return <svg xmlns="http://www.w3.org/2000/svg" fill={svgColor} viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrowhead-left"><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"/><path d="M11.64 5.23a1 1 0 0 0-1.41.13l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63L7.29 12l4.48-5.37a1 1 0 0 0-.13-1.4z"/><path d="M14.29 12l4.48-5.37a1 1 0 0 0-1.54-1.28l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63z"/></g></g></svg>;
    } else {
        return <svg xmlns="http://www.w3.org/2000/svg" fill={svgColor} viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrowhead-right"><rect width="24" height="24" opacity="0" transform="rotate(-90 12 12)"/><path d="M18.78 11.37l-4.78-6a1 1 0 0 0-1.41-.15 1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z"/><path d="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z"/></g></g></svg>
    }
}