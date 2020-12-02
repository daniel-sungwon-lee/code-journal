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

function profile (profileData){

}

var $editProfile = document.querySelector(".edit-profile")
var $profile = document.querySelector(".profile")

function swap (view){
  if (view === "edit-profile"){
    $editProfile.className="edit-profile"
    $profile.className="profile hidden"

  } else if (view ==="profile"){
    $profile.className="profile"
    $editProfile.className="edit-profile hidden"
  }
}
