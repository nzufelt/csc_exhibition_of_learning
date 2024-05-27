const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    //async function that authenticates user
    const authenticateUser =  async (email, password, done) => {
        //return user by email
        const user = await getUserByEmail(email)
        console.log(user)
        if (user == null){
            //'done' is a callback function provided by Passport.js that takes three arguments:
            //1. error 2. user 3. info
            return done(null, false, {message: 'No user with that email'})
        }

        try {
            console.log(password)
            console.log(email)
            console.log(user.password)
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done(null, false, {message: "Password incorrect"})
            }
            
        } catch (e){
            return done(e)
        }
    }
    //specifying that the email from login credentials corresponds to the username
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    //serialization stores the user ID in the session
    passport.serializeUser((user, done) => done(null, user.admin_id))
    //deserialization retrives the user object from the database based on the stored ID
    passport.deserializeUser((admin_id, done) => {
        return done(null, getUserById(admin_id))
    })
}

module.exports = initialize