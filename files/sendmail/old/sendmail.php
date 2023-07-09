<?php
	// use PHPMailer\PHPMailer\PHPMailer;
	// use PHPMailer\PHPMailer\Exception;

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	// require 'phpmailer/src/Exception.php';
	// require 'phpmailer/src/PHPMailer.php';
	// require 'phpmailer/src/SMTP.php';
	require 'vendor/autoload.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com'; // SMTP сервер почты
	$mail->SMTPAuth = true;
	$mail->Username = 'healthstorelv@gmail.com'; // ваш логин от почты
	$mail->Password = 'B98cnz6524M'; // ваш пароль от почты
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

	//Від кого лист
	$mail->setFrom('healthstore@gmail.com', 'Health store'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('dsriga@gmail.com'); // Вказати потрібний E-mail
	//Тема листа
	// $mail->isHTML(true);
	$mail->Subject = 'Health store (заказ)';

	//Тіло листа
	$body = '<h1>Health store (заказ)</h1>';

	if(trim(!empty($_POST['phonemail']))){
		$body.='<p><strong>Телефон/Email:</strong> '.$_POST['phonemail'].'</p>';
	}	

	if(trim(!empty($_POST['phonemail']))){
		$body.='<p><strong>Доставка:</strong> '.$_POST['form-select'].'</p>';
	}	

	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Комментарий к заказу:</strong> '.$_POST['message'].'</p>';
	}	
	
	$i = 0;

	foreach ($_POST as $key => $value) {
     	if($key === "articul-".$i){
				$body.='<p><strong>Артикул товара:</strong>'.$_POST[$key].'</p>';
			}	

		$i++;
  }

	if(trim(!empty($_POST['summ']))){
		$body.='<p><strong>Сумма заказа:</strong> '.$_POST['summ'].'</p>';
	}	

	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
		// $message = $body;
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
