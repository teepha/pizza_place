# Pizza_place API
[![Build Status](https://travis-ci.org/teepha/pizza_place.svg?branch=develop)](https://travis-ci.org/teepha/pizza_place)
[![Coverage Status](https://coveralls.io/repos/github/teepha/pizza_place/badge.svg?branch=develop)](https://coveralls.io/github/teepha/pizza_place?branch=develop)
## Introduction
An application that provides the endpoints for a simple Pizza store. 

## Table of Contents
1. <a href="#hosted-app">Link to Hosted App</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#how-to-use">How To Use</a>
6. <a href="#author">Author</a>
7. <a href="#license">License</a>


## Link to Hosted App
* [API link](https://pizzaplace-api.herokuapp.com/)

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Msql](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)

## Application Features

*  Register a user
* User login
* Get all available menus
* Get a single menu detail
* Post the detail of a list of menu given the IDs 
* Place an order
* Get  a single order detail for a user
* Get order history for a user
* Admin can add more menu to the list

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/teepha/pizza_place.git

# Go into the repository
$ cd pizza_place

# Install dependencies
$ yarn install or npm install

# Create .env file for environmental variables in your root directory like the sample.env file and provide the keys

# Run the app
$ yarn start or npm start

# Check the port on the specified port on the env or 9000

# Run test
$ yarn test or npm run test
```

## API endpoints

Base_URL -> localhost:9000/api/v1/
  * Register: 
  ```
  {
    path: 'sign-up',
    method: POST,
    body: {
      name: <string>,
      password: <string, minLength: 5>,
      username: <string, unique>,
      role: <string, memberOf['user', 'admin']>
    }
  }
  ```
 * Login: 
  ```
  {
    path: 'login',
    method: POST,
    body: {
      password: <string, minLength: 5>,
      username: <string, unique>
    }
  }
  ```
  * Get all available menus: 
  ```
  {
    path: 'menu',
   method: GET,

  }
  ```
  * Get a single menu detail: 
  ```
  {
    path: 'menu/<menuId>',
    method: GET,
    params: {
      menuId: <integer>,
    }
  }
  ```
  * Post the detail of a list of menu in cart given the IDs: 
  ```
  {
    path: 'menu/cart',
    method: POST,
    body: {
      menuIds: <Array<Integers>, minLength: 1>
    }
  }
  ```
  * Place an order: 
```
{
    path: 'orders',
    method: POST,
    header: Authorization<token>,
    body: {
        "items":   <Array<Object>{
           "id":  <integer>,
          "quantity":  <integer>
      },
      "name":  <string>",
      "address":  <string>,
      "surname":  <string>",
      "phone_number":  <string>
    }
}
```
* Get  a single order detail for a user: 
  
```
  {
    path: 'orders/<orderId>',
    method: GET,
    header: Authorization<token>,
    params: {
      orderId: <integer>
    }
  }
  ```
* Get order history for a user: 
 ```
  {
    path: 'orders/history',
    header: Authorization<token>,
    method: GET
  }
  ```
* Admin can add more menu to the list: 
 ```
  {
    path: 'menu',
    header: Authorization<token: admin>,
    method: POST,
    body: {
      name: <string>,
      description: <string>,
      price: <integer>
    }
  }
  ```

## Recommended improvements

* The api response can be cached to improve the application performance
  and avoid refetching whas been fetched; The caching can be done with Redis.
* The response can also be paginated for readability when the response gets longer.
* Saving the order to the database can be wrapped in a `Transaction` so that when on fails, it will roll back
*  Admin view for all orders placed
* Admin ability to update menu detail
* User ability to update their profile and add default delivery address
*  Payment integration
* More test cases, maybe unit testing can be added

## Author

Lateefat Amuda

## License

MIT

---
