var editor = ace.edit("editor");
ace.require("ace/ext/language_tools");
// ace.require("ace/ext/emmet");
// console.log(Object.keys(editor.$options));
editor.setTheme("ace/theme/xcode");
editor.setShowPrintMargin(false);
editor.$blockScrolling = Infinity;
// import "ace/mode/python" as PythonMode;
// PythonMode.Mode;
editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

editor.getSession().setMode("ace/mode/python");
// editor.session.setMode("ace/mode/python");

var $mainContainer = document.querySelector('.main-container');
var $mainSection = document.querySelector('.main-section');
var $questionContainer = document.querySelector('.question-container');
var $editorContainer = document.querySelector('.editor-container');

var $responseContainer = document.getElementById('responseContainer');

var $alert_wrapper = document.getElementsByClassName('alert-wrapper')[0];
var $alert_desc = document.getElementsByClassName('alert-desc')[0];
var $alert = document.getElementById('alert');
var $alertIcon = document.getElementById('alertIcon');
var $closeAlertBtn = document.getElementById('closeBtn');
var $runCodeBtn = document.querySelector('input[name=runCode]');
var $submitCodeBtn = document.querySelector('input[name=submitCode]');
var totalChance=3;
var flag=true;
/// <reference path="plugin/js/angular.min.js"/>

var getCode = (_mode)=>{
			console.log(_mode);
			var _code = editor.session.getValue();
			console.log(_code);
			if(_code.length)
			sendCode(_code,_mode,1);
			else
			{
				$alert_desc.innerHTML="Please write some code.";
				var cl = $alert.classList;
				if(cl.contains('success'))
					cl.remove('success');
				// else if(cl.contains('danger'))
					// cl.remove('danger');
				cl.add('danger');
				blurMainContainer();
				$alert_wrapper.style.display="block";
			}
			console.log(commands);
		};

// function to send and recieve a connection to and from a server using webSocket
var sendCode = (_code,_mode,_sc_flag)=>{
	if("WebSocket" in window)
	{
		
		var ws = new WebSocket("ws://13.126.13.152:443");
		console.log("socket object created => "+ws+"\n\n");
		ws.onopen = (event)=>{
			var _obj = {
				input:"10\n10",
				code: _code,
					mode:_mode,
				flag: _sc_flag,
				output: ''
			};
			ws.send(JSON.stringify(_obj));
			console.log("code send successfully with state "+ws.readyState);
			if(_sc_flag)
				editor.setValue('');
		
		};
		ws.onmessage = (event)=>{
			if(ws.readyState===1)
				{	
					var $data = JSON.parse(event.data);
					var flag = $data.flag;
					var _output = $data.output;

					// console.log(event);
                    console.log('Recieved code => \t'+_output);
					console.log('Recieved code => \t'+event.data);

					if(_sc_flag) // if _sc_flag is 1 then submit request
					{	
						$submitCodeBtn.classList.remove('active');
						$submitCodeBtn.removeAttribute('disabled');
						totalChance=3;
						var cl = $alert.classList;
						if(cl.contains('danger'))
							cl.remove('danger');
						cl.add('success');
						$alertIcon.src='/images/success.svg';
						// $alertIcon.src='http://13.126.13.152/images/success.svg';
						$alert_desc.innerHTML="code submitted successfully.";
						$closeAlertBtn.classList.add('success');
						blurMainContainer();
						$alert_wrapper.style.display = 'block';
					}else {
						// else compile request so output box is shown
						// alert();
							let scope = angular.element(document.getElementById("body")).scope();
							    scope.$apply(function () {
							    scope.showOutputBox();
							    });
						// hide loader upon getting result 
						$runCodeBtn.classList.remove('active');
						$runCodeBtn.removeAttribute('disabled');
						$responseContainer.innerHTML=_output;
					}

					
					
					
					

					

					// var cl = $alert.classList;
					// if(cl.contains('danger'))
					// {
					// 	cl.remove('danger');
					// }
					// else if(cl.contains('warning'))
					// 			cl.remove('warning');
					// cl.add('success');
					// $alert_wrapper.style.display="block";
				}
		};
		// ws.onclose = ()=>{
		// 	$alert_desc.innerHTML="Connection is closed";
		// 	var cl = $alert.classList;
		// 	if(cl.contains('success'))
		// 		cl.remove('success');
		// 	else if(cl.contains('warning'))
		// 		cl.remove('warning');
		// 	cl.add('danger');
		// 	$alert_wrapper.style.display="block";
		// };
	}else
	{
		var cl=$alert.classList;
		if(cl.contains('success'))
			cl.remove('success');
		else if(cl.contains('warning'))
			cl.remove('warning');
		cl.add('danger');
		$alert_desc.innerHTML="your browser doesn't support webSocket. kindly upgrade your browser";
		$alert_wrapper.style.display="block";
	}
};

var _mode='python2';
var app = angular.module("myModule", ['ngSanitize']).controller("myController1",function($scope,$window){
	var themes = ['gob','ambiance','chaos','chrome','clouds','clouds_midnight','cobalt','crimson_editor','dawn','dreamweaver','eclipse','github','twilight','gruvbox','idle_fingers','iplastic','katzenmilch','kr_theme','kuroir','merbivore','mono_industrial','monokai','pastel_on_dark','solarized_dark','solarized_light','sqlserver','terminal','textmate','tomorrow','tomorrow_night','tomorrow_night_blue','tomorrow_night_bright','tomorrow_night_eighties','vibrant_ink','xcode'];
	$scope.themes = themes;
	$scope.userTheme=themes[themes.length-1];
	$scope.changeTheme = (t)=>{
		editor.setTheme("ace/theme/"+t);
	};

	var langs=['c','cpp','python2','python3','javascript'];
	$scope.langs = langs;
	$scope.progLangMode=langs[2];
	// _mode=$scope.progLangMode;
	$scope.changeEnv = (langMode)=>{
		
		if(langMode==='c')
			{
				langMode='c_cpp';
				_mode='c';
			}
		else if(langMode==='cpp')
			{
				langMode='c_cpp';
				_mode='cpp';
			}
		else if(langMode==='python2')
			{
				_mode='python2';
				langMode='python';
			}
		else if(langMode==='python3')
			{
				_mode='python3';
				langMode='python';
			}
			// alert(langMode);

		editor.getSession().setMode("ace/mode/"+langMode);
	};

	

	$scope.getCode = (_mode)=>{
			$submitCodeBtn.classList.add('active');
			$submitCodeBtn.setAttribute('disabled','disabled');
			console.log(_mode);
			var _code = editor.session.getValue();
			console.log(_code);
			sendCode(_code,_mode,1);
		};


	$scope.runCode = (_mode)=>{
			$runCodeBtn.classList.add('active');
			$runCodeBtn.setAttribute('disabled', 'disabled');
			console.log(_mode);
			var _code = editor.session.getValue();
			console.log(_code);
			sendCode(_code,_mode,0);
	};

	// handle window blur event
	$window.onblur = ()=>{
		--totalChance;
		console.log(totalChance);
		// $alertIcon.src="http://13.126.13.152/images/danger.svg";	
		$alertIcon.src="/images/danger.svg";	
		let closeBtnClassList = $closeAlertBtn.classList;
		if(closeBtnClassList.contains('success'))
			closeBtnClassList.remove('success');
		var cl = $alert.classList;

		blurMainContainer();

		if(totalChance === 0)
		{	
			// alert('al chances are consumed');
			totalChance=3;
			// $alert_desc.innerHTML='';
			if(cl.contains('danger'))
				cl.remove('danger');
			else if(cl.contains('warning'))
				cl.remove('warning');
			cl.add('danger');
			
			$alert_desc.innerHTML="All chances are consumed, code will be submitted autmatically in few seconds.";
			$alert_wrapper.style.display="block";
			setTimeout(()=>{
				$alert_wrapper.style.display="none";
				resetMainContainer();
				console.log(`from onblur => ${$scope.progLangMode}`);
				$submitCodeBtn.classList.add('active');
				$submitCodeBtn.setAttribute('disabled', 'disabled');
				getCode($scope.progLangMode);
			},5000);
			
		}
		else
		{
			$alert_desc.innerHTML =  totalChance + ' chance left. be careful!';
			// var cl = $alert.classList;
			if(cl.contains('success'))
					cl.remove('success');
			else if(cl.contains('warning'))
				cl.remove('warning');
			cl.add('danger');
			blurMainContainer();
			$alert_wrapper.style.display="block";
			$closeAlertBtn.focus;
			// $closeAlertBtn.classList.add('focus');
		}
	};
	// window blur handler ends

	$scope.isQuestionBox = true;
	$scope.isOutputBox = false;
	$scope.showProblemBox = ()=>{
		// $scope.isQuestionBox ? false: true;
		// $scope.isOutputBox = $scope.isOutputBox ? false: true;
		$scope.isQuestionBox = true;
		$scope.isOutputBox = false;
	};

	$scope.showOutputBox = ()=>{
		$scope.isQuestionBox = false;
		$scope.isOutputBox = true;
	};

	// question list goes here
	let quesCount = [1,2,3,4,5];
	// this question count array will be generating question index

	$scope.quesList = quesCount.map(index => 'Q'+index );
	//console.log($scope.quesList);

	//questions object
	//questions goes here
	let questions = [
		{
			question: "1 Lorem Ipsum is Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
			testCases: ['0 < t1 <= 10<sup>9</sup>','0 < x1 <= 10<sup>9</sup>','0 < y1 <= 10<sup>9</sup>'],
			sampleInput: ['2', '4', '1 2 3 4', '7', '10 40 56 1 4 91 0'],
			sampleOutput: ['10','45']
		},
		{
			question: "2 Lorem Ipsum is simprinting and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
			testCases: ['0 < t2 <= 10<sup>9</sup>','0 < x2 <= 10<sup>9</sup>','0 < y2 <= 10<sup>9</sup>'],
			sampleInput: ['2', '4', '1 2 3 4', '7', '10 40 56 1 4 91 0'],
			sampleOutput: ['10','45']
		},
		{
			question: "3 Lorem Ipsum is simply dummy text of the printing and typesetting i been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
			testCases: ['0 < t3 <= 10<sup>9</sup>','0 < x3 <= 10<sup>9</sup>','0 < y3 <= 10<sup>9</sup>'],
			sampleInput: ['2', '4', '1 2 3 4', '7', '10 40 56 1 4 91 0'],
			sampleOutput: ['10','45']
		},
		{
			question: "4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Loremnd typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
			testCases: ['0 < t4 <= 10<sup>9</sup>','0 < x4 <= 10<sup>9</sup>','0 < y4 <= 10<sup>9</sup>'],
			sampleInput: ['2', '4', '1 2 3 4', '7', '10 40 56 1 4 91 0'],
			sampleOutput: ['10','45']
		},
		{
			question: "5 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsuting and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
			testCases: ['0 < t5 <= 10<sup>9</sup>','0 < x5 <= 10<sup>9</sup>','0 < y5 <= 10<sup>9</sup>'],
			sampleInput: ['2', '4', '1 2 3 4', '7', '10 40 56 1 4 91 0'],
			sampleOutput: ['10','45']
		}
	];
	$scope.problemStatement = {
		id: 'Question 1). ',
		question: questions[0].question,
		testCases: questions[0].testCases,
		sampleInput: questions[0].sampleInput,
		sampleOutput: questions[0].sampleOutput
	}; 
	//function to show question
	$scope.showQuestion = (key, value,e)=>{
		// console.log(`${key} => ${value}`);
		$scope.problemStatement = {
			id: `Question ${key+1}). `,
			question: questions[key].question,
			testCases: questions[key].testCases,
			sampleInput: questions[key].sampleInput,
			sampleOutput: questions[key].sampleOutput
		}; 
		// console.log(e);
		let target = e.target;
		let superParent = e.target.parentNode.parentNode;
		for(let i=0; i< quesCount.length; i++)
		{
			superParent.children[i].children[0].className = '';
		}
		target.className='active';
	};

});



// to set the tab size
// editor.getSession().setTabSize(4);

// to set the font size of editor
document.getElementById('editor').style.fontSize = '15px';


// to listen to a change in editor events like onchange
editor.getSession().on('change',(e)=>{
	// console.log(e.lines);
});



commands=[];
editor.commands.on('afterExec',(e)=>{
	commands.push({name: e.command.name, args: e.args});
});

// adding|binding command to editor

// editor.commands.addCommand({
// 	name: "submit",
// 	bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
// 	exec: ()=>{
// 		// editor.setReadOnly(true);
// 		console.log(`from ctrl+enter => ${_mode}`);
// 		getCode(_mode);
// 	},
// 	readOnly: true
// });


editor.getSession().on('change',(e)=>{
	var lines = editor.session.getValue().length;
	if(lines)
		{
			document.getElementsByName('submitCode')[0].style.display='block';
			document.getElementsByName('runCode')[0].style.display='block';			
		}
	else
		{
			document.getElementsByName('submitCode')[0].style.display='none';
			document.getElementsByName('runCode')[0].style.display='none';}
});




// rules to disable tab change and reload confirm


window.onbeforeunload=()=>{
	return false;
};

// window.onblur=()=>{

// };

var closeAlert = (e)=>{
	$alert_wrapper.style.display="none";
	resetMainContainer();
};



function blurMainContainer(){
	$mainSection.style.filter='blur(4px)';
}
function resetMainContainer(){
	$mainSection.style.filter='none';	
}


function toggleQOContainer(e){
	let mClassList = $mainContainer.classList;
	let isHidden = mClassList.contains('hide-qo-container') ? true:false;
	// let btnText=e.innerHTML;
	// console.log(e);

	if(isHidden)
	{
		mClassList.remove('hide-qo-container');
		e.innerHTML='&#171;';
		e.setAttribute('title', 'hide');
	}else {
		mClassList.add('hide-qo-container');
		e.innerHTML='&#187;';
		e.setAttribute('title', 'show');
	}
}







// ========================================================


// disable right click
editor.container.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    console.log('%cRight click is disabled','color: white; background: red; border-radius: 2px; padding: 5px 10px;');
    return false;
}, false);

// disable paste

// editor.onPaste = e => {
//     console.log('%cPaste is disabled','color: white; background: orange; border-radius: 2px; padding: 5px 10px;');
// 	return '';
// };


stop = function(e) { e.stopPropagation(); e.preventDefault(); console.log('%ccut copy Paste is disabled','color: white; background: orange; border-radius: 2px; padding: 5px 10px;'); }
document.querySelector(".ace_editor").addEventListener("copy", stop, true)
document.querySelector(".ace_editor").addEventListener("cut", stop, true)
document.querySelector(".ace_editor").addEventListener("paste", stop, true)