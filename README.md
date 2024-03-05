# Kaaa

We all have people that used to be in our lives, but no longer are. This can be due to a plethora of factors. Wanting to look further into this issue, we did some research on the matter, and what we noticed is that oftentimes people fail to stay connected simply due to lack of time or common circumstances. We also found that low barriers of entry help people stay in touch for longer- that is, if less time or money is involved in two people spending time together, they will do it more often. Our goal is to help these people keep in touch. We want to provide them with a way to stay connected meaningfully for longer with minimal commitment.

As a solution to this issue, we came up with an app that allows people to keep in touch by playing a simple game together. This game requires very little time commitment, no money commitment, and allows people to come back time and time again for new experiences that they can share with old friends. We call it Kaaa. Kaaa is a web app that allows friends to create groups and draw in response to prompts. Once the prompt’s timer runs out, you’ll get to see everyone’s finished drawings collected into one big mosaic!


## User Guide
Kaaa allows you to connect with friends through our web application. As of the final release, users can make groups, draw given prompts, view others' drawings for the prompts (mosaic), see previous prompt drawings (gallery), and much more. Users can increase connectivity with those they care about driving healthier and stronger relationships.

### Code Structure
- The backend folder is responsible for the SQL connections to our [Supabase](https://supabase.com/docs) database.
- The frontend2 folder takes care of the bulk of the React code that powers the application itself such as onboarding users, adding groups, drawing, viewing the mosaic and gallery, and leaving groups.

### Running Locally
To run Kaaa you must have the latest version of Node.js and npm installed. You must run `npm install` the first time you execute the code or whenever changes are made. To officially run the code, execute `npm run dev`.

### Git Hub Page
To use the web application version of our code simply go to the following link: https://kaaa-plum.vercel.app/dashboard

### Features and Usability
- Created user accounts, allowing log-in and log-out capabilities.
- Created a centralized dashboard for easy and efficient access to the app's key features.
- Allow for the creation of groups among members.
- Created a whiteboard that allows users to draw generated prompts.
- Provided a mosaic view for drawing from group members for the most recently completed prompt.
- Provided a gallery view for a history of completed prompts for a particular group.
\

### Reporting Bugs
To report a bug or issue, navigate to the `Issues` tab of this repo, and click `New Issue`. Please be as descriptive as possible when reporting bugs. If applicable, please provide an image that shows the issue in your bug description.

### Known Bugs
To see a list of known bugs, navigate to the `Issues` tab, which has an up-to-date list of all reported bugs in the app.

### More Information
If you'd like to read more on the development process of the application you can checkout our project webpage here: https://uwsocialcomputing.github.io/Kaaa/ 
