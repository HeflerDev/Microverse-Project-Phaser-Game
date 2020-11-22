const hudModule = (() => {

    const Hud = (playerInfo, scene) => {

        const elements = {
            currentMoves: null,
            currentHp: null,

            gatherData() {
                return {
                    'movesLeftText': `Moves Left: ${ 2 - playerInfo.situation.moves }`,
                    'playerHpText': `HP:${playerInfo.situation.currentHp}`,
                }
            },

            create(coordX, coordY) {
                const movesAvaiable = scene.make.text({
                    x: coordX,
                    y: coordY,
                    text: this.gatherData().movesLeftText
                })
                    .setDepth(5)
                    .setOrigin(0, 0);

                const hpLeft = scene.make.text({
                    x: coordX + 400,
                    y: coordY,
                    text: this.gatherData().playerHpText
                })
                    .setDepth(5)
                    .setOrigin(0, 0);

                this.currentMoves = movesAvaiable;
                this.currentHp = hpLeft;
            },

            update() {
                this.currentMoves.text = this.gatherData().movesLeftText;
                this.currentHp.text = this.gatherData().playerHpText;
            },
        }
        return { elements }
    };
    return { Hud }
})();

export default hudModule
