// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let tableElement = document.getElementById("jBoard")

let categories = [];

 let example = [
   { title: "Math",
     clues: [
       {question: "2+2", answer: 4, showing: "answer", value:200},
       {question: "1+1", answer: 2, showing: "value", value:400}
     ],
   },
   { title: "Literature",
     clues: [
       {question: "Hamlet Author", answer: "Shakespeare", showing: "value"},
       {question: "Bell Jar Author", answer: "Plath", showing: "value"},
     ],
   },
 ]

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds() {
    return [11496,11498,11499,11544,11523]
}


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    try {
      const response = await axios.get('https://jservice.io/api/category?id=' + catId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  let trElement = document.createElement("tr")
  const categoryTitles = categories.map(category => category.title);
  console.log(categoryTitles)
  categoryTitles.forEach(title => {
    let thElement = document.createElement("th")
    thElement.innerHTML = title
    trElement.append(thElement)
  });
  tableElement.append(trElement);
  [200,400,600,800,1000].forEach((valuePoint) => {
    let trElement = document.createElement("tr")
    categories.forEach((category, row) => { 
      category.clues.forEach((clue, column) => {
        if (clue.value === valuePoint) {
          let tdElement = document.createElement("td")
          tdElement.innerText = clue.value;
          tdElement.setAttribute("id", `${row}-${column}`);
          trElement.append(tdElement)
        }
      });
    });
    tableElement.append(trElement);
  });
}
  
  

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  let categoryIds = getCategoryIds();
  for(let index = 0; index < categoryIds.length; index++) {
    let apiCategory = await getCategory(categoryIds[index])
    let tempCategory = {title: "", clues: []}
    tempCategory.title = apiCategory.title
    for(let clueIndex = 0; clueIndex < apiCategory.clues.length; clueIndex++) {
      let clue = {question: "", answer: "", value: "", showing: "value"}
      clue.question = apiCategory.clues[clueIndex].question
      clue.answer = apiCategory.clues[clueIndex].answer
      clue.value = apiCategory.clues[clueIndex].value
      tempCategory.clues.push(clue)
    }
    categories.push(tempCategory)
  }
  console.log(categories)
  fillTable()
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

setupAndStart()

// { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: "answer", value:200},
//        {question: "1+1", answer: 2, showing: "value", value:400}
//      ],
//    },

/* <tr>
        <th>Category 1</th>
        <th>Category 2</th>
        <th>Category 3</th>
        <th>Category 4</th>
        <th>Category 5</th>
      </tr> */

document.getElementById('jBoard').addEventListener('click', function(event) {
  const target = event.target;
  console.log(target.id);
  const row = target.id.split("-")[0];
  const column = target.id.split("-")[1];
  const clue = categories[row].clues[column];
  if (clue.showing === "value"){
    event.target.innerText = clue.question;
    categories[row].clues[column].showing = "question"
  }
  else if (clue.showing === "question"){
    event.target.innerText = clue.answer;
    categories[row].clues[column].showing = "answer"
  }
});