import React from "react";

export default function SkillNote() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="80"
            height="30"
            viewBox="0 0 80 30"
            strokeWidth={1.5}
            className="mr-1"
        >
            <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 2"
                d="M5 15C5 15 15 12 30 15C45 18 55 15 65 15"
            ></path>
            <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(-200, 7.5, 15) translate(2, 0.5)"
                d="M5 10L10 15L5 20"
            ></path>
            <text x="17" y="10" fontSize="12" fill="currentColor" fontFamily="cursive">hover me!</text>
        </svg>
    );
}