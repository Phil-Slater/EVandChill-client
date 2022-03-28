import React from "react";

const AboutProfile = ({ creator, profileSrc, ghLogo }) => {
    const { name, github, tasks } = creator;

    const taskItems = tasks.map((task) => (
        <p className="about-task" key={task}>
            <i className="fa-solid fa-file-code"></i>
            {task}
        </p>
    ));

    return (
        <div className="about-profile">
            <h2>
                <a
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {ghLogo}
                </a>
                {""}
                {name}
            </h2>
            <div className="about-profile-img">
                <img
                    src={
                        profileSrc
                            ? profileSrc
                            : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    }
                    alt="Profile"
                />
            </div>
            <div className="about-tasks">{taskItems}</div>
        </div>
    );
};

export default AboutProfile;
