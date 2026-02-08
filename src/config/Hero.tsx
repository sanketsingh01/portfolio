import { GithubIcon } from "@/components/svgs/GitHub";
import { TwitterIcon } from "@/components/svgs/Twitter";
import { LinkedinIcon } from "@/components/svgs/Linkdedin";
import { AtSignIcon } from "@/components/svgs/Mail";

export const HeroConfig = {
    badge: '/assets/india-badge.png',
    socialsData: [
        {
            icon: <GithubIcon />,
            url: 'https://github.com/sanketsingh01',
            name: 'GitHub',
            previewImage: '/socials/GitHub.webp',
        },
        {
            icon: <TwitterIcon />,
            url: 'https://x.com/SinghSanket78',
            name: 'Twitter',
            previewImage: '/socials/X.webp',
        },
        {
            icon: <LinkedinIcon />,
            url: 'https://www.linkedin.com/in/sanket-singh-5359732b8/',
            name: 'Linkedin',
            previewImage: '/socials/Linkedin.webp',
        },
        {
            icon: <AtSignIcon />,
            url: 'mailto:vt118452@gmail.com',
            name: 'Email',
            emailDisplay: 'vt118452@gmail.com',
        },
    ],
};