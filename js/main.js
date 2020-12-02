var $form = document.querySelector("form")
var $profileImage = document.querySelector(".profile-image")

$form.addEventListener("input", function (event){
  if (event.target===$form.elements.avatarUrl){
    $profileImage.setAttribute("src",$form.elements.avatarUrl.value)
  }
})

$form.addEventListener("submit",function(event){
  event.preventDefault()
  data.profile.avatarUrl=$form.elements.avatarUrl.value
  data.profile.username=$form.elements.username.value
  data.profile.fullName=$form.elements.fullName.value
  data.profile.location=$form.elements.location.value
  data.profile.bio=$form.elements.bio.value
  var dataJSON = JSON.stringify(data)
  localStorage.setItem("data", dataJSON)
  $form.reset()
  $profileImage.setAttribute("src","./images/placeholder-image-square.jpg")
})

var $profile = document.querySelector(".profile")
var $editProfile = document.querySelector(".edit-profile")

function profile (profileObject){
  $profile.querySelector(".fullName").textContent=profileObject.fullName
  $profile.querySelector(".username").innerText=profileObject.username
  $profile.querySelector(".location").innerText=profileObject.location
  $profile.querySelector(".bio").textContent=profileObject.bio
}

function swap (dataView){
  if (dataView === "edit-profile"){
    $editProfile.className="edit-profile"
    $profile.className="profile hidden"
    data.view = dataView

  } else if (dataView ==="profile"){
    $profile.className="profile"
    $editProfile.className="edit-profile hidden"
    data.view = dataView

  }
}
