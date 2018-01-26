var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
// import "ace/mode/python" as PythonMode;
// PythonMode.Mode;
editor.getSession().setMode("ace/mode/python");
// editor.session.setMode("ace/mode/python");

var $mainContainer = document.querySelector('.main-container');
var $questionContainer = document.querySelector('.question-container');
var $editorContainer = document.querySelector('.editor-container');

var $responseContainer = document.getElementById('responseContainer');
var $responseShow = document.getElementById('responseShow');
var $alert_wrapper = document.getElementsByClassName('alert-wrapper')[0];
var $alert_desc = document.getElementsByClassName('alert-desc')[0];
var $alert = document.getElementById('alert');
var $alertIcon = document.getElementById('alertIcon');
var $closeAlertBtn = document.getElementById('closeBtn');
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
		
		var ws = new WebSocket("ws://13.126.13.152:9990");
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

					if(_sc_flag)
					{	
						totalChance=3;
						var cl = $alert.classList;
						if(cl.contains('danger'))
							cl.remove('danger');
						cl.add('success');
						$alertIcon.src='http://13.126.13.152/images/success.svg';
						$alert_desc.innerHTML="code submitted successfully.";
						$closeAlertBtn.classList.add('success');
						blurMainContainer();
						$alert_wrapper.style.display = 'block';
					}

					var rs_cl = $responseContainer.classList;
					$responseShow.innerHTML = _output;
					rs_cl.add('show');
					setTimeout(()=>{
						if(rs_cl.contains('show'))
							rs_cl.remove('show');
					},6000);

					

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

var _mode='c';
var app = angular.module("myModule", []).controller("myController1",function($scope){
	var themes = ['gob','ambiance','chaos','chrome','clouds','clouds_midnight','cobalt','crimson_editor','dawn','dreamweaver','eclipse','github','twilight','gruvbox','idle_fingers','iplastic','katzenmilch','kr_theme','kuroir','merbivore','mono_industrial','monokai','pastel_on_dark','solarized_dark','solarized_light','sqlserver','terminal','textmate','tomorrow','tomorrow_night','tomorrow_night_blue','tomorrow_night_bright','tomorrow_night_eighties','vibrant_ink','xcode'];
	$scope.themes = themes;
	$scope.userTheme=themes[themes.length-1];
	$scope.changeTheme = (t)=>{
		editor.setTheme("ace/theme/"+t);
	};

	var langs=['c','cpp','python2','python3','javascript'];
	$scope.langs = langs;
	$scope.progLangMode=langs[2];

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
				_mode='python';
			}
		else if(langMode==='python3')
			{
				_mode='python';
			}
		editor.getSession().setMode("ace/mode/"+langMode);
	};

	

	$scope.getCode = (_mode)=>{
			console.log(_mode);
			var _code = editor.session.getValue();
			console.log(_code);
			sendCode(_code,_mode,1);
		};


	$scope.runCode = (_mode)=>{
			console.log(_mode);
			var _code = editor.session.getValue();
			console.log(_code);
			sendCode(_code,_mode,0);
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

editor.commands.addCommand({
	name: "submit",
	bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
	exec: ()=>{
		// editor.setReadOnly(true);
		getCode(_mode);
	},
	readOnly: true
});


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

window.onblur=()=>{
	--totalChance;
	console.log(totalChance);
	$alertIcon.src="http://13.126.13.152/images/danger.svg";	
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
			getCode(_mode);
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

var closeAlert = (e)=>{
	$alert_wrapper.style.display="none";
	resetMainContainer();
};

var closeResponseContainer = (e)=>{
	$responseContainer.classList.remove('show');	
};

function blurMainContainer(){
	$mainContainer.style.filter='blur(4px)';
}
function resetMainContainer(){
	$mainContainer.style.filter='none';	
}


function toggleQuestionContainer(e){
	let mClassList = $mainContainer.classList;
	let isHidden = mClassList.contains('hide-question-container') ? true:false;
	let btnText=e.innerHTML;
	console.log(btnText);
	if(isHidden)
	{
		mClassList.remove('hide-question-container');
		e.innerHTML='&#171;';
	}else {
		mClassList.add('hide-question-container');
		e.innerHTML='&#187;';
	}
}







// ========================================================
