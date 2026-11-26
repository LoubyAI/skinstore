const products = {
  cleanser: { name: "Gentle Cleanser", action: "Cleanse" },
  serum: { name: "Hydrating Serum", action: "Apply serum" },
  lotion: { name: "Hydrating Lotion", action: "Moisturize" },
  cream: { name: "Daily Glow Cream", action: "Moisturize" },
};

const form = document.querySelector("#preferences");
const moisturizer = form.elements.namedItem("moisturizer");
const routineLength = form.elements.namedItem("length");
const list = document.querySelector("#routine-steps");
const template = document.querySelector("#routine-step");
const progress = document.querySelector("#routine-progress");
const progressStatus = document.querySelector("#routine-status");
const storageKey = "skins-routine-builder";

const saved = readRoutine();
if (typeof saved?.moisturizer === "string") moisturizer.value = saved.moisturizer;
if (typeof saved?.length === "string") routineLength.value = saved.length;

let completed = new Set(Array.isArray(saved?.completed) ? saved.completed : []);
renderRoutine();
document.querySelector("#builder").hidden = false;

form.addEventListener("change", updateRoutine);
document.querySelector("#reset-routine").addEventListener("click", () => {
  form.reset();
  completed.clear();
  updateRoutine();
});

list.addEventListener("change", (event) => {
  const checkbox = event.target;
  if (checkbox.checked) completed.add(checkbox.value);
  else completed.delete(checkbox.value);
  updateProgress();
  saveRoutine();
});

function readRoutine() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function saveRoutine() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      moisturizer: moisturizer.value,
      length: routineLength.value,
      completed: [...completed],
    }));
  } catch {
    // Keep the routine usable when browser storage is unavailable.
  }
}

function updateRoutine() {
  renderRoutine();
  saveRoutine();
}

function renderRoutine() {
  const steps = ["cleanser"];
  if (routineLength.value === "3") steps.push("serum");
  steps.push(moisturizer.value);

  completed = new Set(steps.filter((id) => completed.has(id)));
  list.replaceChildren(...steps.map(createStep));
  updateProgress();
}

function createStep(id, index) {
  const { name, action } = products[id];
  const step = template.content.cloneNode(true);
  step.querySelector(".step-image").src = `./assets/${id}.jpg`;
  step.querySelector(".step-position").textContent = `${index + 1}. ${action}`;
  step.querySelector(".step-name").textContent = name;

  const checkbox = step.querySelector(".step-check");
  checkbox.value = id;
  checkbox.checked = completed.has(id);
  return step;
}

function updateProgress() {
  progress.max = list.children.length;
  progress.value = completed.size;
  progressStatus.textContent = `${completed.size} of ${progress.max} steps complete`;
}
