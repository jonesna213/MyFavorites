/**
 * Checks if the user is not logged in and if not, redirects back to index page.
 * 
 * @param {*} context the application context
 */
const authorize = context => {
    if (context.user === null) {
        window.location.href = "/";
    }
}

export default authorize;