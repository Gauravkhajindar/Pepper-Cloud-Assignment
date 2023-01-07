# Pepper-Cloud-Assignment


●     Implement uploading the images

○     Create an api that accepts the image in the form body and upload the image to any cloud service such as s3.

○     You should not accept anything other than the images and the format of the images should be png/jpeg.

○     You shouldn't upload more than 2mb(You can either throw an error or reduce the size and upload a bonus point if you can do this).

●     Create the document in the database(MongoDb)

○     After the images have been uploaded you need to store the `url` in the `Image` collection along with the `uploadedDate`.

●     Implement Sorting, filtering and pagination

○     Create an endpoint /images that return the images

○     Pagination

■     Use 'page numbers' style of pagination

■     Include total count in the response matching the current query result

○     Sorting

■     allow sorting by `uploadedDate`

○     Filtering

■     Allow filtering by the `uploadedDate`

■     Should return the images from a specific date range (example: if user applies filter from 25th Jan to 29th Jan he should get all the images uploaded in that time period)

●     Include instructions for running the app – preferably a single command for setting up dependencies and services, running the app.

●     Provide a Git repo link containing the project files.
