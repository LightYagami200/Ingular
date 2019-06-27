//underconstuction 

const { Extendable } = require('klasa');
const { Guild } = require('discord.js');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [Guild] });
	}

        
            maxStrikes = 3;
            currentStrikes = 0;

            get numOfStrikes(){
                return currentStrikes;
            }

            get MaxStrikes(){
                return maxStrikes;
            }
            
            set MaxStrikes(number){
                maxStrikes = number; 
            }

            set currentStrikes(number){
                currentStrikes = number;
            }

            Strike(user){
                
            }
        }
    }
}