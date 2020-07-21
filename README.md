# Association for Computing Machinery Portal

Official front-end for the _ACM_ website & portal.

### Quick Start

 - Create `.env` file for Auth0 configuration, request ACM Development for domain and client ID. 
 - Run `npm start`

### Extended Start Guide

###### Mobile vs Web Development

`App.tsx` splits what gets rendered into two separate views through `react-device-react`. Content stored in `/src/mobileviews` should contain views for smaller viewports wheras content in `/src/views` should contain full screen views. In situations where it is not necessary to create two separate views, save it in `/src/views` and duplicate the content in `App.tsx` so that it gets rendered in all situations. 

###### Auth0 & Authentication

Refer to [ACM Development Authentication](https://github.com/acmutd/Auth-flow-template) for more information on using our authentication features. 

###### Connecting to backend

In progress
All communication with firebase should occur through the ACM Portal API. Refer to [ACM Portal Backend](https://github.com/acmutd/portal-backend) for more information on locally testing the backend. 


### How to Contribute

Join ACM Development

### Contributors

 - [Harsha Srikara](https://harshasrikara.com)
 - [David Richey](https://darichey.com)
 - [Aliah Shaira De Guzman]()
 - [Sivam Patel](https://github.com/sivampatel)
 - [Kendra Huang](https://github.com/kendra-huang)
 - [Jafar Ali](https://github.com/jafrilli)

### Questions

Sometimes you may have additional questions. If the answer was not found in this readme please feel free to reach out to the [Director of Development](mailto:development@acmutd.co) for _ACM_

We request that you be as detailed as possible in your questions, doubts, or concerns to ensure that we can be of maximum assistance. Thank you!

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)
