// 覚醒回数に応じた掛値
var correction = [
	[10.0, 7.5, 5.5, 4.0, 3.6],
	[4.3, 4.0, 3.2, 2.6, 2.0],
	[2.8, 2.4, 2.1, 1.75, 1.5],
	[2.0, 1.8, 1.6, 1.4, 1.2]
];
// 君と語る午後 各ステージ体力
var stage = [
	5900, 6633, 7367, 8100, 14575, 
	22288, 30000, 34000, 40000, 52000, 
	67600, 87880, 114244, 145203, 172653,
	200102, 225000, 255000, 300000, 247267, 
	365545, 384784, 405036, 426353, 448793, 
	472414, 497278, 523450, 551000, 580000, 
	600000, 646774, 695456, 747802, 804088, 
	864611, 929690, 999666, 1052280, 1107663, 
	1165961, 1227328, 1291924, 1359920, 1431495, 
	1506837, 1586144, 1669625, 1757500, 1850000, 
	2016798, 2122945, 2234679, 2352294, 2476099, 
	2606420, 2743600, 2888000, 3040000, 3200000
];
var teamList = ['first', 'second', 'third'];
var notBDCount = [0, 0, 0];

function changeEventVer(){
	var eventVer = document.getElementById('eventVer');
	if(eventVer.value == 0 || eventVer.value == 1){
		// 君に染む道, 君に贈る宴
		stage = [
			5900, 6633, 7367, 8100, 14419,
			20738, 27056, 33375, 37825, 44500,
			46725, 68989, 91232, 114277, 136333,
			158388, 180444, 202500, 229500, 270000,
			283500, 309429, 335357, 361286, 387214,
			413143, 439071, 465000, 539000, 613000,
			910000, 955500, 1096250, 1237000, 1377750,
			1518500, 1659250, 1800000, 2040000, 2400000,
			2520000, 2655000, 2790000, 2925000, 3060000,
			3195000, 3330000, 3465000, 4050000, 4500000
		];
	} else if(eventVer.value == 2 || eventVer.value == 3){
		// 君と辿る刻, 君に咲く花
		// TODO データ不備
		stage = [
			5900, 6633, 7367, 8100, 14419,
			20738, 27056, 33375, 37825, 44500,
			46725, 68989, 91232, 114277, 136333,
			158388, 180444, 202500, 229500, 270000,
			283500, 309429, 335357, 361286, 387214,
			413143, 439071, 465000, 539000, 613000,
			910000, 955500, 1096250, 1237000, 1377750,
			1518500, 1659250, 1800000, 2040000, 2400000,
			2520000, 2655000, 2790000, 2925000, 3060000,
			3195000, 3330000, 3465000, 4050000, 4500000
		];
	} else if(eventVer.value == 4){
		// 君と語る午後
		stage = [
			5900, 6633, 7367, 8100, 14575, 
			22288, 30000, 34000, 40000, 52000, 
			67600, 87880, 114244, 145203, 172653,
			200102, 225000, 255000, 300000, 247267, 
			365545, 384784, 405036, 426353, 448793, 
			472414, 497278, 523450, 551000, 580000, 
			600000, 646774, 695456, 747802, 804088, 
			864611, 929690, 999666, 1052280, 1107663, 
			1165961, 1227328, 1291924, 1359920, 1431495, 
			1506837, 1586144, 1669625, 1757500, 1850000, 
			2016798, 2122945, 2234679, 2352294, 2476099, 
			2606420, 2743600, 2888000, 3040000, 3200000
		];
	}
}
 
// 各班の入力欄、表示欄生成
function setup() {
	for(key in teamList) {
		var container = document.createElement('div');
		container.id = teamList[key];
		container.className = 'orgBox';
		// カード５枚セットを生成する
		for(var i = 0; i < 5; i++) {
			// カード枠
			var cardDiv = document.createElement('div');
			cardDiv.className = 'card';
			// 数値入力欄
			var numInput = document.createElement('input');
			numInput.type = 'number';
			numInput.onchange = function(){
				statusCheck();
			};
			cardDiv.appendChild(numInput);
			
			// カードレア度プルダウン生成
			var rareSelect = document.createElement('select');
			rareSelect.className = 'cardRarity';
			rareSelect.onchange = function() {
				statusCheck();
			}
			for(var j = 0; j < 5; j++) {
				var rareOption = document.createElement('option');
				switch (j) {
					case 0:
						rareOption.innerHTML = 'SSR';
						break;
					case 1:
						rareOption.innerHTML = 'SR';
						break;
					case 2:
						rareOption.innerHTML = 'R';
						break;
					case 3:
						rareOption.innerHTML = 'N';
						break;
					case 4:
						rareOption.innerHTML = 'BDキャラ以外';
					break;
				}
				// プルダウン選択項目を追加
				rareSelect.appendChild(rareOption);
			}
			// プルダウンを追加
			cardDiv.appendChild(rareSelect);
			
			// 覚醒回数プルダウン生成
			var awakingSelect = document.createElement('select');
			awakingSelect.className = 'cardAwaken';
			awakingSelect.onchange = function(){
				statusCheck();
			};
			for(var j = 0; j < 6; j++) {
				var awakingOption = document.createElement('option');
				switch (j) {
					case 0:
						awakingOption.innerHTML = '++++';
						break;
					case 1:
						awakingOption.innerHTML = '+++';
						break;
					case 2:
						awakingOption.innerHTML = '++';
						break;
					case 3:
						awakingOption.innerHTML = '+';
						break;
					case 4:
						awakingOption.innerHTML = '未凸';
						break;
					case 5:
						awakingOption.innerHTML = 'BDキャラ以外'
						break;
				}
				// プルダウン選択項目を追加
				awakingSelect.appendChild(awakingOption);
			}
			// プルダウンを追加
			cardDiv.appendChild(awakingSelect);
			
			// 対象BDチェックボックス生成
			var label = document.createElement('label');
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.id = teamList[key] + i; 
			checkbox.disabled = true;   //Disableに設定
			label.appendChild(checkbox);
			label.innerHTML += '今年度BDカード';
			label.onchange = function(){
				statusCheck();
			};
			cardDiv.appendChild(label);
			
			var span = document.createElement('span');
			var div = document.createElement('div');
			div.innerHTML = '特効込：';
			div.appendChild(span);
			cardDiv.appendChild(div);
			container.appendChild(cardDiv);
		}

		// 各班スキル選択プルダウン生成
		var p = document.createElement('p');
		p.className = 'dispBl';
		p.innerHTML = 'カードスキル：';
		var cardSkill = document.createElement('select');
		cardSkill.id = teamList[key]+'Skill';
		cardSkill.onchange = function(){
			statusCheck();
		};
		for(var i = 0; i < 8; i++) {
			var cardSkillOption = document.createElement('option');
			switch (i) {
				case 0:
					cardSkillOption.innerHTML = '5%';
					cardSkillOption.value = 1.05;
					break;
				case 1:
					cardSkillOption.innerHTML = '10%';
					cardSkillOption.value = 1.1;
					break;
				case 2:
					cardSkillOption.innerHTML = '15%';
					cardSkillOption.value = 1.15;
					break;
				case 3:
					cardSkillOption.innerHTML = '20%';
					cardSkillOption.value = 1.2;
					break;
				case 4:
					cardSkillOption.innerHTML = '25%';
					cardSkillOption.value = 1.25;
					break;
				case 5:
					cardSkillOption.innerHTML = '30%';
					cardSkillOption.value = 1.3;
					break;
				case 6:
					cardSkillOption.innerHTML = '35%';
					cardSkillOption.value = 1.35;
					break;
				case 7:
					cardSkillOption.innerHTML = '40%';
					cardSkillOption.value = 1.4;
					break;
			}
			cardSkill.appendChild(cardSkillOption);
		}
		p.appendChild(cardSkill);
		container.appendChild(p);

		// 班合計値表示欄生成
		var teamTotal = document.createElement('span');
		teamTotal.id = teamList[key]+'Team';
		teamTotal.innerHTML = '班の合計値：';
		container.appendChild(teamTotal);
		document.getElementById('container').appendChild(container);
	}

	// ユーザランク入力欄生成
	var rankLabel = document.createElement('label');
	var userRank = document.createElement('input');
	userRank.id = 'userRank';
	userRank.type = 'number';
	rankLabel.innerHTML += 'ユーザーランク： ';
	rankLabel.appendChild(userRank);
	rankLabel.onchange = function(){
		statusCheck();
	};
	document.getElementById('container').appendChild(rankLabel);
}

// 数値入力時に計算する
function statusCheck() {
	var teamTotal = [];
	var linkSkill = [2.2, 1.8, 1.5, 1.2, 1, 1];
	for(key in teamList) {
		var teamNode = document.getElementById(teamList[key]);
		var skillNode = document.getElementById(teamList[key]+'Skill');
		var skillIndex = skillNode.selectedIndex;
		var skillValue = skillNode.getElementsByTagName('option')[skillIndex].value;
		teamTotal[key] = parseFloat(card(teamNode, key) * skillValue * linkSkill[notBDCount[key]]);
		//console.log('BD以外：'+notBDCount+' リンスキ'+linkSkill[notBDCount[key]]);
		document.getElementById(teamList[key]+'Team').innerHTML = '班の合計値：' + Math.ceil(teamTotal[key]);
	
		// RANK補正分を追加する
		var userRankNm = document.getElementById('userRank').value;
		userRankNm = userRankNm * 10;
		teamTotal[key] = teamTotal[key] + (userRankNm * skillValue * linkSkill[notBDCount[key]]);
	}
	var sp1 = Math.ceil(teamTotal[0]);
	var sp2 = Math.ceil(parseFloat((teamTotal[0] + teamTotal[1]) * 1.5));
	var sp3 = Math.ceil(parseFloat(teamTotal.reduce((prev,next) => prev+=next) * 2));
	var bonus = Math.ceil(parseFloat(sp3 * 1.2));

	for(i = 0; i < 60; i++) {
		if(stage[i] < sp1) {
			document.getElementById('sp1stage').innerHTML = i+1;
			if(i == 59) {
				document.getElementById('sp1stage').innerHTML += '💐';
			}
		}
		if(stage[i] < sp2) {
			document.getElementById('sp2stage').innerHTML = i+1;
			if(i == 59) {
				document.getElementById('sp2stage').innerHTML += '💐';
			}
		}
		if(stage[i] < sp3) {
			document.getElementById('sp3stage').innerHTML = i+1;
			if(i == 59) {
				document.getElementById('sp3stage').innerHTML += '💐';
			}
		}
		if(stage[i] < bonus) {
			document.getElementById('bonusStage').innerHTML = i+1;
			if(i == 59) {
				document.getElementById('bonusStage').innerHTML += '💐';
			}
		}
	}
	
	document.getElementById('sp1').innerHTML = sp1;
	document.getElementById('sp2').innerHTML = sp2;
	document.getElementById('sp3').innerHTML = sp3;
	document.getElementById('bonus').innerHTML = bonus;
}

// 各班の合計値計算
function card(team, key) {
	var card = team.getElementsByClassName('card');
	var totalArray = []
	var correctedNum = 0;
	for(i=0; i<5; i++) {
		correctedNum = 0;
		var cardPow = card[i].getElementsByTagName('input')[0].value;
		var rareNum = card[i].getElementsByClassName('cardRarity')[0].selectedIndex;
		var awakingNum = card[i].getElementsByClassName('cardAwaken')[0].selectedIndex;
			if(rareNum != 4 && awakingNum != 5 ) {
				correctedNum = Math.ceil(parseFloat(cardPow * correction[rareNum][awakingNum]));
				var target = document.getElementById(team.id + i).checked;
				if(target==1) {
					correctedNum = correctedNum * 2;
				}
			} else {
				correctedNum += Math.ceil(parseFloat(cardPow));
				console.log(correctedNum);
				notBDCount[key]++;
			}

		card[i].getElementsByTagName('span')[0].innerHTML = correctedNum;
		
		totalArray.push(correctedNum);	
		
	}

	return totalArray.reduce((prev,next) => prev+=next);
}
