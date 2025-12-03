# Second Solo Project : “FOODIE”  
## Subject - 제목  
This solo project is called FOODIE in reference to the english slang “foodie”. 
A “foodie” describes a person who loves eating, discovering new tastes and new places. 
The idea behind this project was to be less generic than Instagram or Facebook by creating a space for people who enjoys sharing their new findings and who are also looking for unique and new places to eat. 
The site includes 5 main pages :
+ Feed
+ Messages
+ Feed
+ My Profile
+ Saved Posts

## Technologies - 기술
**Front-End**
+ React
+ MUI library

**Back-End**
+ Node.js
+ Express

+ ## Time Period - 기간
2025.11.25 ~ 2025.12.02 (6 days)

## Main functions - 주요 기능
### 1. Login / Sign Up
> Secured signing up process : scrypted password in database;
> Duplicates & password requirements check as the user enters their username, email and password;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/login.png" width="500">
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/signup.png" width="500">

### 2. Write a post
> Easy and direct acces to writing and publishing a post ( top of feed page);
> Hashtags function;
> Price rating function;
> Multiple images upload function;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/feed.png" width="500">
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/post.png" width="500">

### 3. My Profile
> Default profile picture when first signing up and logging in;
> Profile personal information edit function : email duplicate check, name and user's introduction's edit;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/profile1.png" width="500">
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/profile2.png" width="500">
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/p.png" width="500">

### 4. Posts Edit & Delete
> On their "My Profile" page, the user can find all the posts and can either edit or delete them;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/edit1.png" width="500">
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/edit2.png" width="500">

### 5. Friends List & Follow Function 
> List of user's followers and friends followed by user;
> Clicking on a friend's name redirect to their profile;
> Follow function : user can click the button "follow" on a user's profile or on their posts;
> Follow notification function : notification alert in the menu + alert message on "friends" page;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/friends1.png" width="500">
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/userprofile.png" width="500">

### 6. Comments
> User can delete their comments of their are the author;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/comments.png" width="500">

### 7. Feed : Search Bar & Like/Save Buttons
> Search bar function : display only posts for a specific keyword entered by the user;
> Like function : toggle button, display of number of likes;
> save function : the user can save a post and find them back on the "saved posts" page;
<img src="https://raw.githubusercontent.com/aline-rousselinsiv/react-sns-project/main/screenshots/feed2.png" width="500">

## Resources - 자료
+ Fonts from Google Fonts
+ Icons from Lucide Icons
+ MUI Library
+ date-fns

## After Project - 프로젝트 후기
+ It took some time to learn and get used to the syntax and logic of React. At first, I found it rather complex to juggle between all the components and now realize the importance of well structuring the website’s skeleton before jumping into the actual building.
+ Functions I would like to add :
  + Comments : timestamp, like function;
  + Address : API when entering restaurant’s addresses;
  + Map : displaying a map when the user clicks on a post’s address;
  + Messages : chat function;
  + Friends : recommended friends;
  + Feed : recommended posts;
