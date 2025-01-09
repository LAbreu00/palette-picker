export const showPalettes = (palette) => {
  Object.values(palette).forEach(addPaletteToList);
};

export const addPaletteToList = (palette) => {
  const paletteList = document.querySelector("ul#palette-list");
  const article = document.createElement("article");
  const h3 = document.createElement("h3");
  const colorDiv = document.createElement("div");
  const deleteButton = document.createElement("button");
  const footer = document.createElement("footer");

  article.dataset.uuid = palette.uuid;
  article.className = "cards";

  h3.textContent = palette.title;
  article.append(h3);

  colorDiv.className = "color-content";
  for (let i = 0; i < 3; i += 1) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const first = document.createElement("font");
    const second = document.createElement("font");
    const colorButton = document.createElement("button");

    div.className = "colors";

    first.textContent = "Text";
    first.color = "white";
    second.textContent = "Example";
    second.color = "black";

    p.append(first);
    p.append(second);

    p.style.backgroundColor = palette.colors[i];
    div.append(p);

    colorButton.className = "copy";
    colorButton.textContent = `copy ${palette.colors[i]}`;

    colorDiv.append(div);
    colorDiv.append(colorButton);
  }
  article.append(colorDiv);

  deleteButton.className = "delete";
  deleteButton.textContent = "Delete Palette";
  deleteButton.dataset.uuid = palette.uuid;
  article.append(deleteButton);

  if (palette.temperature === "neutral") {
    footer.textContent = "Neutral";
    footer.style.backgroundColor = "#969696";
  } else if (palette.temperature === "cool") {
    footer.textContent = "Cool";
    footer.style.backgroundColor = "#006EFF";
  } else if (palette.temperature === "warm") {
    footer.textContent = "Warm";
    footer.style.backgroundColor = "#F01000";
  }

  article.append(footer);

  paletteList.append(article);
};
