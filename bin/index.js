#! /usr/bin/env node
const yargs = require("yargs");
const usage = "\nUsage: pairUp <{teamMember: [preferred, team, members], otherMember: [their, preferred, pairs]}>";
const options = yargs  
      .usage(usage)  
      .help(true)  
      .argv;
// const teamMembers = ['madelyn', 'dennis', 'artem', 'nishant', 'annie', 'fleetwood', 'young']
const teamMembers = ['tyler','michael','charm','stevie','kirsten']

const teamMemberPreference = {
	'charm': ['tyler','stevie','simon'],
	'tyler': ['simon','kimberly'],
	'stevie': ['nate','charm','gen'],
	'michael': ['tyler'],
	'kirsten': ['kirsten'],
	'break': [],
}

const makePairs = (teamMembers) => {
	const firstHalf = teamMembers.slice(0, teamMembers.length/2)
	const pairs = firstHalf.map((element, index) => {
		// console.log(index)
		// console.log(teamMembers.length-index)
		// console.log(teamMembers[teamMembers.length-index-1])
		return [element, teamMembers[teamMembers.length-index-1]]
	})

	// console.log(pairs)
	return pairs
}

makeAllRoundRobins = (teamMembers) => {
	let collectionOfRobins = []
	const leader = teamMembers[0]
	const rotators = teamMembers.slice(1)
	for (let step = 0; step < rotators.length; step++) {
		const floater = rotators.pop()
		rotators.unshift(floater)
		const newRobin = [leader].concat(rotators)
		const pairs = makePairs(newRobin)
		collectionOfRobins.push(pairs)
	}
	// console.log('unordered', collectionOfRobins)
	return collectionOfRobins
}

const orderPairsByBest = (teamMembers, teamMemberPreference) => {
	if (teamMembers.length % 2 !== 0) {
		teamMembers.push('break')
	}
	const allRoundRobins = makeAllRoundRobins(teamMembers)

	const scorePairs = (oneRobinRound) => {
		let scoreTracker = 0
		oneRobinRound.forEach(pair => {
			if (teamMemberPreference[pair[0]].includes(pair[1])) {
				scoreTracker += 1
			}
			if (teamMemberPreference[pair[1]].includes(pair[0])) {
				scoreTracker += 1
			}

		});

		// console.log(oneRobinRound, scoreTracker)
		return scoreTracker
	}

	const compareScores = (a, b) => {
		return scorePairs(b) - scorePairs(a)
	}

	const all =  allRoundRobins.sort(compareScores)

	console.log(all)
	return all
}

orderPairsByBest(teamMembers, teamMemberPreference)