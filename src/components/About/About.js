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
            <div className="about-profiles">{profileItems}</div>
            <p></p>
        </div>
    );
};

export default About;
