"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.log("LoginTest");
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Submit Story */

function navSubmitStory(evt) {
  console.log("StoryTest");
  console.debug("navSubmitStory", evt);
  hidePageComponents();
  $storyForm.show();
}

/** View Favs */

$navFave.on("click", navViewFave);

function navViewFave(evt) {
  console.log("ViewFave");
  console.debug("navViewFave", evt);
  hidePageComponents();
  putFavesOnPage();
}

$navStory.on("click", navSubmitStory);

/** View Mine */

$navMine.on("click", navMyList);

function navMyList(evt) {
  console.log("MyList");
  console.debug("navMyList", evt);
  hidePageComponents();
  putMineOnPage();
}