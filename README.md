# Crwn Clothing
E-commerce fashion store built with React, Typescript, Redux and Firebase. Stripe API is also used for payment feature.

![crwnclothing](https://user-images.githubusercontent.com/56903269/210041265-ad832857-a3c9-4e32-b28b-65fe9c893be3.png)

# User authentication
For user login, the email and password as well as google sign in features from Firebase are used. Firebase then provides `auth.currentUser` for me to check if a user is logged in.

# Storing and fetching products
Initially, React Context is used for the state of the store products but I incorporated Redux which provides a single source of truth and provide state at a global level. The products' data are stored in Firebase as a document collection which can then be fetched by grabbing the collection reference and using it to obtain a query snapshot where the products can be accessed. 

# Payment and Stripe API
The Stripe API is used to set up the payment section and it is a fast process since the payment form section is provided. A serverless function is used as the backend to manage payment processing since Stripe does not allow any requests from the frontend. For payment processing, the serverless function will receive a request to create a payment intent and then return the response with the client secret to be used to confirm card payment from the frontend. So the final transaction success or error status will come from Stripe's `confirmCardPayment` method.
