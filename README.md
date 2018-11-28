# Twitter Clone

A simple Twitter Clone using Node/Express/Mongo & Vue JS.

## Authentication
* [x] Create Server
* [x] Add auth router
* [x] Create user with POST /auth/signup
	* [x] validate required fields
	* [x] Check if username is unique
	* [x] hash password with bcrypt
	* [x] insert into db
* [x] Create Landing Page
	* [x] Link to Sign Up Page
* [x] Create Sign Up Page
	* [x] Form with: username and password
	* [x] When form is submitted
		* [x] Validate username
			* [x] Display errors
		* [x] Validate password
			* [x] Display errors
		* [x] POST request to server
			* [x] Display errors
			* [x] If succesful sign up
				* [x] Redirect to login page
* [x] Login user with POST /auth/login
	* [x] validate the user
	* [x] check if username in db
		* [x] compare password with hashed password in db
		* [x] Create and sign a JWT
      * [x] Respond with JWT
* [x] Create Login Page
	* [x] Form with: username and password
	* [x] When form is submitted
		* [x] Validate username
			* [x] Display errors
		* [x] Validate password
			* [x] Display errors
		* [x] POST request to server /auth/login
			* [x] Display errors
			* [x] If succesful login
				* [x] Store the token in localStorage
				* [x] Redirect to the "dashboard"
* [x] If a logged in user visits the signup or login page, redirect them to the dashboard
* [x] If a non logged in user visits the dashboard, redirect to the login page
* [x] After sign up, immediately login
* [x] Show username on dashboard
* [x] If logged in:
	* [x] Show logout button in header

  ### Authorization:
* [x] Visitors can only see the homepage
	* [x] checkTokenSetUser middleware
		* [x] get token from Authorization header
			* [x] if defined ---
				* [x] Verify the token with the token secret
				* [x] Set req.user to be the decoded verified payload
			* [x] else - move along
	* [x] isLoggedIn middleware
		* [x] if req.user is set - move along
		* [x] else - send an unauthorized error message
	* [x] redirect to login form
* [x] Logged in users can only see their page
* [x] Create tweet form on client
	* [x] TweetMessage
* [x] POST /api/v1/tweets
	* [x] Must be logged in
	* [x] Logged in Users Can Create Tweets
		* [x] TweetMessage
		* [x] Set user_id on server with logged in users id
* [x] GET /api/v1/tweets
	* [x] Must be logged in
	* [x] Logged in Users Can request all Tweets 
		* [x] Get all tweets in DB
* [x] List all tweets on client
* [x] GET /api/v1/tweets/:username
  * [x] Must be logged in
	* [x] Logged in Users Can request all Tweets for a specific user