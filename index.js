const cross = document.querySelector(".cross");
const entryField = document.querySelector("#entry-field");
const profileContainer = document.querySelector("[data-profile]");
const profileImage = document.querySelector("[profile-img]");
const profileName=document.querySelector(".name");
const createdDate = document.querySelector(".date");
const username =document.querySelector(".username")
const bio = document.querySelector(".info");
const repos =document.querySelector(".repo");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const locationPara=document.querySelector(".location-para");
const websiteLink = document.querySelector(".link-para");
const twitter = document.querySelector(".twitter-para")
const email = document.querySelector(".email-para");
const searchBtn=document.querySelector(".search-button");


entryField.addEventListener('input', (e) => {
    if(e.target.value){
        cross.classList.add("active");
    } else {
        cross.classList.remove("active"); 
        profileContainer.classList.remove("active");
    }
});

cross.addEventListener('click', ()=>{
    entryField.value = "";
    cross.classList.remove("active"); 
    profileContainer.classList.remove("active");
});

async function renderProfileInfo(data){
    console.log(data);
    profileImage.src = data.avatar_url;
    profileName.textContent = data.name;
    createdDate.textContent = new Date(data.created_at).toDateString();
    username.textContent = `@${data.login}`;
    bio.textContent = data.bio;
    const response = await fetch(data.repos_url);
    const data2 = await response.json();
    repos.textContent = data2.length;
    followers.textContent = data.followers;
    following.textContent = data.following;
    // locationPara.textContent = data?.location || "Not Available";
    setElement(locationPara, data.location);
    websiteLink.href = data?.blog || "Not Available";
    // websiteLink.textContent = data?.blog || "Not Available";
    setElement(websiteLink, data.blog);
    // twitter.textContent = data?.twitter_username || "Not Available";
    twitter.href = data?.twitter_username || "Not Available";
    // twitter.textContent = data.twitter_username || "Not Available";
    setElement(twitter, data.twitter_username);
    email.href = data?.email || "Not Available";
    // email.textContent = data.email || "Not Available";
    setElement(email,data.email);
}

function setElement(element, text){
    if(text){
        element.textContent = text;
        element.classList.add("blue-color");
    } else {
        element.textContent = "Not Available";
    }
}

async function fetchDetails(github){
    
    profileContainer.classList.add("active");
    try{
        const response = await fetch(
            `https://api.github.com/users/${github}`
        );
        const data = await response.json();
        renderProfileInfo(data);
    }
    catch(err){
        console.log("Error in fetching data...");
    }
    
}


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let githubID = entryField.value;
    
    if(githubID === "")
        return;
    else 
        fetchDetails(githubID);
});


