const express = require('express');
const router = express.Router();

const courses = [
   {id: 1, name: 'Course 1'},
   {id: 2, name: 'Course 2'},
   {id: 3, name: 'Course 3'}
];

router.get("/",(req,res) => {
   res.send(courses);
});

router.get("/:id",(req,res) => {
   const course = courses.find(course => course.id === parseInt(req.params.id));

   if(!course) //404
      res.status(404).send("The course with the given id was not found");

   res.send(course);
});

router.post("/",(req,res) => {
   const {error} = validateCourse(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   if(!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required and should be min. 3 characters !');

   const course = {
      id: courses.length + 1,
      name: req.body.name
   };

   courses.push(course);
   res.send(course);
})

router.put('/:id',(req,res) => {
   // Find the course, return 404 if cannot find
   const course = courses.find(course => course.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given ID was not found');

   const {error} = validateCourse(course);
   if(error) return res.status(400).send(error.details[0].message);


   // Update course
   course.name = req.body.name;
   res.send(course);
})

router.delete("/api/courses/:id",(req,res) => {
   // Find the course, return 404 if cannot find
   const course = courses.find(course => course.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given ID was not found');

   //   Delete
   const index = courses.indexOf(course);
   courses.splice(index, 1);

   res.send(course);
})


function validateCourse(course){
   const schema = {
      name: Joi.string().min(3).required()
   }

   return Joi.validate(course.body, schema);
}

module.exports = router;
