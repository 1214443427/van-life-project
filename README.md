# Van-Life App
## About
This is a multi-page web application built with React and React-Router to test my personal skill. Its core functionality is for campers to rent/host vans from/for other campers. It is intended to be used on a mobile device. However, it is also accessible on desktops. 
## Demo
[Click here to try](https://van-life-27.netlify.app/)
#### Main Page
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/assets/36424586/eb570328-0471-492c-85ad-f6d8313b32f6' 
    title = "about page" 
    height = "500px"/>
</picture>
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/assets/36424586/12cff03a-2a60-4735-acbc-6a15fd72ea3f' 
    title ="vans page"
    height = "500px"/>
</picture>
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/assets/36424586/e5461e85-86ec-4d2f-b19c-9014d54f7327'
    title = "detailed van page"    
    height = "500px"/>
</picture>

#### Protect Route (host page)         

<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/blob/master/src/assets/host-dashboard.png'
    title = "host dashboard page"    
    height = "500px"/>
</picture>
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/blob/master/src/assets/income.png'
    title = "host income page"    
    height = "500px"/>
</picture>
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/blob/master/src/assets/review-page.png'
    title = "host review page"    
    height = "500px"/>
</picture>

#### Nested Route     

<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/blob/master/src/assets/editable-detail-page.png'
    title = "host van page"    
    height = "500px"/>
</picture>
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/blob/master/src/assets/photoes.png'
    title = "host van page"    
    height = "500px"/>
</picture>
<picture>
  <img 
    src = 'https://github.com/1214443427/van-life-project/assets/36424586/aacb72ac-2c78-44a3-a3e6-a3b2251a1df3'
    title = "host van page"    
    height = "500px"/>
</picture>


#### The functionalities include: 
* user creation and login
* user authentication with firebase
* viewing public vans hosted by other campers
* data stored on firebase
* filtering by type and memorizing filters in state and URL
* protected routes only accessible for users with correct credentials
* editing details about vans hosted by the user
* sorting reviews/transactions by time

renting of van is not implemented. 

## Credit
This application is original from Scrimba's [React Router course](https://scrimba.com/learn/reactrouter6). The design of the website follows their [figma file](https://www.figma.com/file/igDA2NiMDhoaIIAqm5EnTq/%23VanLife?node-id=330%3A80&mode=dev). After I finished the course, I decided to re-build the app from scratch in order to test my skills. In addition to the basic functionalities cover by the course, I added authentications, editing, review filtering, photo gallery and a functional income graph. 
