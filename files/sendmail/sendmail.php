<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	// $mail->isSMTP();                                            //Send using SMTP
	// $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
	// $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	// $mail->Username   = 'user@example.com';                     //SMTP username
	// $mail->Password   = 'secret';                               //SMTP password
	// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	// $mail->Port       = 587;    
	// $mail = new PHPMailer(true);
	// $mail->CharSet = 'UTF-8';
	// $mail->setLanguage('ru', 'phpmailer/language/');
	// $mail->IsHTML(true);
	// $mail->SMTPDebug  = 1;  
	// $mail->SMTPAuth   = TRUE;
	// $mail->SMTPSecure = "tls";
	// $mail->Port       = 587;
	// $mail->Host       = "smtp.gmail.com";
	// $mail->Username   = "your-email@gmail.com";
	// $mail->Password   = "your-gmail-password";             

	$fromAddress = 'zm3158589525lt@bpauto.lv';
	//$fromAddress2 = 'nbstock1@gmail.com';
	$to2     = 'dsriga@gmail.com';

	$mail = new PHPMailer();
	$mail->addReplyTo( $reply, '' );
	$mail->setFrom( $fromAddress, 'Healthstore' );
	$mail->addAddress( $to2, '' );
	$mail->CharSet = 'utf-8';
	$mail->isHTML( true );
	$mail->Subject = 'Health store (заказ)';

	// //Від кого лист
	// $mail->setFrom('healthstore@gmail.com', 'Health store'); // Вказати потрібний E-mail
	// //Кому відправити
	// $mail->addAddress('dsriga@gmail.com'); // Вказати потрібний E-mail
	// //Тема листа
	// $mail->Subject = 'Health store (заказ)';

	//Тіло листа
	$body = '<h1>Health store (заказ)</h1>';

	if(trim(!empty($_POST['phonemail']))){
		$body.='<p><strong>Телефон/Email покупателя:</strong> '.$_POST['phonemail'].'</p>';
	}	

	if(trim(!empty($_POST['phonemail']))){
		$body.='<p><strong>Способ доставки:</strong> '.$_POST['form-select'].'</p>';
	}	

	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Комментарий к заказу:</strong> '.$_POST['message'].'</p>';
	}	

	// <th>Фото</th>
	$tabte = "
			<table>
				<tr><th style=\"text-align:start; padding-right:15px !important;padding-bottom:10px !important;\">Название</th><th style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">Артикул</th><th style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">Количество</th><th style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">Цена</th><th style=\"padding-bottom:10px !important; \">Сумма</th></tr>";
				$i = 1;
				foreach ($_POST as $key => $value) {
					if (strpos($key, 'title-'.$i) === 0) {
						$tabte .= "<tr style='text-align:center;'><td style='text-align:start; padding-right:15px !important; padding-bottom:10px !important;'>" . $_POST[$key] . "</td>";
						$i++;
					} 
					if (strpos($key, 'articul-'.$i) === 0) {
						$tabte .= "<td style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">" . $_POST[$key] . "</td>";
						$i++;
					}
					if (strpos($key, 'count-'.$i) === 0) {
						$tabte .= "<td style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">" . $_POST[$key] . "</td>";
						$i++;
					}
					if (strpos($key, 'price-one-'.$i) === 0) {
						$tabte .= "<td style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">" . $_POST[$key] . "</td>";
						$i++;
					}
					if (strpos($key, 'price-'.$i) === 0) {
						$tabte .= "<td style=\"padding-right:15px !important; padding-left:15px !important; padding-bottom:10px !important;\">" . $_POST[$key] . "</td></tr>";
						$i++;
					}
				}
			$tabte .= "</table>";

	$body .= $tabte;


	if(trim(!empty($_POST['summ']))){
		$body.='<p><strong>Сумма заказа:</strong> '.$_POST['summ'].'€</p>';
	}	

	
	//Прикріпити файл
	// if (!empty($_FILES['image']['tmp_name'])) {
	// 	//шлях завантаження файлу
	// 	$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
	// 	//грузимо файл
	// 	if (copy($_FILES['image']['tmp_name'], $filePath)){
	// 		$fileAttach = $filePath;
	// 		$body.='<p><strong>Фото у додатку</strong>';
	// 		$mail->addAttachment($fileAttach);
	// 	}
	// }
	

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
