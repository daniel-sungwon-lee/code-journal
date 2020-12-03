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
  swap("profile")
})

var $profile = document.querySelector(".profile")
var $editProfile = document.querySelector(".edit-profile")
var $section = document.querySelector("section")

function renderProfile (profile){
  var section = document.createElement("section")
  var h1 = document.createElement("h1")
  h1.textContent=profile.fullName
  section.appendChild(h1)
  var div = document.createElement("div")
  div.setAttribute("class","row-half")
  section.appendChild(div)
  var div2 = document.createElement("div")
  div2.setAttribute("class","image-frame")
  div.appendChild(div2)
  var img = document.createElement("img")
  img.setAttribute("src",profile.avatarUrl)
  img.setAttribute("class","profile-image")
  img.setAttribute("alt","Avatar Image")
  div2.appendChild(img)
  var div3 = document.createElement("div")
  div3.setAttribute("class","text-inputs")
  div.appendChild(div3)
  var div4 = document.createElement("div")
  div4.setAttribute("class","texts")
  div3.appendChild(div4)
  var div5 = document.createElement("div")
  div5.setAttribute("class","text-with-icons")
  div4.appendChild(div5)
  var i = document.createElement("i")
  i.setAttribute("class","fas fa-user-circle icon")
  div5.appendChild(i)
  var p = document.createElement("p")
  p.textContent=profile.username
  div5.appendChild(p)
  var div6 = document.createElement("div")
  div6.setAttribute("class","text-with-icons")
  div4.appendChild(div6)
  var i2 = document.createElement("i")
  i2.setAttribute("class","fas fa-compass icon")
  div6.appendChild(i2)
  var p2 = document.createElement("p")
  p2.textContent=profile.location
  div6.appendChild(p2)
  var p3 = document.createElement("p")
  p3.setAttribute("class","bio")
  p3.textContent=profile.bio
  div4.appendChild(p3)
  return section
}

function swap (dataView){
  if (dataView === "edit-profile"){
    $editProfile.className="edit-profile"
    $profile.className="hidden"
    data.view = dataView
    $form.elements.avatarUrl.value=userData.profile.avatarUrl
    $profileImage.setAttribute("src",userData.profile.avatarUrl)
    $form.elements.username.value=userData.profile.username
    $form.elements.fullName.value=userData.profile.fullName
    $form.elements.location.value=userData.profile.location
    $form.elements.bio.value=userData.profile.bio

  } else if (dataView ==="profile"){
    $profile.className="profile"
    $editProfile.className="hidden"
    data.view = dataView
    $profile.appendChild(renderProfile(data.profile))
  }
}

var JSONdata = localStorage.getItem("data")
var userData = JSON.parse(JSONdata)

document.addEventListener("DOMContentLoaded", function(event){
  if (userData===null){
    swap("edit-profile")
  }else {
    data=userData
    swap("profile")
  }
})
