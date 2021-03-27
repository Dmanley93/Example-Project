// Changes the background every 5 seconds.
function changeImage() {
	var BackgroundImg = [
		"./assets/1.jpg",
		"./assets/2.jpg",
		"./assets/3.jpg",
		"./assets/4.jpg"
	];
	var i = Math.floor((Math.random() * 4));
	document.body.style.backgroundImage = 'url("' + BackgroundImg[i] + '")';
}
setInterval(changeImage, 5000);


function renderAPEX(userName, userPlat, card) {
	let gamePlat = document.querySelector(`#first-card > #game-platform`);
	let kills = document.querySelector(`#first-card div #kills`);
	let gamesPlayed = document.querySelector(`#first-card div #games-played`);
	let killsPGame = document.querySelector(`#first-card div #kills-per-game`);
	let userDisp = document.querySelector("#first-card > #user-name");

	fetch('https://agile-badlands-84783.herokuapp.com/xbl/ToxicKrueger', {
		method: "GET",
		headers: {
			"trn-api-key": "da25f33c-7469-4fcb-aba3-db4dc3556c06",
			"Accept": "application/json",
			"Accept-Encoding": "gzip"
		}
	})
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
		gamePlat.textContent = "APEX - PlayStation";
		userDisp.textContent = "ToxicKrueger";
		kills.textContent = data.data.segments[0].stats.kills.displayValue;
		gamesPlayed.textContent = data.data.segments[0].stats.matchesPlayed.displayValue;
		killsPGame.textContent = (data.data.segments[0].stats.kills.value / data.data.segments[0].stats.matchesPlayed.value).toFixed(2);
	})
	.catch(err => {
		console.error(err);
	});


	setTimeout(function() {
		gamePlat = document.querySelector(`#second-card > #game-platform`);
		kills = document.querySelector(`#second-card div #kills`);
		gamesPlayed = document.querySelector(`#second-card div #games-played`);
		killsPGame = document.querySelector(`#second-card div #kills-per-game`);
		userDisp = document.querySelector("#second-card > #user-name");

		if (userPlat === "PS4") {
			userPlat = "psn";
			gamePlat.textContent = "APEX - PlayStation";
		} else if (userPlat === "XBOX") {
			userPlat = "xbl";
			gamePlat.textContent = "APEX - Xbox Live";
		} else {
			userPlat = "origin";
			gamePlat.textContent = "APEX - PC";
		}

		fetch(`https://agile-badlands-84783.herokuapp.com/${userPlat}/${userName}`, {
		method: "GET",
		headers: {
			"trn-api-key": "da25f33c-7469-4fcb-aba3-db4dc3556c06",
			"Accept": "application/json",
			"Accept-Encoding": "gzip"
			}
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			userDisp.textContent = userName;
			kills.textContent = data.data.segments[0].stats.kills.displayValue;
			gamesPlayed.textContent = data.data.segments[0].stats.matchesPlayed.displayValue;
			killsPGame.textContent = (data.data.segments[0].stats.kills.value / data.data.segments[0].stats.matchesPlayed.value).toFixed(2);
		})
		.catch(err => {
			console.error(err);
		});

	}, 1000)
	
}

function renderCOD(userName, userPlat) {
	// console.log(userName, userPlat);
	let gamePlat = document.querySelector(`#first-card > #game-platform`);
	let kills = document.querySelector(`#first-card div #kills`);
	let gamesPlayed = document.querySelector(`#first-card div #games-played`);
	let killsPGame = document.querySelector(`#first-card div #kills-per-game`);
	let userDisp = document.querySelector("#first-card > #user-name");

	fetch("https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/FFrozone/psn", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "b88cba1fcbmsh7869a886655f82ap1f8663jsn94efc9749e48",
			"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
		}
	})
	.then(response => {
		// console.log(response.json());
		return response.json();
	})
	.then(data => {
		gamePlat.textContent = "COD: Warzone - PlayStation";
		userDisp.textContent = "FFrozone";
		kills.textContent = data.br.kills;
		gamesPlayed.textContent = data.br.gamesPlayed;
		killsPGame.textContent = (data.br.kills / data.br.gamesPlayed).toFixed(2);
	})
	.catch(err => {
		console.log(err);
	});

	setTimeout(function() {
		gamePlat = document.querySelector(`#second-card > #game-platform`);
		kills = document.querySelector(`#second-card div #kills`);
		gamesPlayed = document.querySelector(`#second-card div #games-played`);
		killsPGame = document.querySelector(`#second-card div #kills-per-game`);
		userDisp = document.querySelector("#second-card > #user-name");

		if (userPlat === "PS4") {
			userPlat = "psn";
			gamePlat.textContent = "COD: Warzone - PlayStation";
		} else if (userPlat === "XBOX") {
			userPlat = "xbl";
			gamePlat.textContent = "COD: Warzone - Xbox Live";
		} else {
			userPlat = "acti";
			gamePlat.textContent = "COD: Warzone - PC";
		}

		fetch(`https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${userName}/${userPlat}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "b88cba1fcbmsh7869a886655f82ap1f8663jsn94efc9749e48",
				"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
			}
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			userDisp.textContent = userName;
			kills.textContent = data.br.kills;
			gamesPlayed.textContent = data.br.gamesPlayed;
			killsPGame.textContent = (data.br.kills / data.br.gamesPlayed).toFixed(2);
		})
		.catch(err => {
			console.error(err);
		});
	}, 1000)

	
}

function userQueryPopulate(userName, fgp) {
	let fgpArr = fgp.trim().split(":");

	switch (fgpArr[0]) {
		case "COD":
			// console.log(userName, fgpArr[1]);
			renderCOD(userName, fgpArr[1]);
			break;
		case "APEX":
			// console.log(userName, fgpArr[1]);
			renderAPEX(userName, fgpArr[1]);
			break;
		default:
			alert("Could not find that game.");
	}

	
}

const submitBtn = document.getElementById("btn");
const selectOne = document.getElementById("user-select-one");

submitBtn.addEventListener("click", event => {
	event.preventDefault();
	// console.log("event listener triggered");
	let userName = document.getElementById("user-query").value;
	let firstGameNPlat = selectOne.options[selectOne.selectedIndex].text;
	// console.log(userName, firstGameNPlat);
	userQueryPopulate(userName, firstGameNPlat);
})
