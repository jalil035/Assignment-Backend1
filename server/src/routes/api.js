import express from "express";

import *as UsersController from "../controllers/UsersController.js"
import * as ProductController from "../controllers/ProductController.js";
import *as fileUploadController from "../controllers/fileUploadController.js";
import uploads from "../middlewares/fileUploads.js";
import * as ContactController from "../controllers/ContactController.js";
import * as TeamController from "../controllers/TeamController.js";
import * as BlogController from "../controllers/BlogController.js";
import * as ServicesController from "../controllers/serviceController.js";


const router = express.Router();

router.post("/Register", UsersController.register );
router.post("/Login", UsersController.login );
router.get("/logout", UsersController.logout );



// createProduct

router.post("/createProduct",ProductController.createProduct);
router.get("/AllProduct",ProductController.geAllProduct);
router.delete("/deleteProduct/:id",ProductController.deleteProduct);

// uploads-file
router.post("/fileUpload", uploads.array("file",20),fileUploadController.fileUpload)


// Contact API

router.post("/contact", ContactController.contact);


// টিম ম্যানেজমেন্ট রাউট
// Route to get all team members data mongo dibitay thaktay hobay
router.get('/getAllTeamMembers', TeamController.getAllTeamMembers);

// Route to add a new team member data mongodb tay pathabo
router.post('/addTeamMember', TeamController.addTeamMember);

// Route to update a team member by ID
router.put('/updateTeamMember/:id', TeamController.updateTeamMember);

// Route to delete a team member by ID
router.delete('/deleteTeamMember/:id', TeamController.deleteTeamMember);

// // Route to get active team members
// router.get('/team-members/active', TeamController.getActiveTeamMembers);



//service


// Route definitions service

router.get("/GetAll", ServicesController.getAll);
router.post("/add", ServicesController.add);
router.put("/Update/:id", ServicesController.update);
router.delete("/Delete/:id", ServicesController.Delete);


//blog api gola

router.post("/createBlog", BlogController.createBlog); // Create Blog
router.get("/getBlogs", BlogController.getBlogs); // Get All Blogs
router.get("/getBlogById/:id", BlogController.getBlogById); // Get Blog by ID
router.put("/updateBlog/:id", BlogController.updateBlog); // Update Blog by ID
router.delete("/deleteBlog/:id", BlogController.deleteBlog); // Delete Blog by ID




export default router;




