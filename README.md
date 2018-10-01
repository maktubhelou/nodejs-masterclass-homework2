# Homework Assignment #2

Pizza Delivery App (server-side).
This app covers the basic functions required of a simple pizza delivery service. Users can create a user ID, create a token which allows them to log in and log out, see the menu, place orders and pay using Stripe. When an order is placed, an e-mail is sent to the user.

_Add the ability to create a user profile such as favorite toppings so that they can be informed specifically of deals meeting their preferences._

## How to Turn It In:

1. [ ] Create a public github repo for this assignment.
2. [ ] Create a new post in the Facebook Group and note "Homework Assignment #2" at the top.
3. [ ] In that thread, discuss what you have built, and include the link to your Github repo.

## User Stories:

1. [√] New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.
2. [√] Users can log in and log out by creating or destroying a token.
3. [√] When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system).
4. [√] A logged-in user should be able to fill a shopping cart with menu items
5. [√] A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards
6. [√] When an order is placed, you should email the user a receipt. You should integrate with the sandbox of Mailgun.com for this. Note: Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup any DNS for your domain for this task https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account

This is an open-ended assignment. You may take any direction you'd like to go with it, as long as your project includes the requirements. It can include anything else you wish as well.

### Enpoints

| URL Enpoints            | action                                           | required fields                                                          |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| **/greeting**           | Returns a greeting                               | none                                                                     |
| /users:                 |
| post:                   | create a user                                    | firstName, lastName, phone, email, streetAddress, password, tosAgreement |
| get:                    | get user data                                    | phone, headers: token                                                    |
| put:                    | update a user                                    |
| delete:                 | delete a user                                    |
| **/tokens**             |
| post:                   | create a token                                   | phone, password, email                                                   |
| get:                    | retrieve a token                                 | tokenId, password                                                        |
| put:                    | update a token                                   | tokenId, password                                                        |
| delete:                 | destroy a token                                  | tokenId                                                                  |
| **/menu**               |
| get:                    | retrieve entire menu                             | token                                                                    |
| **/orders**             |
| post:                   | add an item to shopping cart                     | token, title, quantity, price                                            |
| delete:                 | remove an item from shopping cart                | token, title, quantity (to reduce)                                       |
| **/pay:**               |                                                  |                                                                          |
| post:                   | make credit card payment for shopping cart items | token, phone, street address, email                                      |
| **Additional Handlers** |                                                  |                                                                          |
| notFound:               | 404-Not Found                                    |                                                                          |
| sendEmailInvoice:       | send e-mail                                      |                                                                          |
| verifyToken:            | verify user data                                 |                                                                          |
