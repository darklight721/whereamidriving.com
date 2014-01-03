WhereAmIDriving.com
===================

A guess-the-city type of game using Google Maps' StreetView API.  
Check it out at http://www.whereamidriving.com.  

This app was created using the [MEAN](mean.io) (MongoDB, Express, Angular, Node) stack.  
A big thanks to [Yeoman](yeoman.io) (with generator-angular-fullstack installed) for providing the MEAN code templates!

The following will guide you how to get this thing up and running.

Documentation
-------------

1. First you must have these installed:
    * Node.js
    * MongoDB
    * Git

2. Copy the source to your local directory:

        git clone https://github.com/darklight721/whereamidriving.com.git

3. Inside the cloned source, install the dependencies:

        cd whereamidriving.com/
        npm install
        bower install

4. Run and fill up the DB with initial data

        mongod
        node scripts/resetStats.js app/data.json

5. Here are some grunt tasks to make life easier:
    * To preview your changes *(will autoreload the browser if you make changes in your codes while this is still running)*

            grunt serve
    * To preview the app ready for production *(minimized and optimized version)*

            grunt serve:dist
    * To build the app for production

            grunt build

6. To add new cities:

    Open a new text file and follow the format below:

        region: <Region>
        city: <City>
        <google maps streetview links, if multiple separate them by a new line>

    Sample file:

        region: USA
        city: Atlanta
        https://www.google.com/maps/preview#!q=atlanta&data=!1m8!1m3!1d3!2d-84.374691!3d33.760236!2m2!1f268.25!2f92.36!4f75!2m9!1e1!2m4!1sck5NkO-D09NUJ8Ljo2ThUw!2e0!9m1!6s%C2%A9+2014+Google!5m2!1sck5NkO-D09NUJ8Ljo2ThUw!2e0!4m18!2m17!1m16!1s0x88f5045d6993098d%3A0x66fede2f990b630b!3m11!1m3!1d3!2d-84.374691!3d33.760236!2m2!1f255.03!2f90.6!3m2!1i1280!2i1342!4f75!4m2!3d33.7489954!4d-84.3879824&fid=5
        https://www.google.com/maps/preview#!q=atlanta&data=!1m8!1m3!1d3!2d-84.384865!3d33.772004!2m2!1f345.23!2f100.22!4f75!2m9!1e1!2m4!1s5IzfnGqog_2xquLyd4PU9g!2e0!9m1!6s%C2%A9+2014+Google!5m2!1s5IzfnGqog_2xquLyd4PU9g!2e0!4m18!2m17!1m16!1s0x88f5045d6993098d%3A0x66fede2f990b630b!3m11!1m3!1d3!2d-84.374691!3d33.760236!2m2!1f255.03!2f90.6!3m2!1i1280!2i1342!4f75!4m2!3d33.7489954!4d-84.3879824&fid=5

    Run this command *(be sure to substitule /path/to/textfile to the location of the file you just created)*

        node scripts/updateData.js /path/to/textfile
        node scripts/updateStats.js app/data.json

7. And that's it! Feel free to make any changes and upload your own version. You can also contact me if you've seen a bug or anything.
