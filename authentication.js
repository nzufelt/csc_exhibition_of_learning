// check if authenticated, if not redirect to admin login
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/admin-login')
}

// check if authenticated, if yes redirect to admin home
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/admin-home')
    }
    next()
}

module.exports = {checkAuthenticated, checkNotAuthenticated}