<!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
	 chromium.org/developers/how-tos/chrome-frame-getting-started -->
<!--[if lt IE 7 ]>
	<script defer src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
	<script defer>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
<![endif]-->
<!DOCTYPE HTML>
<html ng-app="myModule">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>icare::learn code by doing</title>
	<link rel="stylesheet" href="app/css/custom_editor.css">
	<script src="plugins/js/angular.min.js" type="text/javascript"></script>
	<script src="plugins/js/src-min-noconflict/ace.js" type="text/javascript"></script>

</head>
<body ng-controller="myController1">

<div class="alert-wrapper">
	<div id="alert">
		<img src="images/danger.svg" width='60' id="alertIcon" >
		<p class="alert-desc"></p>
		<input type="button" name="closeBtn" id="closeBtn" value="OK" onclick="closeAlert(this)">
	</div>
</div>
	<section>
		<header>
			<div class="logo">
				<h2>i<span style="border: 2px solid #ffffff;border-radius: 4px;margin-left: 1px;padding: 0 2px;">care</span></h2>
			</div>
			<div class="select-theme" id="themeSelectionContainer">
				<label>Theme:</label>
				<select ng-options="theme for theme in themes" ng-model="userTheme" ng-change="changeTheme(userTheme)"></select>
			</div>
			<div class="select-prog-lang" id="progLangSelectionContainer">
				<label>Language:</label>
				<select ng-options="lang for lang in langs" ng-model="progLangMode" ng-change="changeEnv(progLangMode)"></select>
			</div>
			<input type="button" name="submitCode" value="submit" ng-click="getCode(progLangMode)">
			<input type="button" name="runCode" value="Compile and run" ng-click="runCode(progLangMode)">
		</header>
		<div class="main-container">
			
			<div class="question-container">
				<section class="question-box">
					<p class="question question-box-common-rules">
						<font style="color: #556; font-weight: bold; ">Question 1) .</font><br/><br/>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
					</p>

					<div class="test-cases question-box-common-rules">
						<h4>Test Cases: </h4>
						<aside>
							<pre>
								<li>0 < t <= 10<sup>9</sup></li><li>0 < t <= 10<sup>9</sup></li><li>0 < t <= 10<sup>9</sup></li>
							</pre>
						</aside>
					</div>

					<div class="sample-output-box question-box-common-rules">
						<aside class="left">
							<h4>Sample input: </h4>
<pre>
2
4
1 2 3 4
7
10 40 56 1 4 91 0
</pre>
						</aside>
						<aside class="right">
							<h4>Sample output: </h4>
<pre>
10
45
</pre>
						</aside>
					</div>

<div class="sample-output-box question-box-common-rules">
						<aside class="left">
							<h4>Sample input: </h4>
<pre>
2
4
1 2 3 4
7
10 40 56 1 4 91 0
</pre>
						</aside>
						<aside class="right">
							<h4>Sample output: </h4>
<pre>
10
45
</pre>
						</aside>
					</div>
<div class="sample-output-box question-box-common-rules">
						<aside class="left">
							<h4>Sample input: </h4>
<pre>
2
4
1 2 3 4
7
10 40 56 1 4 91 0
</pre>
						</aside>
						<aside class="right">
							<h4>Sample output: </h4>
<pre>
10
45
</pre>
						</aside>
					</div>

				</section>
			</div>
			<!-- question container ends here -->
			<button type="button" onclick="toggleQuestionContainer(this)" id="toggleViewBtn" title="hide" > &#171; </button>
			<div class="editor-container">
				<pre id="editor"></pre>
			</div>
			<!-- editor container ends here -->
		</div>



		<!-- code for response -->
		<div class="response-container" id="responseContainer">
			<div class="pallete">
				<ul>
					<!-- <li><p id="minimise-pallete">&#10005;</p></li> -->
					<!-- <li><p id="expand-pallete">&#10005;</p></li> -->
					<li><p id="closePallete" onclick="closeResponseContainer(0)">&#10005;</p></li>
				</ul>	
			</div>
			<div class="response-show-box" >
				<p id="responseShow"></p>
			</div>
		</div>
	</section>
	<script src="app/js/custom_editor.js" type="text/javascript"></script>
	<!-- <script src="app/js/keyevents.js" type="text/javascript"></script> -->
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
</body>
</html>
