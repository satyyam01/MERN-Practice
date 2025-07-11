exports.error = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', currentPage: '404' }); // render the 404.ejs file with the page title
}