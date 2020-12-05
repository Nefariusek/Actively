const defaultQuests = [
  {
    name: 'Runmageddon',
    description: 'Run for 30 minutes.',
    type: 'Activity',
    duration: 24,
    experience_reward: 300,
    gold_reward: 200,
    penalty: 100,
  },
  {
    name: 'Strengthen Things',
    description: 'Do 10 push-ups',
    type: 'Activity',
    duration: 12,
    experience_reward: 100,
    gold_reward: 50,
    penalty: 100,
  },
  {
    name: 'Sweet Dreams',
    description: 'Cut down on sweets.',
    type: 'Lifestyle',
    duration: 168,
    experience_reward: 1500,
    gold_reward: 1200,
    penalty: 200,
  },
];

module.exports = defaultQuests;
