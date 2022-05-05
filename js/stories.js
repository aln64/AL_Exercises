"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  console.log("story")
  console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  if (currentUser.favorites.findIndex(favStory => favStory.storyId === story.storyId) >= 0) {
    return $(`
      <li class="myFaveStory" id="${story.storyId}">
      <img width=15 height=15 src='https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-star-vector-icon-png-image_696411.jpg' />
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
  }
  else {
    return $(`
    <li class="myFaveStory" id="${story.storyId}">
    <img width=15 height=15 src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/640px-Empty_Star.svg.png' />
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
  } 
}

function generateOwnStory(story) {
   /** My List. */
   //if (currentUser.ownStories.findIndex(myStory => myStory.storyId === story.storyId) >= 0) {
    return $(`
      <li class="myStory" id="${story.storyId}">
      <img width=15 height=15 src='https://toppng.com/uploads/preview/big-trash-can-vector-trash-can-icon-1156305906701r6eta2fm.png' />
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
  //}
  /** My List. */

}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Handle story form submission.*/

async function submitStoryEvent(evt) {
  console.debug("submit", evt);
  evt.preventDefault();

  // grab the title
  const storyTitle = $("#story-title").val();
  console.log(storyTitle);

  // grab the author
  const storyAuthor = $("#story-author").val();
  console.log(storyAuthor);

  // grab the url
  const storyURL = $("#story-url").val();
  console.log(storyURL);

  let newStory = await storyList.addStory(currentUser,
    { title: storyTitle, author: storyAuthor, url: storyURL });

  console.log("new", newStory.story);

  currentUser.ownStories = [...currentUser.ownStories, new Story(newStory.story)];
}

async function submitFavoriteEvent(evt) {

  const element = evt.target;

  console.log(element.parentElement);

  newStorySubmit = await storyUrl.submit(url);

   $storyForm.trigger("reset");

   saveUserCredentialsInLocalStorage();
   updateUIOnUserLogin();
}

$storyForm.on("submit", submitStoryEvent);

function putFavesOnPage() {
  console.debug("putFavesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putMineOnPage() {
  console.debug("putMineOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateOwnStory(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
