# Kaaa

We all have people that used to be in our lives, but no longer are. This can be due to a plethora of factors. Wanting to look further into this issue, we did some research on the matter, and what we noticed is that oftentimes people fail to stay connected simply due to lack of time or common circumstances. We also found that low barriers of entry help people stay in touch for longer- that is, if less time or money is involved in two people spending time together, they will do it more often. Our goal is to help these people keep in touch. We want to provide them with a way to stay connected meaningfully for longer with minimal commitment.

As a solution to this issue, we came up with an app that allows people to keep in touch by playing a simple game together. This game requires very little time commitment, no money commitment, and allows people to come back time and time again for new experiences that they can share with old friends. We call it Kaaa. Kaaa is a web app that allows friends to create groups and draw in response to prompts. Once the prompt’s timer runs out, you’ll get to see everyone’s finished drawings collected into one big mosaic!
\


## User Guide
Kaaa allows you to connect with friends through our web application. As of the final release, users can make groups, draw given prompts, view other's drawings for the prompts (mosaic), see previous prompt drawings (gallery), and much more. Users can increase connectivity with those they care about driving healthier and stronger relationships.

### Code Structure
- The backend folder is responsible for the SQL connections to our Supabase https://supabase.com/docs database.
- The frontend2 folder takes care of the bulk of the React code that powers the application itself.

### Running Locally
To run Kaaa you must have Node.js and npm installed. TO execute simply execute npm run dev.

### Running Git Hub Page

### Features and Usability
- To add an executable: click the `Add Game` button, and a pop-up window will open
  - The `name` field will allow you to type in any name you want displayed, and is required
  - The `path` field is the path to the executable for the app, and is required
  - The `image path` field is the path to the display image, and is optional
- To launch an executable, click the `Play` button for the desired executable
- To reorder the list click the `Edit Order` button, and you will enter editing mode
  - Click and drag executables to reorder the list
  - Click `Save Order` button to save the order and exit editing mode
- To delete and executable, click the `Delete` button next to the desired executable
\
\
This is the main page:
![Alt text](resources/change_order_page.png)
- The `Add Game` button is located in the top left
- The `Edit Order` button is also located in the top left
- `Start Game` and `Delete` are to the left of the game they belong to
\
\
This is the add game page:
![Alt text](resources/add_game_page.png)
- All fields that can be filled are located in the pop-up window
- The `Exit` button is located in the top left of the pop-up window
- The `Clear` and `Add` buttons are located at the bottom of the pop-up
\
\
This is the change order page:
![Alt text](resources/main_page.png)
- The game is highlighted blue, indicating that it can be clicked and dragged
- The `Save Order` button is located at the top left

### Reporting Bugs
To report a bug or issue, navigate to the `Issues` tab of this repo, and click `New Issue`. Please be as descriptive as possible when reporting bugs. If applicable, please provide an image that shows the issue in your bug description.

### Known Bugs
To see a list of known bugs, navigate to the `Issues` tab, which has an up-to-date list of all reported bugs in the app.

## Developer Guide
Want to contribute to the project? Here's a guide on how you can:

### Obtaining Source Code
If you want to obtain and/or make edits to the source code, you may fork the repo. If/when you want to merge your additions to the official source code, submit a pull request, and an admin will review it.


### Running Back-End & Database Tests
In order to make use of the Google Test Suite for C++ you will need to have CMake installed on your device which you can do here: https://cmake.org/. For additional information on the proccess of setting up CMAKE you may find it useful to reference the Google Test homepage which can be found here: https://google.github.io/googletest/quickstart-cmake.html.

Once CMake is installed please start by reading the guiding comments within the backend_testing.cc file, This file can be located within the backend folder inside the main source code. The reason for reading and understand these tests is that the tests themselves rely on certain file paths to exist which may not exist on your local computer and will require some small changes to be made. Once you're done reading, cd into the backend folder. Then run the following commands to do an initial test that contains setup commands.\
`cmake -S . -B build`                                                                      
`cmake --build build`\
`cd build`\
`mkdir dbFiles`\
`New-Item -ItemType File -Path "dbFiles\ind.dat"`\
`New-Item -ItemType File -Path "dbFiles\lst.dat"`\
`ctest`

After this is completed you can just run the following commands below to continue testing in the future. Keep in mind that after every testing run you execute you will be put into the build folder so you will need to cd out of this back into the backend folder before testing again.\
`cmake -S . -B build`                                                                      
`cmake --build build`\
`cd build`\
`ctest`\
\
***If you do not wish to manually run the tests, they will automatically be run by the CI whenever a push is made.***


