import BatSprite from '../assets/characters/bat.png';
import create from '../storage/create';

const foesModule = (() => {
  const Foe = (id, scene) => {
    const bat = {

      information: create.newAnimalData(id),

      animations: {
        loadSprites() {
            scene.load.spritesheet(id, BatSprite, { frameWidth: 32, frameHeight: 32 })
        },
        animate(body) {
          body.anims.play('batIdle');
        },
        createSprites() {
          scene.anims.create({
            key: 'batIdle',
            frames: scene.anims.generateFrameNumbers(id, { start: 0, end: 4 }),
            framerate: 0.5,
            repeat: -1,
          });
        },
      },

      body: {
        createBody() {
          const foeBody = scene.physics.add.sprite(336, 336, id);
          return foeBody;
        },
      },

      behavior: {
        react(difference) {
          const result = [];
          if (difference.verifyX > 0) {
            result.push(+16);
          } else if (difference.verifyX < 0) {
            result.push(-16);
          } else {
            result.push(0);
          }

          if (difference.verifyY > 0) {
            result.push(+16);
          } else if (difference.verifyY < 0) {
            result.push(-16);
          } else {
            result.push(0);
          }

          return result;
        },
        makeMove(foeBody, moveX, moveY) {
            foeBody.x += moveX;
            foeBody.y += moveY;
        }
      },

    };
    return {
      bat,
    };
  };
  return { Foe };
})();

export default foesModule;
