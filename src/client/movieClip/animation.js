let clips = [];

let blocks = {
    ball_black: ["sprites/balls/black"],
    ball_blue: ["sprites/balls/blue", "sprites/balls/blue1", "sprites/balls/blue2", "sprites/balls/blue3", "sprites/balls/blue4", "sprites/balls/blue5", "sprites/balls/blue6"],
    ball_green: ["sprites/balls/green", "sprites/balls/green1", "sprites/balls/green2", "sprites/balls/green3", "sprites/balls/green4", "sprites/balls/green5", "sprites/balls/green6"],
    ball_lightblue: ["sprites/balls/lightblue", "sprites/balls/lightblue1", "sprites/balls/lightblue2", "sprites/balls/lightblue3", "sprites/balls/lightblue4", "sprites/balls/lightblue5", "sprites/balls/lightblue6"],
    ball_rainbow: ["sprites/balls/rainbow"],
    ball_red: ["sprites/balls/red", "sprites/balls/red1", "sprites/balls/red2", "sprites/balls/red3", "sprites/balls/red4", "sprites/balls/red5", "sprites/balls/red6"],
    ball_rose: ["sprites/balls/rose", "sprites/balls/rose1", "sprites/balls/rose2", "sprites/balls/rose3", "sprites/balls/rose4", "sprites/balls/rose5", "sprites/balls/rose6"],
    ball_yellow: ["sprites/balls/yellow", "sprites/balls/yellow1", "sprites/balls/yellow2", "sprites/balls/yellow3", "sprites/balls/yellow4", "sprites/balls/yellow5", "sprites/balls/yellow6"],
};

for (let color in blocks) {
    let textureArray = [];

    for (let i = 0; i < blocks.color.length(); i++) {
        let texture = PIXI.Texture.fromImage(blocks.color[i]);
        textureArray.push(texture);
    }

    clips[color] = new PIXI.AnimatedSprite(textureArray);
}
export default function getClipByName(name) {

    return clips.includes(name) ? clips['name'] : null;

}
