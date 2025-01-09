import "./style.css";
import {
  getPalettes,
  addPalette,
  initializePalettesIfEmpty,
  deletePaletteById,
} from "./local-storage.js";
import { showPalettes, addPaletteToList } from "./dom-helpers.js";

const handlePaletteFormSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(event.target);
  const formData = Object.fromEntries(data);
  console.log(formData);

  const newPalette = {
    uuid: crypto.randomUUID(),
    title: formData.paletteTitle,
    colors: [formData.color1, formData.color2, formData.color3],
    temperature: formData.temperature,
  };

  addPalette(newPalette);

  addPaletteToList(newPalette);

  console.log(event);

  form.reset();
};

const handleDeletePalette = (event) => {
  if (!event.target.matches("button.delete")) return;

  event.target.closest("article").remove();

  const uuid = event.target.dataset.uuid;
  deletePaletteById(uuid);

  console.log(event);
};

const handleCopy = (event) => {
  if (!event.target.matches("button.copy")) return;
  if (!navigator.clipboard) return;

  const copyButton = event.target.closest("button.copy").innerText;
  navigator.clipboard.writeText(copyButton.slice(4));

  event.target.textContent = "Copied hex!";

  setTimeout(() => {
    event.target.textContent = copyButton;
  }, 1000);
};

const main = () => {
  initializePalettesIfEmpty();
  showPalettes(getPalettes());
  document
    .querySelector("form#palette-form")
    .addEventListener("submit", handlePaletteFormSubmit);
  document
    .querySelector("ul#palette-list")
    .addEventListener("click", handleDeletePalette);
  document
    .querySelector("ul#palette-list")
    .addEventListener("click", handleCopy);
};

main();
