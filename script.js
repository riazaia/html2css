// The regular expressions used to find each type of future selector
const REGEX = {
  element: /<(\w*?)[ >]/g,
  class: /class="(.*?)"/g,
  id: /id="(.*?)"/g,
};

// A list of HTML elements that cannot be styled with CSS and therefore should not be included in the output
const EXCLUDED_TAGS = [
  "base",
  "head",
  "link",
  "meta",
  "style",
  "title",
  "canvas",
  "script",
  "noscript",
];

// Select the button on the page and add a listener for a click event
const btn = document.querySelector("#extractor");
btn.addEventListener("click", updateOutput);

function updateOutput() {
  const outputBox = document.querySelector("#output");
  const inputBox = document.querySelector("#input");
  const checkedOptions = document.querySelectorAll("input:checked");

  let options = [];

  checkedOptions.forEach((checkbox) => {
    options.push(checkbox.getAttribute("id"));
  });

  if (options.length === 0) {
    return alert("You must select an option!");
  }

  const foundSelectors = parseInput(inputBox.value, options);
  outputBox.value = "";
  outputBox.value = generateOutput(foundSelectors);
}

function parseInput(rawHtml, options) {
  const allSelectors = [];

  options.forEach((option) => {
    allSelectors.push(...extractSelectors(rawHtml, option));
  });
  const uniqueSelectors = [...new Set(allSelectors)];
  return uniqueSelectors;
}

function generateOutput(selectorsArr) {
  let stringOutput = "";
  selectorsArr.forEach((selector) => {
    stringOutput += `${selector} {  }
`;
  });
  return stringOutput;
}

function extractSelectors(input, type) {
  const matchedSelectors = [];
  const regex = REGEX[type];
  const allMatches = [...input.matchAll(regex)];

  allMatches.forEach(([, result]) => {
    const match = result.split(" ");
    if (match.length === 1) {
      matchedSelectors.push(
        ...match.map((keyword) => {
          return type === "class"
            ? `.${keyword}`
            : type === "id"
            ? `#${keyword}`
            : !EXCLUDED_TAGS.includes(keyword)
            ? `${keyword}`
            : "";
        })
      );
    } else {
    }
  });
  return matchedSelectors;
}
