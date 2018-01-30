<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0, user-scalable=no">
	<title>Signup</title>
	<link rel="stylesheet" href="app/css/login.css">
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link href='https://fonts.googleapis.com/css?family=Raleway:500' rel='stylesheet' type='text/css'>
</head>
<body>
	<div class="main-container">
		<div class="form-wrapper">
		<form method="post" accept-charset="utf-8" >
		 <!-- onsubmit="return validateForm(this)" -->
			<div class="form-card wrapper">
				<div class="heading">
					<h1>
						<i class="fa fa-lock"></i>
						Login
					</h1>
				</div>
				<div class="registration-no-input-box input-common-rules">
					<i class="fa fa-user field-icon"></i>
					<label ><span>Registration number</span><input type="text" name="regNumber" required onfocus="activateField(this)" onfocusout="deActivateField(this)" autocomplete="off" ></label>
				</div>
				<div class="email-id-input-box input-common-rules">
					<i class="fa fa-envelope envelope-icon field-icon"></i>
					<label ><span>Email id</span><input type="email" name="emailId" required onfocus="activateField(this)" onfocusout="deActivateField(this)" autocomplete="off" ></label>
				</div>
				<div class="button-box">
					<input type="button" name="" value="login" onclick="validateForm()">
				</div>
			</div>

		</form>
		<!-- end of form -->
		<p id="errorMsg" class="error hidden"><span class="close-cross error-close-icon">&#10005;</span> <span id="errText"></span></p> 
		<!-- invalid input! Please enter correct information -->

		</div> 
		<!-- end of form wrapper -->
	</div>
	<!-- end of main-container -->
	<script>
		function validateForm(e){
			// alert();
			window.location.href = 'editor.php';
			// let form = e;
			// // console.log(form.children[0].children[1].children[1].children[0]);
			// let regNum = form.children[0].children[1].children[1].children[0].value;
			// let emailId = form.children[0].children[2].children[1].children[0].value;
			// if( regNum.length > 0 && emailId.length > 0 )
			// {
			// 	window.location.href = 'editor.php';
			// 	return false;
			// }
			// return false;
		}
		
		function activateField(e){
			let _target = e;
			// console.log(_target);
			let spanEl = _target.parentNode.children[0];
			let icon = _target.parentNode.parentElement.childNodes[1];
			if(_target.value.length === 0)
			{
				// spanEl.classList.add('active');
				// icon.classList.add('active');
				addClass(spanEl, 'active');
				addClass(icon, 'active');
			}
			// console.log(_target.parentNode.parentElement.childNodes[1]);
		}
		function deActivateField(e){
			let _target = e;
			// console.log(_target);
			let spanEl = _target.parentNode.children[0];
			let icon = _target.parentNode.parentElement.childNodes[1];
			if(_target.value.length === 0)
			{
				// spanEl.classList.remove('active');
				// icon.classList.remove('active');
				removeClass(spanEl, 'active');
				removeClass(icon, 'active');
			}
		}

		function addClass(el, _class){
			el.classList.add(_class);
		}
		function removeClass(el, _class){
			el.classList.remove(_class);
		}

		var closeErrorCross = document.querySelector('.error-close-icon');
		closeErrorCross.addEventListener('click', (e)=>{
			// console.log(e);
			addClass(e.target.parentNode, 'hidden');
		});
	</script>
</body>
</html>