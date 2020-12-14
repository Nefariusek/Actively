const { getStatsOnLevelUp } = require('./getStatsOnLevelUp.js');

const gameOver = async (characterModel, character) => {
  if (character.level != 0) {
    levelPenalty = 2;

    const level = character.level;
    await characterModel.findByIdAndUpdate(character._id, { level: 0 });
    let newLevel = level - levelPenalty;
    newLevel < 1 ? (newLevel = 1) : {};
    const stats = getStatsOnLevelUp(character, newLevel);
    const exp = getStatsOnLevelUp(character, newLevel - 1)[1] + 1;
    await characterModel.findByIdAndUpdate(character._id, {
      level: newLevel,
      exp_points: exp,
      health: stats[0],
      maxHealth: stats[0],
      expRequired: stats[1],
      physical_power: stats[2],
      magical_power: stats[3],
    });

    console.log('gameOver');
  }
};

exports.gameOver = gameOver;
