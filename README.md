# SkillShow - Mercor Startup Gateway Hackathon

**Note: This project is part of the Mercor Startup Gateway Hackathon (Track 1).**<br>
**This website is deployed on https://mercor-murex.vercel.app/**

## Problem Statement

**Overview** - Mercor's Startup Gateway Hackathon aims to foster creativity and the ability to develop useful products that address real-world problems. Participants are required to complete one of two tracks.

**Track 1 - Full Stack Web Application**  
**Prompt** - Build a web application that provides a solution to a problem faced by friends or businesses on a regular basis. The solution should demonstrate excellent technical execution and showcase your product intuition.

**Tech Stacks** - For this track, we recommend using the T3 Stack, which is standard at Mercor. Additionally, we suggest utilizing UI kits like Chakra UI to minimize the time spent on UI development. You are free to deploy your application to Vercel or any other hosting provider.

## SkillShow

SkillShow is our submission for the Mercor Startup Gateway Hackathon (Track 1). It is a web application that addresses the problem of creating a community-driven platform where users can engage in discussions, share knowledge, and be recognized for their expertise within specific domains.

By implementing a rating system inspired by competitive programming platforms like Kaggle, SkillShow enables users to build their reputation based on their contributions and skills. It offers a space where individuals and organizations can organize contests to identify and recruit talent, opening up monetization opportunities.

## Features

- **Community-based Forums:** Users can join various communities based on their interests, such as guitar, gaming, coding, and more.
- **Rating System:** Users are rated based on their skillset within a specific community, allowing them to showcase their expertise.
- **Activity Rating:** User ratings are influenced by factors such as likes received on posts/activities. Likes from higher-rated accounts carry more weight to counter fake accounts.
- **Contests:** Users can participate in contests organized by individuals or corporations, contributing to their overall rating.
- **Tokens (Karma-like system):** Users can purchase tokens that can be donated to others as a form of appreciation or recognition for their contributions.
- **Monetization Opportunities:** The platform provides avenues for organizations to conduct talent identification and recruitment contests.

## Tech Stack

SkillShow is built using the T3 stack, which includes the following technologies:

- **T** - TypeScript
- **T** - Next.js
- **T** - Prisma
- **T** - tRPC
- **T** - Tailwind.css

We have utilized Chakra UI, a UI kit, to streamline the user interface development process. The application can be deployed to Vercel or any other hosting provider of your choice.

## Installation

To run the SkillShow project locally, please follow the steps below:

### Prerequisites
- Node.js (v12 or higher)

Clone the repository:
```git clone https://github.com/2773kartik/SkillShow.git```

Navigate to the project directory:
```cd SkillShow```

Install the dependencies:
```npm i```

Set up the environment variables:
- Create a .env file in the backend directory.
- Define the necessary environment variables in the file, such as database connection details, API keys, etc.

Update the database
```npx prisma db push```

Start the server
```npm run dev```

## Usage

Once the SkillShow application is up and running, follow the steps below to use the platform effectively:

1. Open your web browser and navigate to the SkillShow application.
2. Sign up for a new account or log in if you already have one.
3. Explore different communities based on your interests, such as guitar, gaming, coding, and more.
4. Engage in discussions, ask questions, and share your knowledge with other users.
5. Like posts or activities that you find helpful or interesting to show appreciation.
6. Participate in contests organized by individuals or corporations to showcase your skills and earn ratings.
7. Purchase tokens from the store and donate them to other users as a form of recognition.
8. Stay active and contribute positively to the community to improve your overall rating and reputation.
9. Keep an eye out for talent identification and recruitment contests organized by organizations, which can lead to monetization opportunities.
10. Enjoy the SkillShow experience and continue to grow your skills and connections within the community.

Feel free to explore all the features and functionalities of SkillShow to enhance your networking, knowledge-sharing, and skill-building experiences.
## Contributing

We welcome contributions to the SkillShow project! If you have any ideas, suggestions, bug reports, or improvements.

## License

The SkillShow project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of this license.
