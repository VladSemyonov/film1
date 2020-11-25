import React, {useState} from "react"
import PropTypes from 'prop-types'
import Featured from './Featured'
import EyeIcon from "./EyeIcon";
import './style.css'

function FilmCard ({film}) {
    const [toggling, setToggling] = useState('')
    const [iconClass, setIconClass] = useState('')
    const [eye, setEye] = useState('')

    function toggleIcon(){
     toggling.length == 0 ? setToggling('_disabled') : setToggling("")
     iconClass.length == 0 ? setIconClass('_active') : setIconClass('')
     eye.length == 0 ? setEye('slash') : setEye('')
    }
    FilmCard.proptTypes = {
        film: PropTypes.shape({
            title: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            duration: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            featured: PropTypes.bool.isRequired,
        })
    }
   return (
        <div className="ui card">
            <span className={`ui right corner label ${toggling}`}>
              <i className="empty star icon"/>
            </span>
                <div style={{transition: "1s"}} className={`image ${toggling}`}>
                    <span className="ui green label ribbon">$ {film?.price} </span>
                    <Featured featured={film.featured} id={film._id}/>
                    <img src={film?.img} alt={film?.title}/>
                </div>
                <div className={`description ${iconClass}`}>
                    <p>{film.description}</p>
                </div>

            <div className="content">
              <span href="#" className="header">
                {film?.title}
             </span>
                <div className="meta">
                    <i className="icon users"/> {film?.director}
                    <span className="right floated">
                    <i className="icon wait right"/>
                        {film?.duration} min
                </span>
                </div>
                <span>
            <i className={`icon link eye ${eye}`} onClick={toggleIcon}/>
        </span>
            </div>
        </div>
    )
}
export default React.memo(FilmCard)
