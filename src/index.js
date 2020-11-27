
import Phaser from 'phaser';

import Menu from './scenes/menu';
import Village from './scenes/village';
import Instructions from './scenes/instructions';
import VillageStage from './scenes/villageStage';
import CaveStage from './scenes/caveStage';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 512,
  parent: 'phaser-container',
  backgroundColor: 'rgb(80,20,50)',
  parent: 'phaser-container',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Menu, Instructions, CaveStage],
};

export default new Phaser.Game(config);
