const models = require('./models');
const extensions = require('./extensions');

const hasProperty = (x, y) => Object.prototype.hasOwnProperty.call(x, y);
const hasFunction = (x, y) => hasProperty(x, y) && x[y] instanceof Function;
const applyToModel = (model, property, extension) => {
  if (!hasFunction(extension, property)) return;
  extension[property](model[property]);
};

const extend = (name, model) => {
  if (!hasProperty(extensions, name)) {
    console.log(`[MongoDB] Extensions not found for ${name}`);
    return model;
  }
  for (let property in extensions.ExtensionBase) {
    applyToModel(model, property, extension);
  }
  return model;
};

const load = (db) => {
  const compiledModels = {};

  for (let name in models) {
    const extendModel = extend(name, models[name]);
    console.log('SZPAK', name);
    console.log('SZPAK', 'stst');
    compiledModels[name] = db.model(name, extendModel);
    console.log('SZPAK', 'tuatj');
  }

  console.log('[MongoDB] Extensions and models compiled');
  return compiledModels;
};

module.exports = load;
