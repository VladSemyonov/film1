import React, {useState, useEffect} from "react"
import api from "../../api"

const Film = props => {
    const [film, setFilm] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.films.fetchById(props.match.params._id).then(film => {
                setFilm(film)
                setIsLoading(false)
        })
    }, [props.match.params._id])

    return (
        <>
            {isLoading ? (
                <h1>....Loading ....</h1>
            ) : (
                <>
                    <h1 className="ui center aligned dividing header">{film.title}</h1>
                    <div className="ui grid">
                        <div className="four wide column">
                            <img
                                className="ui fluid image"
                                src={film.img}
                                alt={film.name}
                            />
                        </div>

                        <div className="six wide column">
                            <p>{film.description}</p>
                            <p>Director {film.director}</p>
                            <p>Duration {film.duration}</p>
                            <p>Price {film.price} $</p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Film
