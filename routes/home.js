const express = require('express');
const router = express.Router();

router.get("/",(request, res) => {
   res.render('index',{title: 'My Express App', message: 'Hello Loulou'});
});

module.exports = router;
