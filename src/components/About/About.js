import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "./About.css";
import AboutProfile from "./AboutProfile";

const About = () => {
    const [profileImages, setProfileImages] = useState({
        "jon-cundiff": null,
        "Katie-Freeman": null,
        "Phil-Slater": null,
    });

    const ghAxios = axios.create({
        baseURL: "https://api.github.com/users",
        headers: {
            accept: "application/vnd.github.v3+json",
        },
    });

    delete axios.defaults.headers.common["Authorization"];

    const ghLogo = <i className="fa-brands fa-github"></i>;

    const creators = [
        {
            name: "Jon Cundiff",
            github: "jon-cundiff",
            tasks: [
                "Project Structure and Refactors",
                "Logo Design, CSS Theme, Animations",
                "Automated Continuous Deployment",
            ],
        },
        {
            name: "Katie Freeman",
            github: "Katie-Freeman",
            tasks: [
                "User Authentication",
                "Profile Page and Routes",
                "Favorites Implementation",
            ],
        },
        {
            name: "Phil Slater",
            github: "Phil-Slater",
            tasks: [
                "External API Research",
                "Station Model Implementation",
                "Station Routes Implementation",
            ],
        },
    ];

    const loadProfiles = async () => {
        const temp = {};
        for (const creator of creators) {
            const username = creator.github;
            try {
                const resp = await ghAxios.get(`/${username}`);
                temp[username] = resp.data.avatar_url;
            } catch {}
        }

        setProfileImages(temp);
    };
    useEffect(() => {
        loadProfiles();
    }, []);

    const profileItems = creators.map((creator) => (
        <AboutProfile
            key={creator.name}
            creator={creator}
            profileSrc={profileImages[creator.github]}
            ghLogo={ghLogo}
        />
    ));

    return (
        <div className="about">
            <h1>About the Creators</h1>
            <p>
                We are three junior developers with a passion for technology and
                planning sub-details for trips. This project is birthed from the
                knowledge that charging electric vehicles take time to charge
                before making the next leg on a trip. Together, we have crafted
                this application to not only assist users in locating EV
                charging stations at various destinations (as well as nearby),
                but to also locate food and other pasttimes while waiting, all
                in one place!
            </p>
            <div className="about-profiles">{profileItems}</div>
            <h1>Technologies</h1>
            <a
                href="https://github.com/jon-cundiff/EVandChill-client"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2>
                    {ghLogo}
                    Frontend
                </h2>
            </a>
            <p>
                The site that you see is built with React and Redux. Axios is
                used to store default URL and header information to communicate
                with our backend. The animations on this site are done entirely
                through CSS transitions triggered by JavaScript events.
            </p>
            <a
                href="https://github.com/jon-cundiff/EVandChill-server"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2>
                    {ghLogo}
                    Backend
                </h2>
            </a>
            <p>
                The backend server the supplies the data you see is built on
                Express, and interacts with MongoDB via Mongoose. The server
                interacts with{" "}
                <a href="https://openchargemap.org/site">Open Charge Map</a> and{" "}
                <a href="https://www.google.com/maps">Google Maps</a> to locate
                charging stations and nearby ammenities.
            </p>
        </div>
    );
};

export default About;
