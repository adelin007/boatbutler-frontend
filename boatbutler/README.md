
# Due to time constraints, the following apply: 
  - Jobs are displayed directly to the Company. Instead, JobInvites should be displayed, and thus, 
    once a Company places a Proposal based on a JobInvite (and thus a Job), the invite for that job is not shown anymore, since the Company already made a Proposal based on it
  - Proposals are fetched, but they are not displayed in the frontend
  - Backend: 
    - There was a problem with Mongoose and mongoose types and thus the Data Model had to be changed to accomodate the bugs, some parts become inconsistent 
        - *npm run dev* worked, but *npm start * did not, so the scripts are now equivalent, thus *npm start* does not do the usual *tsc && node dist/app.js*


# Test data: 
    * normal user account: email/username: john@email.com, pass: john123 (restricted access, since it's not a user of type COMPANY)
    * company user account: email/username: company@email.com, pass:company123 (only they have access)
    
- run locally with instructions from https://github.com/adelin007/shopping-list-backend.git  
- access hosted version at: https://awesome-blackwell-037aa5.netlify.app/

# Create React App documentation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


