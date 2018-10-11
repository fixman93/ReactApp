This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Instructions
- npm install
- npm test
- npm start
- npm run build -> build project into a dist folder

# APP Routes

## Unprotected routes
- / => Talent landing page
- /company-landing => company landing page
- /log-in => log in page
- /talent/sign-up
  - /talent/sign-up/role => role tab
  - /talent/sign-up/details => details tab
  - /talent/sign-up/confirmation => confirmation response
- /company/sign-up
  - /company/sign-up/details


## Protected routes
- /talent-profile => talent profile page
  - /talent-profile/preferences => preferences tab
  - /talent-profile/current => current tab
  - /talent-profile/skills => skills tab
  - /talent-profile/links => links tab
  - /talent-profile/videos => video tab
- /talent-matches => list of all matches
  - /talent-matches/in-progress => matches in progress
  - /talent-matches/unsuccessful => unsuccessful matches

- /job => job page with opportunity description
  - /job/about => routes to create/edit about tab
  - /job/skills => routes to create/edit skills tab
  - /job/preferences => routes to create/edit preferences tab
  - /job/preview => preview of new job to be posted
  - /job/posted => feedback from job posting
- /jobs => list all jobs posted by the company
  - /jobs/active => list all active jobs
  - /jobs/filled => list as filled jobs

- /applications => show all applications
- /applications/in-progress => applications in progress
- /applications/rejected => rejected applications

- /logout => logout from current session

# Folder Structures

- assets => assets folder
- common => common components which are reusable for all other components
- company => company view folder, has all the components related to the company access
- services => all queries, mutations and external API calls
- talent => talent view folder, has all the components related to the user access
- web => has all the files needed for landing pages and other routes not restricted for users
