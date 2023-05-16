## Mkc Image Link Generator

Mkc Image Link Generator is a Node.js project that provides image link generation, image format change, and image report generation functionalities.

## Installation

To use this project, you need to have Node.js installed on your machine. Follow these steps to get started:

- Clone the project repository to your local machine.
- Navigate to the project directory and run `npm install` to install the project dependencies.
- Run `npm start` to start the application.

## Usage

The Mkc Image Link Generator provides the following API endpoints:

- `/upload-image`

This endpoint accepts a POST request with an image file in the multipart/form-data format. The following request body parameters are required:

    - `use`: The intended use of the image.

The following request body parameter is optional:

    - `format (optional)`: The desired image format. If not provided, the original format will be used.

The endpoint returns a JSON response with the following properties:

The endpoint returns a JSON response with the following properties:

`message`: A message indicating whether the image was uploaded successfully.

`imageLink`: The URL of the uploaded image.

---

- `/get-image/:id`

This endpoint accepts a GET request with an image ID as a URL parameter. The endpoint returns the requested image in the specified format.

---

`/get-image-report`

This endpoint accepts a GET request and returns a list of all uploaded images in the following format:

```
[
  {
    "imageId": "imageId",
    "imageFormat": "imageFormat",
    "imageLink": "imageLink",
    dimension:imageDimension,
    size: imageSize,
    "use": "use",
    "fieldname": "fieldname",
    "originalname": "originalname",
    "mimetype": "mimetype",
    "date": "date"
  },
  ...
]
```

## Tech Stack

The Mkc Image Link Generator is built using the following technologies:

- **Node.js**: a JavaScript runtime built on Chrome's V8 JavaScript engine for server-side application development.
- **Express**: a fast and minimalistic web framework for Node.js used to build web applications and APIs.
- **MongoDB**: a NoSQL document-oriented database used to store and retrieve data as documents in JSON-like format.
- **Mongoose**: an Object Data Modeling (ODM) library for MongoDB and Node.js used to provide schema validation and data querying capabilities.
- **Multer**: a middleware for handling multipart/form-data used to upload files.
- **Sharp**: an image processing library used to process and manipulate images.
- **TypeScript**: a statically typed superset of JavaScript used to improve code maintainability, reduce errors, and increase productivity in large-scale applications.
