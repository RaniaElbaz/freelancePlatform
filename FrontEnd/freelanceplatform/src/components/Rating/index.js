import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Rating({ rating }) {
    const ratingStars = [];
    for (let index = 0; index < rating ; index++) {
        ratingStars.push(<FontAwesomeIcon icon={faStar} color="#ffcd3c" key={index}/>);
    }
    return (<section>{ ratingStars }</section>);
}