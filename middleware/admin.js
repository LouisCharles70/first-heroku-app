module.exports = function(req,res,next){
   if(!req.user.isAdmin) return res.status(403).send('Access denied ! Please contact an admin to proceed with this operation..');

   next();
}
