import Phaser from 'phaser';

import playerModule from '../modules/playerModule';
import foesModule from '../modules/foesModule';
import stagesModule from '../modules/stagesModule';
import parseLayer from '../modules/parseLayer';

export default class VillageStage extends Phaser.Scene {
  constructor() {
    super('villagestage');

    this.player = playerModule.Player('Johnny', this);
    this.playerBody = null;
    this.stage = stagesModule.Stage(this).village;
    this.map = null;

    this.bat = foesModule.Foe('bat', this).bat;
    this.enemies = [];

      this.isColliding = false;
      this.currentFoe = null;
  }

  preload() {
    this.bat.animations.loadSprites();
    this.player.animations.loadSprites();
    this.stage.load();
  }

  create() {
    this.map = this.stage.build();

    this.playerBody = this.player.body.createPlayer();
    this.player.animations.createSprites();

    this.bat.animations.createSprites();
    this.enemies.push(this.bat.body.createBody(200, 200));
    this.enemies.push(this.bat.body.createBody(300, 300));
    this.enemies.push(this.bat.body.createBody(400, 400));

    this.enemies.map((enemy) => {
      this.bat.animations.animate(enemy.body);
        this.physics.add.collider(enemy.body, this.playerBody, () => {
            this.isColliding = true;
            this.currentFoe = enemy;
        });

    });
  }

  update() {
    this.player.controls.movePlayer(this.playerBody, this.map.layer, () => {
      if (this.swapTurns()) {
        this.enemies.forEach((enemy) => {
          while (this.foeTurn(enemy)) {
            const result = this.bat.behavior.react(parseLayer.positioning(
              this.playerBody,
              enemy.body,
              this.map.layer,
            ));
            const [resultX, resultY] = result;
            enemy.body.x += resultX;
            if (!parseLayer.isBlocked(enemy.body, this.map.layer).bellow) {
              enemy.body.y += resultY;
            }
          }
        });
      }
    }, () => {
        if (this.isColliding) {
            if (this.player.information.situation.moves < this.player.information.stats.dex) {
                this.currentFoe.data.currentHp -= 1;
                this.player.information.situation.moves += 1;
            } else {
                console.log('Turn End')
            }
        } else {

        };
    });
      if (this.currentFoe) {
        if (this.currentFoe.data.currentHp <= 0) {
            this.currentFoe.body.destroy();
        }
      }
      this.isColliding = false;
      this.currentFoe = null;

  }

  swapTurns() {
    const info = this.player.information;
    if (info.situation.moves < info.stats.dex) {
      this.player.information.situation.moves += 1;
      return false;
    }
    this.player.information.situation.moves = 0;
    return true;
  }

  foeTurn(foe) {
    if (foe.data.moves < foe.data.stats.dex) {
      foe.data.moves += 1;
      return true;
    }
    foe.data.moves = 0;
    return false;
  }
}
