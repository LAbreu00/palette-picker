import startingPalettes from "./starting-palettes.json";

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setPalettes = (newPalettes) => {
  setLocalStorageKey("palettes", newPalettes);
};

export const getPalettes = () => {
  const storedPalettes = getLocalStorageKey("palettes");
  return storedPalettes || {};
};

export const initializePalettesIfEmpty = () => {
  const storedPalettes = getPalettes();
  if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
    setPalettes(startingPalettes);
  }
};

export const addPalette = (newPalette) => {
  const storedPalettes = getPalettes();

  storedPalettes[newPalette.uuid] = newPalette;

  setPalettes(storedPalettes);

  return newPalette;
};

export const deletePaletteById = (uuid) => {
  const storedPalettes = getPalettes();
  delete storedPalettes[uuid];
  setPalettes(storedPalettes);
};
