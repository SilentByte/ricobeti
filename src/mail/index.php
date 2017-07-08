<?php
    require_once './vendor/autoload.php';

    header('Content-Type: text/plain');

    if(empty($_POST['name'])
        || empty($_POST['email'])
        || empty($_POST['message'])
        || strlen($_POST['name']) > 128
        || strlen($_POST['email']) > 256
        || strlen($_POST['message']) > 65536)
    {
        error_log('[Contact Form] Illegal POST request.');

        http_response_code(400);
        echo '400 Bad Request';
        exit;
    }

    $name = $_POST[ 'name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mailer = new PHPMailer();
    $mailer->CharSet = 'UTF-8';

    $mailer->isSMTP();
    $mailer->Host = getenv('CONFIG_EMAIL_HOST');
    $mailer->SMTPAuth = true;
    $mailer->Username = getenv('CONFIG_EMAIL_ADDRESS');
    $mailer->Password = getenv('CONFIG_EMAIL_PASSWORD');
    $mailer->SMTPSecure = 'tls';
    $mailer->Port = 587;

    $mailer->AddReplyTo($email, $name);
    $mailer->SetFrom(getenv('CONFIG_EMAIL_ADDRESS'), 'Contact Form');
    $mailer->AddAddress(getenv('CONFIG_EMAIL_TO');

    $mailer->Subject = 'Contact Form (ricobeti.ch): ' . $name;
    $mailer->Body    = ""
      . "\n"
      . "----------------------------------------------------------------\n"
      . "Contact Form (ricobeti.ch)\n"
      . "----------------------------------------------------------------\n"
      . "Name:   $name\n"
      . "E-Mail: $email\n"
      . "\n"
      . $message
      . "\n"
      . "----------------------------------------------------------------\n";

    if($mailer->send()) {
        http_response_code(200);
        echo '200 OK';
    }
    else {
        error_log('[Contact Form] ' . $mailer->ErrorInfo);

        http_response_code(400);
        echo '400 Bad Request';
        exit;
    }

