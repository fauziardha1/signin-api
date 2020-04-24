# signin-api
[https://fierce-anchorage-83457.herokuapp.com/](https://fierce-anchorage-83457.herokuapp.com/).<br>
Rest-API for user administration module.
In this api contain 4 end point such as signin, register, users , and delete

### /signin/ 
This end point used to verify the users data such as username and password that was registered before, this end point will response with json {"status":"success"} when user credential was right, and return resonse {"status":"failed"} when wrong credential.
This end point can access using post method

### /register/
This end point used to registering new user. this end point also response just like signin response.This end point can be access using post method.

### /users/
This end point will response with returning json data of all users in the module's database. this method can be access using get method.

### /delete/:id
This end point will deleting users credential by id of users in database. it will return success if it does, and return failed if it doesn't.


