var $form = document.querySelector(".form-profile")
var $profileImage = document.querySelector(".profile-image")

var $avatarUrl=document.querySelector("#avatar-url")

$avatarUrl.addEventListener("blur", function(event){
  if (event.target.value===""){
    $profileImage.setAttribute("src","./images/placeholder-image-square.jpg")
  }
})

$form.addEventListener("input", function (event){
  if ((event.target===$form.elements.avatarUrl)&&($form.elements.avatarUrl.value!=="")){
    $profileImage.setAttribute("src",$form.elements.avatarUrl.value)
  }
})

$form.addEventListener("submit",function(event){
  if (event.target.matches(".form-profile")){
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
  }
})

var $profile = document.querySelector(".profile")
var $editProfile = document.querySelector(".edit-profile")

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

  var divRowLink = document.createElement("div")
  divRowLink.setAttribute("class","row-button")
  section.appendChild(divRowLink)

  var anchorEditProfile = document.createElement("a")
  anchorEditProfile.setAttribute("href","#")
  anchorEditProfile.setAttribute("data-view","edit-profile")
  anchorEditProfile.textContent="Edit"
  divRowLink.appendChild(anchorEditProfile)

  return section
}


var JSONdata = localStorage.getItem("data")
var userData = JSON.parse(JSONdata)


function swap (dataView){
  $dataViewDivs = document.querySelectorAll("div[data-view]")

  if (dataView === "edit-profile"){
    for (var i=0; i<$dataViewDivs.length;i++){
      if (dataView === $dataViewDivs[i].getAttribute("data-view")){
        $dataViewDivs[i].className=dataView
      }else{
        $dataViewDivs[i].className="hidden"
      }
    }
    data.view = dataView
    $form.elements.avatarUrl.value=data.profile.avatarUrl
    var userData = JSON.parse(localStorage.getItem("data"))
    if (userData!==null){
      $profileImage.setAttribute("src",data.profile.avatarUrl)
    }
    $form.elements.username.value=data.profile.username
    $form.elements.fullName.value=data.profile.fullName
    $form.elements.location.value=data.profile.location
    $form.elements.bio.value=data.profile.bio

  } else if (dataView ==="profile"){
    for (var i = 0; i < $dataViewDivs.length; i++) {
      if (dataView === $dataViewDivs[i].getAttribute("data-view")) {
        $dataViewDivs[i].className = dataView
      } else {
        $dataViewDivs[i].className = "hidden"
      }
    }
    data.view = dataView
    while($profile.firstChild){
      $profile.firstChild.remove()
    }
    $profile.appendChild(renderProfile(data.profile))
    document.querySelector("a[data-view='entries']").className="nav"
  } else if (dataView==="entries"){
    for (var i = 0; i < $dataViewDivs.length; i++) {
      if (dataView === $dataViewDivs[i].getAttribute("data-view")) {
        $dataViewDivs[i].className = dataView
      } else {
        $dataViewDivs[i].className = "hidden"
      }
    }
  } else if (dataView==="create-entry"){
    for (var i = 0; i < $dataViewDivs.length; i++) {
      if (dataView === $dataViewDivs[i].getAttribute("data-view")) {
        $dataViewDivs[i].className = dataView
      } else {
        $dataViewDivs[i].className = "hidden"
      }
    }
  }
}

var $olEntries = document.querySelector("#entries-list")

document.addEventListener("DOMContentLoaded", function(event){
  if (userData===null){
    swap("edit-profile")
    var $entiresNav = document.querySelector('a[data-view="entries"]')
    $entiresNav.className="hidden"
  }else {
    data=userData
    swap("entries")

    for (var i =0;i<userData.entries.length;i++){
      $olEntries.appendChild(renderEntry(userData.entries[i]))
    }
  }
})

document.addEventListener("click", function(event){
  var userData = JSON.parse(localStorage.getItem("data"))
  if (event.target ===document.querySelector("a[data-view='edit-profile']")){
    swap("edit-profile")
  }else if ((event.target===document.querySelector("a[data-view='profile']"))&&(userData!==null)){
    swap("profile")
  } else if (event.target===document.querySelector("a[data-view='entries']")){
    swap("entries")
  } else if (event.target===document.querySelector("a[data-view='create-entry']")){
    swap("create-entry")
    $formEntry.reset()
    $entryImage.setAttribute("src", "./images/placeholder-image-square.jpg")
  } else if (event.target.matches("a[data-view='delete-entry']")){
    var $overlay = document.querySelector(".overlay")
    $overlay.className="overlay"
    var clicked = event.target
    $overlay.addEventListener("click",function(event){
      if (event.target.matches("#yes")){
        clicked.closest(".entries-container").remove()
        $overlay.className="overlay hidden"
      } else if (event.target.matches("#no")){
        $overlay.className="overlay hidden"
      }
    })
  }
})

var $formEntry = document.querySelector(".form-entry")
var $entryImage = document.querySelector ("#entry-image")
var $imageUrl = document.querySelector("#image-url")

$imageUrl.addEventListener("blur",function(event){
  if (event.target.value===""){
    $entryImage.setAttribute("src","./images/placeholder-image-square.jpg")
  }
})

$formEntry.addEventListener("input",function(event){
  if (event.target===$formEntry.elements.imageUrl){
    $entryImage.setAttribute("src",$formEntry.elements.imageUrl.value)
  }
})

$formEntry.addEventListener("submit",function(event){
  if (event.target.matches(".form-entry")){
    event.preventDefault()
    entry.imageUrl=$formEntry.elements.imageUrl.value
    entry.title=$formEntry.elements.title.value
    entry.notes=$formEntry.elements.notes.value

    $olEntries.appendChild(renderEntry(entry))

    data.entries.push(entry)
    localStorage.setItem("data",JSON.stringify(data))

    $formEntry.reset()
    $entryImage.setAttribute("src","./images/placeholder-image-square.jpg")

    swap("entries")
  }
})

function renderEntry (entry){
  var $section= document.createElement("section")
  $section.setAttribute("class","entries-container")

  var $divRowHalf = document.createElement("div")
  $divRowHalf.setAttribute("class","row-half ent")
  $section.appendChild($divRowHalf)

  var $divImageFrame=document.createElement("div")
  $divImageFrame.setAttribute("class","image-frame")
  $divRowHalf.appendChild($divImageFrame)

  var $entryImg =document.createElement("img")
  $entryImg.setAttribute("src",entry.imageUrl)
  $entryImg.setAttribute("class","entry-image")
  $entryImg.setAttribute("alt","Entry Image")
  $divImageFrame.appendChild($entryImg)

  var $divTextInputs = document.createElement("div")
  $divTextInputs.setAttribute("class","text-inputs")
  $divRowHalf.appendChild($divTextInputs)

  var $divTextsEntry = document.createElement("div")
  $divTextsEntry.setAttribute("class","texts entry")
  $divTextInputs.appendChild($divTextsEntry)

  var $h2 = document.createElement("h2")
  $h2.textContent=entry.title
  $divTextsEntry.appendChild($h2)

  var $p = document.createElement("p")
  $p.setAttribute("class","notes")
  $p.textContent=entry.notes
  $divTextsEntry.appendChild($p)

  var $divRowButton = document.createElement("div")
  $divRowButton.setAttribute("class","row-button")
  $section.appendChild($divRowButton)

  var $deleteEntry = document.createElement("a")
  $deleteEntry.setAttribute("href","#")
  $deleteEntry.setAttribute("data-view","delete-entry")
  $deleteEntry.textContent="Delete"
  $divRowButton.appendChild($deleteEntry)

  return $section
}
