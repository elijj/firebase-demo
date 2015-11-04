// Create application with dependency 'firebase'
// form ngs https://github.com/adtroupe/angular-2/tree/master/form

var myApp = angular.module('myApp', ['firebase']);

// Bind controller, passing in $scope, $firebaseAuth, $firebaseArray, $firebaseObject
myApp.controller ('myCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
    var ref = new Firebase("https://dazzling-torch-2174.firebaseio.com/");
    var tweetsRef = ref.child('tweets');
    var userRef  = ref.child('user');
    $scope.tweets = $firebaseArray(tweetsRef);//tweets
    $scope.users = $firebaseObject(userRef);//users
    // Create authorization object that referes to firebase
    $scope.authObj = $firebaseAuth(ref);
    // Test if already logged in
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        $scope.userId = authData.uid;
    } 

    // SignUp function
    $scope.signUp = function() {
        // Create user
        $scope.authObj.$createUser({
            email: $scope.email,
            password: $scope.password,          
        })

        // Once the user is created, call the logIn function
        .then($scope.logIn)

        // Once logged in, set and save the user data
        .then(function(authData) {
            $scope.userId = authData.uid;
            $scope.users[authData.uid] ={
                handle:$scope.handle, 
                userImage:$scope.userImage,
            }
            $scope.users.$save()
        })

        // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }

    // SignIn function
    $scope.signIn = function() {
        $scope.logIn().then(function(authData){
            $scope.userId = authData.uid;
        })
    }

    // LogIn function
    $scope.logIn = function() {
        return $scope.authObj.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        })
    }

    // LogOut function
    $scope.logOut = function() {
        $scope.authObj.$unauth()
        $scope.userId = false
    }

    //end of auth

    $scope.tweet = function (){
        $scope.tweets.$add({
            text:$scope.newTweet,
            userId:$scope.userId,
            likes:0,
            time:Firebase.ServerValue.TIMESTAMP

        }).then(function(){
            $scope.newTweet = '';
            $scope.tweets.$save();
        });
    }

    //
    $scope.like =function(tweet){
        tweet.likes++;
        $scope.tweets.$save()
    }

})
    // Create a variable 'ref' to reference your firebase storage


    // Create references to store tweets and users
/*
$scope.authObj = $firebaseAuth(ref);
    var authData = $scope.authObj.$getAuth();
    var dataRef = ref.child('key'); */
    // Create a firebaseArray of your tweets, and store this as part of $scope


    // Create a firebaseObject of your users, and store this as part of $scope

	
    /* 
		-- Insert authentication code here
    */
	
	// Write an accesible tweet function to save a tweet
		
		/* Add a new object to the tweets array using the firebaseArray .$add method. Inclue:
			text:text in textarea,
			userId:current user id,
			likes:0,
			time:Firebase.ServerValue.TIMESTAMP // tells firebase server to save timestamp
		*/
		

		// Once the tweet is saved, reset the value of $scope.newTweet to empty string


	// Function to like a tweet
	

