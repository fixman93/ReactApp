import React from 'react'
import BottomBox from './BottomBox'
import first from 'assets/images/icon1.png'
import second from 'assets/images/icon2.png'
import third from 'assets/images/icon3.png'
import fourth from 'assets/images/icon4.png'
import fifth from 'assets/images/icon5.png'
import sixth from 'assets/images/icon6.png'

const list = [{
    title: "Edno",
    text: "Saw a hungry pigeon having a job interview earlier. I really hope he got it",
    image: first,
    bg: "#15700E",
    number: 1
}, {
    title: "Edno",
    text: "Your Instagram of this meal will be moderately popular",
    image: second,
    bg: "#FA5745",
    number: 2
}, {
    title: "Edno",
    text: "It's super annoying to me when people are very good at Twitter and also really good at Instagram, come on you can't have both",
    image: third,
    bg: "#983ACC",
    number: 3
}, {
    title: "Edno",
    text: 'What does WINDOWS stand for? "Work is never done on Windows systems"',
    image: fourth,
    bg: "#30629D",
    number: 4
}, {
    title: "Edno",
    text: "I had motivation to get a lot done at work today...mehh it's Christmas",
    image: fifth,
    bg: "#333333",
    number: 5
}, {
    title: "Edno",
    text: "Phone, tablets, clouds, TVs, if Apple made a car, would it have windows ?",
    image: sixth,
    bg: "#000000",
    number: 6
}]

const BottomBoxes = ({ props }) => {
    return <div style={{ display: "flex", width: "100%" }}>
        {list.map((box, i) => {
            return <BottomBox box={box} key={i}
            />
        })}
    </div>
}


export default BottomBoxes;