# <%= projectName %> Project

## Running this on your machine

1. Clone this repo and go to your terminal and `cd` into the project root directory
2. Install node.js 
  - If you have OS X and have homebrew use `brew node install`
  - If you're a dev on OS X and don't have homebrew you should probably install it and run the above: 
  - Otherwise install node via <% if (!libsass) { %> 
3. Install SASS<% } %>
<%= libsass ? 3 : 4 %>. Install bower with `npm install -g bower`
<%= libsass ? 4 : 5 %>. Install dependencies `npm install && bower install'
<%= libsass ? 5 : 6 %>. Run `grunt serve` your browser should open automatically with the app running if not hit http://localhost:9000 to see it
