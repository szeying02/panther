import { Link } from 'react-router-dom';
import "./Home.css"
import Cat from "../assets/Cat"

export default function Home() {
    return (
        <div className = "home-whole">  
            <div className = "home-split home-left">
                <div className = "home-navbar">
                    <Link className = "home-navbar-main" to = "/"> PANTHER </Link>
                    <Link className = "home-navbar-tabs" to = "/login"> LOGIN </Link>
                </div>
                <div className = "home-vertical-line"> 
                    <div className = "home-section" >
                        <div className = "home-caption"> Ask and Answer </div>
                        <div className = "home-subtext"> A free and safe space to converse for everyone. </div>
                    </div>
                </div>
                <div className = "home-space"/>
            </div>
            <div className = "home-split home-right">
                <div className = "home-cat-img">
                    <Cat />
                </div>
            </div>
        </div>
    );
}