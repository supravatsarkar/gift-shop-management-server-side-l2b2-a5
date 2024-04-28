# Gift Shop Manager: A MERN Stack Application

### Gift Shop Manager is a full-stack web application build using MERN (MongoDB, Express.js, React.js, Node.js) stack with TypeScript. It offers comprehensive tool for gift shop management (you can also using it as others shop management only some minimal changes) including user management, shop management, sales management, sales history, dashboard summary. With its user-friendly interface and powerful features, managing your gift shop has never been easier.

- [Check out the live demo](https://gift-shop-management-client-side-l2b2-a5.vercel.app/)
- [Client side repo link](https://github.com/supravatsarkar/gift-shop-management-client-side-l2b2-a5)
- [Server side repo link](https://github.com/supravatsarkar/gift-shop-management-server-side-l2b2-a5)

## Installation Instructions

### Client side

- Node.js version v20.xx.x require for both side
- copy the github repository and go to your directory where you want place the source file. Now run `git clone repo-url`
- change directory to project root directory and Run `npm install` command to install all of the dependencies
- Goto `.env.example` file and rename this file to `.env` from `.env.example`. Set your server base url for api's endpoints like- `VITE_SERVER_BASE_URL = 'server-url'`.
- If successfully installed all of dependencies and env variable then run `npm run dev`.
- Now your application is running on [http://localhost:5173](http://localhost:5173) url in your local machine.
  -After your change if you want create a build for production run `npm run build` to generate build file.

### Server side

- Node.js version v20.xx.x require for both side
- copy the github repository and go to your directory where you want place the source file. Now run `git clone repo-url`
- change directory to project root directory and Run `npm install` command to install all of the dependencies
- Goto `.env.example` file and rename this file to `.env` from `.env.example`. Set necessary env variables values.
- If successfully installed all of dependencies and edit env variable then run `npm run dev`.
- For confirmation check terminal log and hit localhost:5000 on browser address bar. If all are okay then give you 200 status response and massage like ok.

- Run `npm run build` command to build project for production environment.

- Run `npm run start` command to build and start project for production environment.
- Run `npm run deploy-vercel` command for create a build and deployed project for production environment to vercel plat from (may need extra authentication from vercel for first time ).

## Features

- **Register** as a shop manager.
- **Login** as a shop manager or master admin.
- **Dashboard:-** View summary like Active Products, Available products, out of stock, Sales count, Sales amounts
- **User Management panel(Master admin):-** For view all of user and active like block user, delete user etc.
- **Shop Management:-** Create, Edit, View and Delete Gifts and also Search Gift with different fillers, update quantity of gifts, Pagination feature.
- **Sales Management:-** Search gifts and mark as sell with providing necessary info.
- **Sales History:-** View sales graph daily, weekly, monthly, yearly as per your requirement for better analysis your sales.

## Technologies Used

- I using TypeScript as a programming language for both client and server side.
- Database- MongoDB,
- Express.js for rest API as a backend framework
- Node.js run time for run js code on server side
- React for creating interactive, fast frontend.
- Redux and RTK query for complex state handle and api call.
- keep-react, shadcn/ui, ant-design as component library for frontend side
- Additional libraries or tools (Tailwind CSS, rect-router, JWT, zod, eslint, bcrypt);

## API Documentation

- [API documentation](https://documenter.getpostman.com/view/19116876/2sA3BuVoJ1)

## Deployment on vercel

### Client Side

- Push your code on git remote platform like github, gitlab etc.
- Signup/login on vercel platform.
- Add project and connect git remote url.
- Click on deploy button.
- Wait some moment. After finish you can find some live lik.

### Client Side

- See this tutorial [How to deploy an Express API to Vercel](https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel)

## Contact Information

### Supravat sarkar

### Fullstack Stack Developer

### Currently working as a Node.js developer at Oyelabs

### [supravat.sarkar21@gmail.com](mailto:supravat.sarkar21@gmail.com)

### [Linkdin](https://www.linkedin.com/in/supravat-sarkar-4660161b9/) | [Github](https://github.com/supravatsarkar)

### [+919851650495](+919851650495)
