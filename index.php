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
					<label onclick="activateField(this)"><span>Registration number</span><input type="text" name="regNumber" required></label>
				</div>
				<div class="email-id-input-box input-common-rules">
					<i class="fa fa-envelope envelope-icon field-icon"></i>
					<label onclick="activateField(this)"><span>Email id</span><input type="email" name="emailId" required></label>
				</div>
				<div class="button-box">
					<input type="button" name="" value="login" onclick="validateForm()">
				</div>
			</div>
		</form>
	</div>
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
			let spanEl = _target.children[0];
			spanEl.classList.add('active');
			let fieldIcon = _target.parentNode.children[0];
			fieldIcon.classList.add('active');
		}
	</script>
</body>
</html>