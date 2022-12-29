import "./ScrollToTop.css"

const ScrollToTop = () =>{
  
    const move = () =>{
        window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        });
    };
    
    return (
        <div className = "scroll-to-top-button" onClick = { move }> 
            BACK TO TOP
        </div>
    );
}
  
export default ScrollToTop;