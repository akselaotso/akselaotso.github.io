<?php
  $EmailFrom = "Yoursite";
  $EmailTo = "aksela@gmail.com";
  $Subject = "From your website";
  $Name = Trim(stripslashes($_POST['Name'])); 
  $Tel = Trim(stripslashes($_POST['City'])); 
  $Email = Trim(stripslashes($_POST['Email'])); 
  $Message = Trim(stripslashes($_POST['Message'])); 

  // validation
  $validationOK=true;
  if (!$validationOK) {
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.htm\">";
    exit;
  }

  
  $Body = "";
  $Body .= "Name: ";
  $Body .= $Name;
  $Body .= "\n";
  $Body .= "Tel: ";
  $Body .= $Tel;
  $Body .= "\n";
  $Body .= "Email: ";
  $Body .= $Email;
  $Body .= "\n";
  $Body .= "Message: ";
  $Body .= $Message;
  $Body .= "\n";

  // send email
  if (strpos($Email, "@") !== false) { 
    $success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");
  }
  
  // redirect to success page 
  if ($success){
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.htm\">";
  }
  else{
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.htm\">";
  }
?>
