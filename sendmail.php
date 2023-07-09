<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	
	// $mail->isSMTP();                                            //Send using SMTP
	// $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
	// $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	// $mail->Username   = 'healthstorelv@gmail.com';                     //SMTP username
	// $mail->Password   = 'B98cnz6524M';                               //SMTP password
	// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	// $mail->Port       = 465; 
	

	//Від кого лист
	$mail->setFrom('healthstorelv@gmail.com', 'Health store'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('hristenokleonid@gmail.com'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Health store (заказ)';

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
				<tr><th style='text-align:start; margin-right:20px;'>Название</th><th style='margin-right:20px;'>Артикул</th><th style='margin-right:20px;'>Количество</th><th style='margin-right:20px;'>Цена</th><th style='margin-right:20px;'>Сума</th></tr>";
				$i = 1;
				foreach ($_POST as $key => $value) {
					if (strpos($key, 'title-'.$i) === 0) {
						$tabte .= "<tr style='text-align:center;'><td style='text-align:start; margin-right:20px;'>" . $_POST[$key] . "</td>";
						$i++;
					} 
					if (strpos($key, 'articul-'.$i) === 0) {
						$tabte .= "<td style='margin-right:20px;'>" . $_POST[$key] . "</td>";
						$i++;
					}
					if (strpos($key, 'count-'.$i) === 0) {
						$tabte .= "<td style='margin-right:20px;'>" . $_POST[$key] . "</td>";
						$i++;
					}
					if (strpos($key, 'price-one-'.$i) === 0) {
						$tabte .= "<td style='margin-right:20px;'>" . $_POST[$key] . "</td>";
						$i++;
					}
					if (strpos($key, 'price-'.$i) === 0) {
						$tabte .= "<td style='margin-right:20px;'>" . $_POST[$key] . "</td></tr>";
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
