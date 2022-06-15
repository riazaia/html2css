// const HTML_REGEXP = /<(.*?)>/g;
const TAG_REGEXP = /<(\w*?)[ >]/g;
const CLASS_REGEXP = /class="(.*?)"/g;
const ID_REGEXP = /id="(.*?)"/g;

const EXCLUDED_TAGS = ["base", "head", "link", "meta", "style", "title", "canvas", "script", "noscript"];

let btn = document.querySelector("#extractor");
btn.addEventListener("click", update)

function parse(rawHtml, options) {
  const result = [];
  let stringOutput = "";
  
  function extract(regex, o) {
    [...rawHtml.matchAll(regex)].forEach(([, match]) => {
      if (o?.class === true) match = `.${match}`;
      if (o?.id === true) match = `#${match}`;
      if (!EXCLUDED_TAGS.includes(match) && !result.includes(match)) {
        result.push(match);
      }
    });
  }

  if (options.includes("tags")) extract(TAG_REGEXP);
  if (options.includes("classes")) extract(CLASS_REGEXP, { class: true });
  if (options.includes("ids")) extract(ID_REGEXP, { id: true });

  result.forEach((elem) => {
    stringOutput += `${elem} {

  }
`;
  });
  return stringOutput;
}

function update() {
  let outputBox = document.querySelector("#output");
  let inputBox = document.querySelector("#input");

  let options = [];
  Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).forEach((item) => {
    options = [...options, item.getAttribute("id")];
  });

  if (options.length === 0) return alert("You must select an option!");
  outputBox.value = "";
  outputBox.value = parse(inputBox.value, options);
}
