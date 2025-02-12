// =============================================================================
// ABMZ_OtherFolderPictures.js
// Version: 1.00
// -----------------------------------------------------------------------------
// Copyright (c) 2025 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @plugindesc v1,00 Picturesフォルダ以外の画像も表示できるようにします。
 * @author ヱビ
 * @target MZ
 * 
 * @help
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 * 
 * 他のフォルダの画像表示
 * 戦闘背景画像1表示
 * 戦闘背景画像2表示
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.00
 * 公開
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・改変可
 *     ただし、ソースコードのヘッダのライセンス表示は残してください。
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * 
 * @command ShowOtherFolderPicture
 * @text 他のフォルダの画像表示
 * @desc pictures以外のフォルダの画像をピクチャとして表示する
 * 
 * @arg picId
 * @text ピクチャ番号
 * @desc ピクチャIDです。（1~100）
 * @type number
 * @decimals 0
 * @min 1
 * @max 100
 * @default 4
 * 
 * @arg pictureName
 * @text 画像ファイル
 * @desc 画像ファイルです。
 * @type file
 * @dir img
 * 
 * 
 * 
 * @arg anchor
 * @text 原点
 * @desc ピクチャの原点を0なら左上、1なら中央にします。
 * @type select
 * @default 0
 * @option 左上
 * @value 0
 * @option 中央
 * @value 1
 * 
 * @arg x
 * @text X座標
 * @desc ピクチャを表示するX座標です。
 * @type number
 * @decimals 0
 * @default 0
 * 
 * 
 * @arg y
 * @text Y座標
 * @desc ピクチャを表示するY座標です。
 * @type number
 * @decimals 0
 * @default 0
 * 
 * @arg hue
 * @text 色相
 * @desc ピクチャの色相です。
 * @type number
 * @decimals 0
 * @min 0
 * @max 360
 * @default 0
 * 
 * @arg scaleX
 * @text X倍率
 * @desc 幅の倍率（％）です。例：100：1倍
 * @type number
 * @decimals 0
 * @default 100
 * 
 * @arg scaleY
 * @text Y倍率
 * @desc 高さの倍率（％）です。例：100：1倍
 * @type number
 * @decimals 0
 * @default 100
 * 
 * 
 * @arg opacity
 * @text 不透明度
 * @desc 0～255の間の値で入力します。数字が大きいほど濃く、小さいほど薄くなります。
 * @type number
 * @decimals 3
 * @default 255
 * @min 0
 * @max 255
 * 
 * 
 * 
 * @arg blend
 * @text 合成方法
 * @desc ピクチャをゲーム画面と合成する方法です。
 * 　0で通常、1で加算、2で乗算、3でスクリーンです。
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * @default 0
 * 
 * 
 * 
 * @command ShowThisBattleBack1
 * @text 戦闘背景画像1表示
 * @desc battlebacks1のフォルダ内の、現在のマップの戦闘背景をピクチャとして表示します。
 * 
 * @arg picId
 * @text ピクチャ番号
 * @desc ピクチャのＩＤです。
 * @type number
 * @decimals 0
 * @min 1
 * @max 100
 * @default 1
 * 
 * 
 * 
 * @arg hue
 * @text 色相
 * @desc ピクチャの色相です。
 * @type number
 * @decimals 0
 * @min 0
 * @max 360
 * @default 0
 * 
 * 
 * 
 * @command ShowThisBattleBack2
 * @text 戦闘背景画像2表示
 * @desc battlebacks2のフォルダ内の、現在のマップの戦闘背景をピクチャとして表示します。
 * 
 * @arg picId
 * @text ピクチャ番号
 * @desc ピクチャのＩＤです。
 * @type number
 * @decimals 0
 * @min 1
 * @max 100
 * @default 2
 * 
 * 
 * 
 * @arg hue
 * @text 色相
 * @desc ピクチャの色相です。
 * @type number
 * @decimals 0
 * @min 0
 * @max 360
 * @default 0
 * 
 * 
 * 
 * 
 */

(function() {

	var parameters = PluginManager.parameters('ABMZ_OtherFolderPictures');

//=============================================================================
// PluginManager
//=============================================================================


    const pluginName = "ABMZ_OtherFolderPictures";
	
    PluginManager.registerCommand(pluginName, "ShowOtherFolderPicture", args => {
			let picId = args.picId;
			let pictureName = args.pictureName;
			let scaleX = args.scaleX;
			let scaleY = args.scaleY;
			let anchor = Number(args.anchor) || 0;
			let x = args.x === undefined ? 0 : eval(args.x);
			let y = args.y === undefined ? 0 : eval(args.y);
			let opacity = args.opacity === undefined ? 255 : Number(args.opacity);
			let blend = args.blend === undefined ? 0:args.blend;
			
			return $gameScreen.showPicture(picId,pictureName,anchor,x,y,scaleX,scaleY,opacity, blend);
    });

	
    PluginManager.registerCommand(pluginName, "ShowThisBattleBack1", args => {
			let folderName = "battlebacks1";
			let pictureName = ""
		    if (BattleManager.isBattleTest()) {
		        pictureName = $dataSystem.battleback1Name;
		    } else if ($gameMap.battleback1Name()) {
		        pictureName =  $gameMap.battleback1Name();
		   	} else {
				return;
			}
		    
			let picId = args.picId;
			let fileName = folderName + "/" + pictureName;
			let scaleX = 100;
			let scaleY = 100;
			let anchor = 0;
			let x = -25;
			let y = -25;
			let opacity = 255;
			let blend = 0;
			
			return $gameScreen.showPicture(picId,fileName,anchor,x,y,scaleX,scaleY,opacity, blend);
    });

	
    PluginManager.registerCommand(pluginName, "ShowThisBattleBack2", args => {
			let folderName = "battlebacks2";
			let pictureName = ""
		    if (BattleManager.isBattleTest()) {
		        pictureName = $dataSystem.battleback2Name;
		    } else if ($gameMap.battleback1Name()) {
		        pictureName =  $gameMap.battleback2Name();
		   	} else {
				return;
			}
		    
			let picId = args.picId;
			let fileName = folderName + "/" + pictureName;
			let scaleX = 100;
			let scaleY = 100;
			let anchor = 0;
			let x = -25;
			let y = -25;
			let opacity = 255;
			let blend = 0;
			
			return $gameScreen.showPicture(picId,fileName,anchor,x,y,scaleX,scaleY,opacity, blend);
    });




//=============================================================================
// Sprite_Picture
//=============================================================================

Sprite_Picture.prototype.battleback2Name = function() {
    if (BattleManager.isBattleTest()) {
        return $dataSystem.battleback2Name;
    } else if ($gameMap.battleback2Name()) {
        return $gameMap.battleback2Name();
    } else {
        return '';
    }
};
Sprite_Picture.prototype.battleback1Name = function() {
    if (BattleManager.isBattleTest()) {
        return $dataSystem.battleback1Name;
    } else if ($gameMap.battleback1Name()) {
        return $gameMap.battleback1Name();
    } else {
        return '';
    }
};

//=============================================================================
// ImageManager
//=============================================================================


		// ImageManager.loadPictureに入れる
	let ImageManager_loadPicture = ImageManager.loadPicture;
	ImageManager.loadPicture = function(filename) {
		//this.bitmap = ImageManager.loadPicture(this._pictureName);
		if (!filename.match("/")) {
			return ImageManager_loadPicture.call(this,filename);
		}
		return this.loadPictureFromOtherFolder(filename);
	}
	ImageManager.loadPictureFromOtherFolder = function(filename) {
		if (!filename.match("/")) {
			return ImageManager_loadPicture.call(this, filename);
		}
		let folderName = filename.split("/")[0];
		let pictureName = filename.split("/")[1];
		
		switch (folderName) {
		case "":
			return;
		case "battlebacks1":
			return ImageManager.loadBattleback1(pictureName);
		case "battlebacks2":
			return ImageManager.loadBattleback2(pictureName);
		case "enemies":
			return ImageManager.loadEnemy(pictureName);
		case "characters":
			return ImageManager.loadCharacter(pictureName);
		case "faces":
			return ImageManager.loadFace(pictureName);
		case "parallaxes":
			return ImageManager.loadParallax(pictureName);
		case "pictures":
			return ImageManager.loadPicture(pictureName);
		case "sv_actors":
			return ImageManager.loadSvActor(pictureName);
		case "sv_enemies":
			return ImageManager.loadSvEnemy(pictureName);
		case "filename":
			return ImageManager.loadSystem(pictureName);
		case "tilesets":
			return ImageManager.loadTileset(pictureName);
		case "titles1":
			return ImageManager.loadTitle1(pictureName);
		case "titles2":
			return ImageManager.loadTitle2(pictureName);
		}
		
	};

	// 未使用
	ImageManager.imgFolderName = function(pictureName) {
		if (pictureName.match(/battlebacks1/)) {
			return "battlebacks1";
		}
		if (pictureName.match(/battlebacks2/)) {
			return "battlebacks2";
		}
		if (pictureName.match(/characters/)) {
			return "characters";
		}
		if (pictureName.match(/enemies/)) {
			return "enemies";
		}
		if (pictureName.match(/faces/)) {
			return "faces";
		}
		if (pictureName.match(/pictures/)) {
			return "pictures";
		}
		if (pictureName.match(/parallaxes/)) {
			return "parallaxes";
		}
		if (pictureName.match(/sv_actors/)) {
			return "sv_actors";
		}
		if (pictureName.match(/sv_enemies/)) {
			return "sv_enemies";
		}
		if (pictureName.match(/system/)) {
			return "system";
		}
		if (pictureName.match(/tilesets/)) {
			return "tilesets";
		}
		if (pictureName.match(/titles1/)) {
			return "titles1";
		}
		if (pictureName.match(/titles2/)) {
			return "titles2";
		}
		return "";
	};
})();