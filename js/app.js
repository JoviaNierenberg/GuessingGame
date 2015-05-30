//When a game begins
	//there should be a random number generated between 1-100.
	var $num = Math.floor((Math.random() * 100) + 1);
	//generate starting number of guesses
	var $numGuesses = 5;
	// generate array to store guesses
	var $guessArr = [];
	//hide message initially
	$(".response span").hide();
	$(".note span").hide();
	$(".hint span").hide();

// On submit guess
	$("#submitButton").click(function(){
		var $prevGuess = $guessArr[$guessArr.length - 1];
		var $guess = $("#userGuess").val();
		//Validate inputs that they are real numbers between 1-100.
		$("#userGuess").val("");
		if ($guess%1 !== 0){
			alert("Guess must be an integer.");
		}
		else if ($guess >100){
			alert("Guess must be less than 100.");
		}
		else if ($guess < 1){
			alert("Guess must be greater than 1.");
		}
		else {
			//Store all of the guesses and create a way to check if the guess is a repeat.
			for (var i = 0; i < $guessArr.length; i++){
				if (($guess - $guessArr[i]) === 0) {
					alert("You already guessed that number. Please guess again.");
				}
			}
			$guessArr.push($guess);
			$(".note span").text("Your guesses have been " + $guessArr);
			//$(".note span").append(". Your previous guess was: " + $prevGuess);
			$(".note span").show();
			
			//Allow the user to guess only a certain amount of times. 
			if ($numGuesses > 1) {
				$numGuesses --;
				$(".guessesRemaining span").text($numGuesses + " guesses remaining");
			}
			else {
				//When they run out of guesses let them know the game is over.
				$(".guessesRemaining span").text("Game over. The number was " + $num + ". Please play again!");
				$(".response span").hide();
				$("#submitButton").hide();
				$("#hintButton").hide();
			}

			var $diff = $guess - $num;
			var $prevDiff = $prevGuess - $num;

			if ($diff === 0) {
				//Remove buttons and guesses remaining when the user guesses the correct answer.
				$(".response span").text("The number was " + $num + ". Congrats, you won the game!");
				$(".guessesRemaining span").hide();
				$("#submitButton").hide();
				$("#hintButton").hide();
			}
			else {
				//After the user submits a guess, indicate whether their guess is 'hot' or 'cold'. Let the user know if they need to guess higher or lower.
				if (Math.abs($diff) < 5) {
					$(".response span").text("You're really hot!");
				}
				else if (Math.abs($diff) < 10) {
					$(".response span").text("You're hot!");
				}
				else if (Math.abs($diff) < 20) {
					$(".response span").text("You're warm.");
				}
				else if (Math.abs($diff) < 30) {
					$(".response span").text("You're cold.");
				}
				else {
					$(".response span").text("You're ice cold.");
				}
				if (Math.abs($diff) < Math.abs($prevDiff)){
					$(".response span").append(" You're warmer than last time!");
				}
				else if (Math.abs($diff) > Math.abs($prevDiff)){
					$(".response span").append(" You're cooler than last time.");
				}
				if ($diff < 0){
					$(".response span").append(" Guess higher.");
				}
				else if ($diff > 0){
					$(".response span").append(" Guess lower.");
				}	
			}
			if ($numGuesses > 1){
					$(".response span").show();
				}
			
			
		}	
	});



//Submit the guess by pressing enter as well.
	$("#userGuess").keypress(function(event) {
    	if(event.which === 13) {
	    	event.preventDefault();
	    	$("#submitButton").click();
		}
    });
//Create a new game button that resets the game.
	$("#playAgainButton").click(function(){
		window.location.reload();
	});
//Track the user's previous guess. Let them know if they are getting “hotter” or “colder” based on their previous guess.
	//store absolute value of number minus guess
	//if bigger display colder
	//if smaller display hotter
//Create a button that provides the answer (Give me a Hint).
	$("#hintButton").click(function(){
		$(".hint span").append($num + ". Shhhh, don't tell!");
		$(".hint span").show();
	});

//After a user guesses a number keep a visual list of Hot and Cold answers that the user can see.
	//array with list of possible answers?


