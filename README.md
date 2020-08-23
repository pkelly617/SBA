SBA Weather App
Peter Kelly

Description
HTML/CSS/JS Skill based assessment. This is a weather app that can display
the weather in cities around the world and also includes a game where a user
can guess the weather in a mystery city.

Usage
First page (login.html) is a sample login page that simulates the ability to
sign up to use the weather app. A chosen username must be less than 20
characters and can only contain letters, digits, and the following
symbols: {_} , {.} , {-} . Password must be at least 8 characters long and must
match the input in the confirm password input field. Once these conditions are
met, The user is taken to the weather search page (search.html).

Here the user can enter in a city or a zip code. When a user hits the Get
Weather button, a request is made to the api and if the city is found, a card
is created and displays the name of the location, an icon of the current
weather, the current temperature and what it feels like, and a brief description
of the weather. While a user is on this page, every time they get the weather
of a new location, a new card is made and rendered next to the previously made
card.

On the guessing game page (weathers.html), when a user clicks the new game
button, a card is created that displays the same information that is displayed
on a card created on the weather search page without the name of the location.
This card represents a random city that the user will try to guess the location
from the cities presented to them in the table of buttons. When a user clicks
a button and the city choice is incorrect, the user is prompted to guess again.
If the choice is correct, the background image changes to a picture of the city.
The user can then start a new game.

The nav bar provides links to all of the pages as well as links to other
weather sites in a drop down menu.

Technology

HTML
CSS
Javascript
Bootstrap 4

Resources

For weather information and icons:
https://openweathermap.org/

For city images:
https://unsplash.com/

For fonts:
https://fonts.google.com/
