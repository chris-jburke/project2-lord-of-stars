require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

const lotrInstance = axios.create({
	baseURL: 'https://the-one-api.herokuapp.com/v1/character'
});
axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.LOTR_API_KEY;
lotrInstance.defaults.headers.common['Authorization'] = "Bearer " + process.env.LOTR_API_KEY;

//mounted at character
router.get('/create', function(req,res) {
	res.render('character/create')
})

router.get('/confirm', function(req, res) {
	console.log('\n')
	console.log('\n')
	lotrInstance.get(lotrInstance.baseURL)
	.then(function(response) {
		let returnData = response.data;
		let useData = returnData['docs'];
		let possibleChars = [];
		useData.forEach(function(char) {
			if(char.name.includes(req.query.name)){
				possibleChars.push(char)
			}
		})

		console.log(possibleChars);
		res.render('character/confirm', {characters: possibleChars});

	}).catch(function(err) {
		console.log(err);
		res.send("ERROR");
	})
});

router.post('/confirm', function(req, res) {
	console.log('\n');
	console.log('\n');
	console.log('\n');
	db.character.findOrCreate({
		where: {
			name: req.body.name
		},
		defaults: {
			gender: req.body.gender
		}
	}).then(function([currChar, created]) {
		if(created) {
			axios.get(`https://the-one-api.herokuapp.com/v1/character/${req.body._id}/quote`)
			.then(function(response) {
				let returnData = response.data;
				let useData = returnData['docs'];
				useData.forEach(function(currQuote) {
					db.quote.create({
						name: currChar.name,
						quote: currQuote.dialog
					}).then(function(madeQuote) {
						madeQuote.addCharacter(currChar)
					}).catch(err => {
						console.log(err);
						res.send("ERROR");
					})
				})
				//console.log(returnData);
			}).catch(function(err) {
				console.log(err);
			})
		}
		res.redirect(`/character/show/${currChar.id}`);
	}).catch(err => {
		console.log(err);
		res.send("ERROR");
	})
	/*
	axios.get(`https://the-one-api.herokuapp.com/v1/character/${req.body._id}/quote`)
	.then(function(response) {
		let returnData = response.data;
		console.log(returnData);
	}).catch(function(err) {
		console.log(err);
	})
	*/
});

router.get('/show/:id', function(req, res) {
	console.log('\n');
	console.log('\n');
	console.log(req.params.id);
	db.user.update(
		{
			characterId: parseInt(req.params.id)
		},
		{
			where: {id: req.user.id}
		}
	).then(function(updated) {
		if(updated){
			console.log('\n');
			console.log('\n');
			console.log("SUCCESS");
		}
	}).catch(err => console.log(err));
	db.character.findOne({
		where: {
			id: req.params.id
		},
		include: [db.quote]
	}).then(function(currChar) {
		res.render('character/show', {character: currChar});
	}).catch(function(err) {
		console.log(err);
		res.send("ERROR");
	})
}) 

module.exports = router;