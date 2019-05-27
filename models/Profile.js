const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const ProfileSChema = new Schema({
    user: {
        type: Schema.Types.ObjectId, //associated the user by his ID, i.e connects each profile to a user
        ref: 'users' //references the collection that is reffered to
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        title: String
    },
    experience: [{
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,

        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }


    }],
    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,

        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }


    }],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSChema);